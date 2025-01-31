import React, { useState, useCallback, useEffect } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FcImageFile } from "react-icons/fc";
import { LuX } from "react-icons/lu";
import { useRef } from "react";

interface FileInputProps {
  onChange: (files: File[]) => void;
  files: File[];
}

const FileInput = ({ onChange, files }: FileInputProps) => {
  const [dragging, setDragging] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (fileInputRef.current && files.length > 0) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));

      fileInputRef.current.files = dataTransfer.files;
    }
  }, [files]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      const newFiles = [...files, ...droppedFiles];
      onChange(newFiles);
    },
    [onChange, files]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
      const newFiles = [...files, ...selectedFiles];
      onChange(newFiles);
    },
    [onChange, files]
  );

  const handleDeleteFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <>
      <div
        onDragOver={handleDrag}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
        className={`
                flex flex-col items-center justify-center w-full h-full min-h-[200px]
                px-4 py-6 transition-all duration-300 ease-in-out rounded-lg
               
                ${
                  dragging
                    ? "border-dashed border-2 border-primary bg-primary/10"
                    : "border-dashed border-2 border-gray-500 hover:border-gray-300 hover:bg-primary/5"
                }
                ${
                  isInvalid && files.length == 0
                    ? "border-[#f31260] bg-[#fee7ef] hover:bg-[#ffcedf] hover:border-[#f31260]"
                    : ""
                }
            `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute opacity-0 w-0 h-0"
          id="fileInput"
          multiple
          required
          onInvalid={() => setIsInvalid(true)}
          name="file"
          ref={fileInputRef}
        />
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
          {files.length === 0 && (
            <MdOutlineCloudUpload
              className={`w-16 h-16 mb-4  ${
                isInvalid ? "text-[#f31260]" : "text-primary"
              }`}
            />
          )}

          {files.length !== 0 && (
            <div className="w-full space-y-2 overflow-y-auto max-h-[calc(100%-2rem)]">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-100 rounded-md flex justify-between items-center"
                >
                  <div className="flex items-center space-x-2 ">
                    <FcImageFile className="flex-shrink-0 w-8 h-8" />
                    <p className="text-sm text-gray-700 truncate flex-grow">
                      {file.name}
                    </p>
                  </div>

                  <div
                    onClick={() => handleDeleteFile(index)}
                    className=" cursor-pointer "
                  >
                    <LuX
                      className="text-[#f31260] hover:text-[#f44481]  text-2xl font-bold"
                      strokeWidth={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </label>
      </div>
      {isInvalid && (
        <p className="text-[0.75rem] mt-1 text-[#f31260]">
          Veillez ajouter un fichier.
        </p>
      )}
    </>
  );
};

export default FileInput;
