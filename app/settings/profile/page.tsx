'use client'

import { Divider } from "antd";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Cropper from 'react-easy-crop';
import axios from "axios";


export default function ProfilePage()
{
    const { status, data, update } = useSession();
    const [profileFormData, setProfileFormData] = useState<any>();
    const [selectedFile, setSelectedFile] = useState<File|undefined>(undefined);
    const [crop, setCrop] = useState<{ x:number, y:number }>({ x: 0, y: 0 });
    const [imgSrc, setImgSrc] = useState<string>('');
    const [zoom, setZoom] = useState(1);
    const [rotate, setRotate] = useState<number>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [isCropModalShow, setIsCropModalShow] = useState<boolean>(false);
    const [isSuccessMessageShow, setIsSuccessMessageShow] = useState(false);


    useEffect(() =>
    {
        if (data) {
            setProfileFormData({
                uid: data.user.uid,
                email: data.user.email,
                name: data.user.name,
            });
        }
    }, [data]);

    useEffect(() =>
    {
        if (selectedFile != undefined) {
            setIsCropModalShow(true);
        }
    }, [selectedFile]);


    const onUploadButtonClick = () => document.getElementById('file-upload')!.click();

    const onFileUpload = (e: ChangeEvent<HTMLInputElement>) =>
    {
        e.preventDefault();

        const files = e.target.files;
        if (files && files.length > 0 && status === 'authenticated') {
            const file = files.item(0);
            setSelectedFile(file as File);
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() || '');
            });
            reader.readAsDataURL(files[0]);
        }
        else {
            setSelectedFile(undefined);
        }
    }

    const changeScale = (num: number) => {
        setZoom((prev: number) => {
            const v = parseFloat(prev.toFixed(1))+num;
            if (v < 1 || v > 2) {
                return prev;
            }
            else
                return v;
        });
    }

    const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onCropUpload = async () =>
    {
        try {
            const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels, rotate);
            const formData = new FormData();
            formData.append('file', croppedImage as Blob);
            axios.post(`/api/users/avatar/${data?.user.uid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.status===200)
            .then(isOk => {
                if (isOk) {
                    update();
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
        setProfileFormData({ ...profileFormData, [name]: value });
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        axios.put('/api/users', profileFormData)
        .then(res => res.status===200)
        .then(async (isOk: boolean) => {
            if (isOk) {
                await showToastMessage();
            }
        });
    }

    const showToastMessage = async () => {
        return new Promise<void>((resolve) => {
            setIsSuccessMessageShow(true);
            setTimeout(() => {
                resolve();
                setIsSuccessMessageShow(false);
            }, 5000);
        });
    }


    if (status !== 'authenticated' || !data || !profileFormData)
        return <></>

    return (
        <div className='w-full'>
            <h4 className="text-3xl font-normal">Public profile</h4>
            <Divider />
            <div className="mt-4">
                <div className="mt-5 md:mt-0">
                    <form onSubmit={onSubmit}>
                        <div className="overflow-hidden">
                            <div className="py-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 md:col-span-3 grid grid-cols-4 gap-8">
                                        <div className="col-span-4">
                                            <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="given-name"
                                            className="mt-1 block w-full shadow-sm text-sm rounded-md py-2 px-3 border border-gray-300 focus-visible:outline-none focus-visible:border-gray-500"
                                            value={profileFormData.name}
                                            onChange={onFormDataChange}
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                                Email address
                                            </label>
                                            <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            className="mt-1 block w-full shadow-sm text-sm rounded-md py-2 px-3 border border-gray-300 focus-visible:outline-none focus-visible:border-gray-500"
                                            value={profileFormData.email}
                                            onChange={onFormDataChange}
                                            />
                                        </div>
                                        <div className="col-span-4 md:col-span-2">
                                            <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                                Country / Region
                                            </label>
                                            <select
                                            id="country"
                                            name="country"
                                            autoComplete="country"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus-visible:outline-none focus-visible:border-gray-500"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>China</option>
                                                <option>Taiwan</option>
                                                <option>Russia</option>
                                                <option>Ukraine</option>
                                                <option>German</option>
                                                <option>France</option>
                                                <option>United Kindom</option>
                                                <option>Sweden</option>
                                            </select>
                                        </div>
                                        <div className="col-span-4 md:col-span-2">
                                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                                Age
                                            </label>
                                            <input
                                                type="text"
                                                id="age"
                                                placeholder="Optional"
                                                className="mt-1 block w-full shadow-sm text-sm rounded-md py-2 px-3 border border-gray-300 focus-visible:outline-none focus-visible:border-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3 flex justify-center items-center max-md:hidden">
                                        <div className="relative w-52 h-52">
                                            <div className="static w-52 h-52 rounded-full overflow-hidden" style={{ boxShadow: '0 0 0 1px var(--shadow-color-secondary)' }}>
                                                <img
                                                    src={`data:image/png;base64,${data.user.avatar}`}
                                                    className="h-full w-full object-cover"
                                                    alt="user"
                                                />
                                            </div>
                                            <div className="absolute z-50 left-2 bottom-2">
                                                <input type="file" id="file-upload" onChange={onFileUpload} style={{ display: 'none' }} />
                                                <button
                                                    type="button"
                                                    className="text-gray-700 bg-white hover:bg-gray-200 outline-none font-medium rounded-md border-gray-300 border-1 text-sm px-3 py-1 text-center inline-flex items-center me-2 gap-1 transition-all"
                                                    onClick={onUploadButtonClick}
                                                >
                                                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                                                    </svg>
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5 gap-8 mt-8">
                                    <div className="col-span-5 md:col-span-3">
                                        <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
                                            Street address
                                        </label>
                                        <input
                                        type="text"
                                        name="street_address"
                                        id="street_address"
                                        autoComplete="street-address"
                                        placeholder="Optional"
                                        className="mt-1 block w-full shadow-sm text-sm rounded-md py-2 px-3 border border-gray-300 focus-visible:outline-none focus-visible:border-gray-500"
                                        />
                                    </div>
                                    <div className="col-span-5 md:col-span-3">
                                        <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        City
                                        </label>
                                        <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Optional"
                                        className="mt-1 block w-full shadow-sm text-sm rounded-md py-2 px-3 border border-gray-300 focus-visible:outline-none focus-visible:border-gray-500"
                                        />
                                    </div>
                                    <div className="col-span-5 md:col-span-3">
                                        <label
                                        htmlFor="state"
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        State / Province
                                        </label>
                                        <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="Optional"
                                        className="mt-1 block w-full shadow-sm text-sm rounded-md py-2 px-3 border border-gray-300 focus-visible:outline-none focus-visible:border-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ml-1 py-4 text-left">
                                <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div
                id="avatar-crop-modal"
                className={`fixed top-0 left-0 right-0 z-50 justify-center items-center w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-black bg-opacity-50 ${isCropModalShow ? 'flex' : 'hidden'}`}
            >
                <div className="relative w-full max-w-lg max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Image crop
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setIsCropModalShow(false)}
                            >
                                <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 space-y-4">
                            <Cropper
                                image={imgSrc}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotate}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                classes={{
                                    containerClassName: `![position:relative] [width:100%] [height:40vh] [&~section:first-of-type]:[margin-top:16px] [&~section:last-of-type]:[margin-bottom:16px]`,
                                    mediaClassName: ``,
                                }}
                                />
                            <div className="flex items-center gap-4">
                                <button onClick={() => changeScale(-0.1)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                    </svg>
                                </button>
                                <input type="range" min="1" max="2" step={0.1} value={zoom} className="w-full h-2 bg-gray-200 text-orange-500 rounded-lg appearance-none cursor-pointer" onChange={(e) => setZoom(Number(e.target.value))} />
                                <button onClick={() => changeScale(0.1)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="range" min="-180" max="180" defaultValue={0} className="w-full h-2 bg-gray-200 text-orange-500 rounded-lg appearance-none cursor-pointer" onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))} />
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 rounded-b">
                            <button
                                data-modal-hide="medium-modal"
                                type="button"
                                className="w-1/2 text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                                onClick={onCropUpload}
                            >
                                Confirm
                            </button>
                            <button
                                data-modal-hide="medium-modal"
                                type="button"
                                className="w-1/2 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-orange-500 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {
                isSuccessMessageShow ?
                <div
                    id="toast-success"
                    className="fixed bottom-8 right-8 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 animate-appearance-in"
                    role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">Profile successfull updated</div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        onClick={() => setIsSuccessMessageShow(false)}
                        aria-label="Close"
                    >
                        <span className="sr-only">Close</span>
                        <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                        </svg>
                    </button>
                </div>
                :
                <></>
            }

        </div>
    )
}

const createImage = (url: any) =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
      image.src = url
    })

function getRadianAngle(degreeValue: any) {
    return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation)

    return {
        width:
        Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
        Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    }
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: any,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
): Promise<any> {
    const image: any = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    const rotRad = getRadianAngle(rotation)

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    )

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)

    // draw rotated image
    ctx.drawImage(image, 0, 0)

    const croppedCanvas = document.createElement('canvas')

    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
        return null
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    return new Promise((resolve, _reject) => {
        croppedCanvas.toBlob((blob) => {
            const file = new File([blob as Blob], 'upload.jpeg', { type: 'image/jpeg' });
            resolve(file);
        }, 'image/jpeg');
    })
}
