import React, { useState, useCallback } from 'react'
import { MdOutlineCloudUpload } from "react-icons/md"
import { FcImageFile } from "react-icons/fc"

interface FileInputProps {
    onChange: (files: File[]) => void
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
    const [dragging, setDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
    }, [])

    const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        const droppedFiles = Array.from(e.dataTransfer.files)
        setFiles(prevFiles => {
            const newFiles = [...prevFiles, ...droppedFiles]
            onChange(newFiles)
            return newFiles
        })
    }, [onChange])

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : []
        setFiles(prevFiles => {
            const newFiles = [...prevFiles, ...selectedFiles]
            onChange(newFiles)
            return newFiles
        })
    }, [onChange])

    return (
        <div
            onDragOver={handleDrag}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDrop={handleDrop}
            className={`
        flex flex-col items-center justify-center w-full h-full min-h-[200px]
        px-4 py-6 transition-all duration-300 ease-in-out rounded-lg
        ${dragging
                ? 'border-dashed border-2 border-primary bg-primary/10'
                : 'border-dashed border-2 border-gray-500 hover:border-gray-300 hover:bg-primary/5'
            }
      `}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                multiple
            />
            <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
                {files.length === 0 ? (
                    <>
                        <MdOutlineCloudUpload className="w-16 h-16 mb-4 text-primary" />

                    </>
                ) : (
                    <div className="w-full space-y-2 overflow-y-auto max-h-[calc(100%-2rem)]">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md">
                                <FcImageFile className="flex-shrink-0 w-8 h-8" />
                                <p className="text-sm text-gray-700 truncate flex-grow">{file.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </label>
        </div>
    )
}

export default FileInput


