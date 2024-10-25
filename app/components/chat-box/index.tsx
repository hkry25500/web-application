'use client'

import './styles.scss'


export default function ChatBox()
{
    return (
        <>
            <div className="chat-window">
                <div
                    className="close-chat"
                    onClick={() => console.log(123)}
                    data-tooltip="Close Chat"
                    data-tooltip-pos="right"
                >
                    <i className="material-icons">close</i>
                </div>
                <div className="chat-feed">
                    <p>
                        <span className="name">rAstley69</span>We're no strangers to love
                    </p>
                    <p>
                        <span className="name">rAstley69</span>You know the rules and so do I
                    </p>
                </div>
                <div className="chat-footer">
                    <div className="chat-message-wrapper">
                        <textarea placeholder="Send a message:" defaultValue={""} />
                        {/* <div className="chat-message-icons">
                            <div
                            className="icon-button"
                            data-tooltip="Cheer"
                            data-tooltip-pos="up-right"
                            >
                                <i className="material-icons">stars</i>
                            </div>
                            <div
                            className="icon-button"
                            data-tooltip="Emote"
                            data-tooltip-pos="up-right"
                            >
                                <i className="material-icons">face</i>
                            </div>
                        </div> */}
                    </div>
                    <div className="button-wrapper">
                        {/* <div>
                            <i
                            className="material-icons"
                            data-tooltip="Chat Settings"
                            data-tooltip-pos="up-left"
                            >
                            settings
                            </i>
                            <i
                            className="material-icons"
                            data-tooltip="Viewer List"
                            data-tooltip-pos="up-left"
                            >
                            list
                            </i>
                        </div> */}
                        <button>Send Message</button>
                    </div>
                </div>
            </div>
        </>
    )
}