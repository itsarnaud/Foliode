import React, {useState} from 'react'
import {MdOutlineCloudUpload} from "react-icons/md"
import {FcImageFile} from "react-icons/fc"

const FileInput = ({onChange}: { onChange: (files: File[]) => void }) => {
    const [dragging, setDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])

    const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
    }

    const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFiles([...files, droppedFile])
            onChange([...files, droppedFile])

        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null
        if (selectedFile) {
            setFiles([...files, selectedFile])

        }
    }

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            className={`px-2 py-2   ${
                dragging ? 'border-dashed border-2 border-primary-500' : 'border-dashed border-2 border-gray-500'
            } text-center rounded-lg`}

        >
            {files.length === 0 && (
                <MdOutlineCloudUpload className={`text-5xl text-primary font-light m-auto my-screen`}/>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{display: 'none'}}
                id="fileInput"
            />
            {files.length !== 0 && (
                <div className='m-2 p-2'>
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2  rounded-md ">
                            <FcImageFile className="text-primary-500 text-4xl" title={`Image: ${file.name}`}/>
                            <p className="text-primary-500 text-sm text-ellipsis">{file.name}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}


export default FileInput
