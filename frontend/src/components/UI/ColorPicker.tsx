"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { ChromePicker } from "react-color";

interface colorPickerProps {
  colors?: string[];
  addNewColor: boolean;
  onChange: (colors: string[]) => void;
}

export default function ColorPicker({
  colors,
  onChange,
  addNewColor,
}: colorPickerProps) {
  const [palette, setPalette] = useState<string[]>(colors ? colors : []);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addColor = () => {
    setPalette([...palette, currentColor]);
    setCurrentColor("#000000");
    setShowColorPicker(false);
  };

  const updateColor = (index: number, color: string) => {
    const newPalette = [...palette];
    newPalette[index] = color;
    setPalette(newPalette);
    onChange(newPalette);
  };

  const removeColor = (index: number) => {
    const newPalette = palette.filter((_, i) => i !== index);
    setPalette(newPalette);
  };

  const handleColorChange = (color: any) => {
    const newColor = color.hex.toUpperCase();
    setCurrentColor(newColor);
    if (editingIndex !== null) {
      updateColor(editingIndex, newColor);
    }
  };

  return (
    <div className="pt-4 pb-4 max-w-md ">
      <h2 className="text-lg font-semibold mb-4">Palette de couleurs</h2>
      <div className="space-y-4">
        {palette.map((color, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-full cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => {
                setCurrentColor(color);
                setEditingIndex(index);
                setShowColorPicker(true);
              }}
            />
            <Input
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              className="flex-grow"
            />
            {addNewColor && (
              <Button color="danger" onClick={() => removeColor(index)}>
                Supprimer
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        {addNewColor && (
          <Button onClick={() => setShowColorPicker(!showColorPicker)}>
            {showColorPicker ? "Fermer" : "Ajouter une couleur"}
          </Button>
        )}

        {showColorPicker && (
          <div className="mt-2">
            <ChromePicker
              color={currentColor}
              onChange={handleColorChange}
              disableAlpha={true}
            />
            {addNewColor && (
              <Button onClick={addColor} className="mt-2">
                Ajouter à la palette
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
