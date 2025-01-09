"use client";
import React from "react";
import Dropzone, { Accept, DropzoneOptions } from "react-dropzone";

export default function FileDropzone({
  accept,
  acceptedFiles,
}: {
  accept?: Accept;
  acceptedFiles: DropzoneOptions["onDrop"];
}) {
  return (
    <Dropzone accept={accept} onDrop={acceptedFiles}>
      {({ getRootProps, getInputProps }) => (
        <section className="">
          <div
            {...getRootProps()}
            className="space-y-2 rounded-md border border-dashed border-[#42424e] bg-[#19191E] p-3 text-center shadow-md"
          >
            <input {...getInputProps()} />
            <p>Drag and drop image here, or click to select files</p>
            <button className="mx-auto bg-sky-500 p-3 py-1 font-semibold">
              Upload File
            </button>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
