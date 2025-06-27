"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CircleArrowDown, RocketIcon } from "lucide-react";

function FileUploader() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Insert your backend call or processing logic here
      console.log("Selected PDF:", file);
      //an backend call can be made here to upload the file to /api/gettext
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("/api/gettext", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("File upload failed");
        }
        const data = await response.json();
        console.log("File uploaded successfully:", data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-7xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600 text-indigo-600 rounded-lg h-96 flex items-center justify-center ${
          isFocused || isDragActive ? "bg-indigo-300" : "bg-indigo-100"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center">
          {isDragActive ? (
            <>
              <RocketIcon className="h-20 w-20 animate-ping" />
              <p>Drop the PDF here ...</p>
            </>
          ) : (
            <>
              <CircleArrowDown className="h-20 w-20 animate-bounce" />
              <p>Drag and drop a PDF here, or click to select</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
