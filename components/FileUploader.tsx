// components/FileUploader.tsx
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircleArrowDown, RocketIcon } from "lucide-react";

export default function FileUploader() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [result, setResult] = useState<string>("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setStatus("processing");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const { jobId } = await res.json();
    setJobId(jobId);

    // Save jobId to localStorage
    localStorage.setItem("jobId", jobId);

    // Poll for result
    const poll = async () => {
      const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/result?jobId=${jobId}`);
      const data = await r.json();
      if (data.status === "done") {
        setResult(data.message || "");
        localStorage.setItem("text", data.message || "");
        setStatus("done");
      } else {
        setTimeout(poll, 3000);
      }
    };
    poll();
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    maxFiles: 5,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed w-[90%] rounded-lg h-96 flex items-center justify-center ${
          isFocused || isDragActive ? "bg-indigo-300" : "bg-indigo-100"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <RocketIcon className="h-20 w-20 animate-ping" />
            <p>Drop the file here …</p>
          </>
        ) : (
          <>
            <CircleArrowDown className="h-20 w-20 animate-bounce" />
            <p>Drag & drop a file here, or click to select</p>
          </>
        )}
      </div>

      {status === "processing" && <p>Processing your document…</p>}
      {status === "done" && (
        <div className="w-[90%] p-4 bg-white rounded shadow">
          <h4 className="font-bold mb-2">Summary</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
