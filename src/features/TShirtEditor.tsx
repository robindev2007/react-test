"use client";
import React, { useRef, useEffect, useState } from "react";
import { Rnd } from "react-rnd";

function TShirtEditor({
  logoImage,
  tShirtImage,
}: {
  tShirtImage: string;
  logoImage?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [logoSize, setLogoSize] = useState({ width: 20, height: 20 }); // Percentage-based
  const [logoPosition, setLogoPosition] = useState({ x: 10, y: 10 }); // Percentage-based

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  const calculateAbsolutePosition = () => ({
    width: (logoSize.width / 100) * containerSize.width,
    height: (logoSize.height / 100) * containerSize.height,
    x: (logoPosition.x / 100) * containerSize.width,
    y: (logoPosition.y / 100) * containerSize.height,
  });

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
        {containerSize.width > 0 && containerSize.height > 0 && (
          <Rnd
            bounds="parent"
            size={calculateAbsolutePosition()}
            position={calculateAbsolutePosition()}
            onDragStop={(e, data) => {
              setLogoPosition({
                x: (data.x / containerSize.width) * 100,
                y: (data.y / containerSize.height) * 100,
              });
            }}
            onResizeStop={(_, __, ref, ___, position) => {
              setLogoSize({
                width: (ref.offsetWidth / containerSize.width) * 100,
                height: (ref.offsetHeight / containerSize.height) * 100,
              });
              setLogoPosition({
                x: (position.x / containerSize.width) * 100,
                y: (position.y / containerSize.height) * 100,
              });
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
        )}
      </div>
    </div>
  );
}

export default TShirtEditor;
