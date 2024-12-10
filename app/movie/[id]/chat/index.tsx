'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import './styles.scss'
import { CloseSquareOutlined } from '@ant-design/icons';
import useWebsocket, { ReadyState } from 'react-use-websocket';
import { useSession } from 'next-auth/react';
import axios from 'axios';


export default function ChatBox({ room }: any)
{
    const { data, status } = useSession();
    const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(true);
    const [messageInput, setMessageInput] = useState('');
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebsocket<any>(process.env.NEXT_PUBLIC_CHAT_WS as string, { shouldReconnect: ()=>true, reconnectInterval: 5000, reconnectAttempts: Infinity  });
    const [messages, setMessages] = useState<any[]>([]);


    useEffect(() =>
    {
        if (status === 'authenticated' && readyState === ReadyState.OPEN)
        {
            sendJsonMessage({ type: 'join', sender: data.user.uid, data: { room } });
        }
    }, [status, readyState])

    useEffect(() =>
    {
        if (lastJsonMessage)
        {
            switch (lastJsonMessage.type)
            {
                case 'rehydrate':
                    {
                        const content: any[] = lastJsonMessage.data.content;
                        setMessages(content);
                        // const fetchUsers = async () => {
                        //     // 创建一个新的对象数组，用于存储更新后的数据
                        //     const updatedData = await Promise.all(content.map(async (message) => {
                        //         try {
                        //             const response = await axios.get(`/api/users/uid/${message.sender}`);
                        //             const user = response.data;
                        //             // 返回更新后的对象
                        //             return { ...message, user };
                        //         }
                        //         catch (error) {
                        //             console.error(`Error fetching user with id ${message.id}:`);
                        //             return message; // 如果请求失败，返回原始对象
                        //         }
                        //     }));
                        //     setMessages(updatedData);
                        // };
                        // fetchUsers();
                    }
                    break;

                case 'message':
                    {
                        const data = lastJsonMessage.data;
                        setMessages(prev => [...prev, { room: data.room, sender: data.sender, name: data.name, content: data.content }])
                        // axios.get('/api/users/uid/'+userId)
                        //     .then(res => res.data)
                        //     .then(user => {
                        //         setMessages(prev => [...prev, { sender: userId, user, content: lastJsonMessage.data.content }]);
                        //     });
                    }
                    break;
            }
        }
    }, [lastJsonMessage])


    const handleMessageSend = () =>
    {
        if (status === 'authenticated' && readyState === ReadyState.OPEN)
        {
            sendJsonMessage({ type: 'message', sender: data.user.uid, data: { room, sender: data.user.uid, name: data.user.name, content: messageInput } });
            setMessageInput('');
        }
    }


    return (
        <>
            {
                isChatBoxOpen ?
                <div className="chat-window">
                    <div
                        className="close-chat"
                        onClick={() => setIsChatBoxOpen(false)}
                        data-tooltip="Close Chat"
                        data-tooltip-pos="right"
                    >
                        <CloseSquareOutlined />
                    </div>
                    <div className="chat-feed">
                        {
                            messages.map(message => {
                                return (
                                    <p><span key={message.sender} className="name animate-appearance-in">{ message.name }</span>{ message.content }</p>
                                )
                            })
                        }
                    </div>
                    <div className="chat-footer">
                        <div className="chat-message-wrapper">
                            <textarea placeholder="Send a message:"
                                      value={messageInput}
                                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessageInput(e.target.value)}
                                      disabled={readyState!==ReadyState.OPEN}
                                      />
                        </div>
                        <div className="button-wrapper">
                            {
                                (readyState!==ReadyState.OPEN) ?
                                <div className='flex justify-center items-center w-full h-[40px] border-none outline-none text-sm tracking-wide uppercase text-white bg-[var(--text-color-secondary)]'>
                                    <span className='animate-pulse'>Connecting . . .</span>
                                </div>
                                :
                                <button onClick={handleMessageSend}>Send Message</button>
                            }
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}