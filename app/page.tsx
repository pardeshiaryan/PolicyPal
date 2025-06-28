import FileUploader from '@/components/FileUploader'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Policy Pal</h1>
      <p className="text-center mt-4">Please upload your PDF file to get started.</p>
      <div className="flex justify-center mt-10">
        {/* FileUploader component will be inserted here */}
        <FileUploader />
      </div>
    </div>
  )
}

export default page