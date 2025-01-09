import TShirtDesigner from "@/features/TShirtDesigner";
import React from "react";

function TShirtDesignPage() {
  return (
    <div className="p-3">
      <div>
        <h1 className="text-center text-lg">T-Shirt Logo Application</h1>

        <div className="p-3">
          <ul className="list-disc">
            <li className="text-sm font-medium">
              Used FileDropzone to handle drag and drop image upload
            </li>
            <li className="text-sm font-medium">
              Used <strong>react-rnd</strong> for drag and logo image
            </li>
            <li className="text-sm font-medium">
              Used <strong>dom-to-image</strong> for exporting image
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-center text-xl font-medium">T-Shirt</h2>
        <TShirtDesigner />
      </div>
    </div>
  );
}

export default TShirtDesignPage;
