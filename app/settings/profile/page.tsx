'use client'

import { Button, Col, Divider, Row, Upload, UploadFile, Image } from "antd";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function ProfilePage()
{
    const { status, data } = useSession();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<Array<UploadFile>>([
        {
            uid: '0',
            name: 'image.png',
            status: 'done'
        }
    ])

    useEffect(() =>
    {
        if (data)
        {
            setFileList([
            {
                uid: '0',
                name: 'image.png',
                status: 'done',
                url: `data:image/png;base64,${data.user.avatar}`,
            }])
        }    
    },
    [data])

    const handlePreview = async (file: UploadFile|any) => {
        console.log(file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    
    const handleChange = ({ fileList: newFileList }: {fileList: any}) =>
    {
        setFileList(newFileList)
    }

    const handleRemove = async (_file: any) =>
    {
        return false
    }

    if (!status || status === 'unauthenticated' || !data)
        return <></>


    return (
        <div className='w-full'>
            <p
            className="site-description-item-profile-p-title"
            style={{
                marginBottom: 24, fontSize:'32px', fontWeight:400, fontFamily:'cursive'
            }}
            >
                User Profile
            </p>
            <ImgCrop rotationSlider>
                <Upload
                    name='file'
                    action={`/api/users/avatar/${data.user.uid}`}
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={handleRemove}
                    maxCount={1}
                >
                    {fileList.length > 1 ? null : uploadButton}
                </Upload>
            </ImgCrop>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
            <Divider />
            <Row className='site-description-item-profile-row'>
                <Col span={12}>
                    <DescriptionItem title="Full Name" content={data.user.name} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Account" content={data.user.email} />
                </Col>
            </Row>
            <Row className='site-description-item-profile-row'>
                <Col span={12}>
                    <DescriptionItem title="E-mail" content={data.user.email} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Phone Number" content={''} />
                </Col>
            </Row>
            {/* <Row className='site-description-item-profile-row'>
                <Col span={12}>
                    <DescriptionItem title="City" content={'placeholder'} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Country" content={'placeholder'} />
                </Col>
            </Row> */}
            <Row className='site-description-item-profile-row'>
                <Col span={12}>
                    <DescriptionItem title="Age" content={'placeholder'} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Website" content="-" />
                </Col>
            </Row>
            {/* <Row className='site-description-item-profile-row'>
                <Col span={24}>
                    <DescriptionItem title="Message" content={auth.user.bio} />
                </Col>
            </Row> */}
            <Button className='mt-10' icon={<EditOutlined />}>
                Edit Profile
            </Button>
        </div>
    )
}

const DescriptionItem = ({ title, content }: { title: string, content: string }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
);

const getBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
});

const uploadButton = (
    <button
        style={{ border: 0,background: 'none' }}
        type="button"
        >
        <PlusOutlined />
        <div
            style={{marginTop: 8}}
        >
            Upload
        </div>
    </button>
);