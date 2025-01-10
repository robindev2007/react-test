"use client";
import React, { useRef } from "react";
import { Rnd } from "react-rnd";

function TShirtEditor({
  logoImage,
  tShirtImage,
}: {
  tShirtImage: string;
  logoImage?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        className="parent group relative sm:max-w-[25rem]"
        ref={containerRef}
      >
        {tShirtImage && (
          <img
            src={tShirtImage}
            alt="T-shirt Image"
            className="pointer-events-none"
          />
        )}

        <Rnd
          bounds="parent"
          default={{
            height: 150,
            width: 150,
            x: 50,
            y: 50,
          }}
        >
          {logoImage && (
            <img
              className="pointer-events-none h-full w-full border border-transparent object-contain group-hover:border-red-400"
              src={logoImage}
              height={800}
              width={800}
              alt="Logo"
            />
          )}
        </Rnd>
      </div>
    </div>
  );
}

export default TShirtEditor;
