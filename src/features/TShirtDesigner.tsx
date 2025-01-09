"use client";
import FileDropzone from "@/components/FileDropzone";
import Image from "next/image";
import React, { useRef, useState } from "react";
import TShirtEditor from "./TShirtEditor";
import domToImage from "dom-to-image";
import { downloadFile } from "@/utils/downloadFile";
import { FaDownload } from "react-icons/fa6";

function TShirtDesigner() {
  const [logoImage, setLogoImage] = useState("");
  const tShirtContainerRef = useRef<HTMLDivElement>(null);

  const [exporting, setExporting] = useState(false);

  const exportImage = async () => {
    if (!tShirtContainerRef.current) return alert("Container not found");

    if (exporting) return;
    setExporting(true);

    const node = tShirtContainerRef.current;
    const scale = 5; // Export at double the resolution

    try {
      const img = await domToImage.toPng(node, {
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        },
        height: node.offsetHeight * scale,
        width: node.offsetWidth * scale,
      });

      downloadFile(img, "T-Shirt With Logo By Robin web developer");
    } catch (error) {
      console.error("Error exporting image:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div ref={tShirtContainerRef} className="shrink-0">
        <TShirtEditor tShirtImage="/t-shirt-1.png" logoImage={logoImage} />
      </div>

      <div className="w-full max-w-[50%] space-y-5">
        {logoImage && (
          <div className="w-fit bg-gray-600 p-3">
            <Image
              src={logoImage}
              height={800}
              width={800}
              alt="Uploaded Logo"
              className="max-h-20 w-fit"
            />
          </div>
        )}
        <FileDropzone
          acceptedFiles={(files) =>
            files && files.length > 0
              ? setLogoImage(URL.createObjectURL(files[0]))
              : alert("No file uploaded")
          }
          accept={{ "image/*": [] }}
        />
        <button
          onClick={exportImage}
          disabled={exporting}
          className={
            "flex w-full items-center justify-center gap-3 bg-[#1E90FF] p-3 py-2 text-lg hover:bg-[#4169E1] disabled:opacity-50 sm:w-fit"
          }
        >
          <FaDownload />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}

export default TShirtDesigner;
