"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { ChromePicker } from "react-color";
import { colors } from "@/interfaces/Colors";

interface ColorPickerProps {
  colors?: colors;
  onChange: (colors: colors) => void;
}

export default function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [palette, setPalette] = useState<colors | null>(colors || null);
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const updateColor = (key: string, color: string) => {
    if (palette) {
      const newPalette = { ...palette, [key]: color };
      setPalette(newPalette);
      onChange(newPalette);
    }
  };

  const handleColorChange = (color: any) => {
    const newColor = color.hex.toUpperCase();
    setCurrentColor(newColor);
    if (currentKey && palette) {
      updateColor(currentKey, newColor);
    }
  };

  return (
    <div className="pt-4 pb-4 max-w-md ">
      <h2 className="text-lg font-semibold mb-4">Palette de couleurs</h2>
      <div className="space-y-4">
        {palette &&
          (Object.keys(palette) as Array<keyof colors>).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-full cursor-pointer"
                style={{ backgroundColor: palette[key] }}
                onClick={() => {
                  setCurrentColor(palette[key]);
                  setCurrentKey(key as string);
                  setShowColorPicker(true);
                }}
              />
              <div className="flex-grow flex items-center">
                <span className="mr-2 font-semibold">{key}:</span>
                <Input
                  value={palette[key]}
                  onChange={(e) => updateColor(key as string, e.target.value)}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4">
        {showColorPicker && (
          <div className="mt-2">
            <ChromePicker
              color={currentColor}
              onChange={handleColorChange}
              disableAlpha={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
