"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { ChromePicker } from "react-color";
import { colors } from "@/interfaces/Colors";

interface ColorPickerProps {
  colors?: colors;
  onChange: (colors: colors) => void;
}

const predefinedStyles = {
  luxury: {
    primary: "#0E0E0E",
    secondary: "#DAC6A7",
    warning: "#0E0E0E",
    success: "#DAC6A7",
    info: "#343230",
    light: "#181716",
  },
  emerald: {
    primary: "#334B35",
    secondary: "#FFFFFF",
    warning: "#F6EEE1",
    success: "#FAAF15",
    info: "#231C0A",
    light: "#334B35",
  },
  blue: {
    primary: "#669BBC",
    secondary: "#FDF0D5",
    warning: "#ffc107",
    success: "#28a745",
    info: "#17a2b8",
    light: "#003049",
  },
  // Ajoutez d'autres styles prédéfinis ici
};

// const colorLabels: Record<string, string> = {
//   primary: "Arrière-plan principal",
//   light: "Arrière-plan secondaire",
//   warning: "Petits éléments (boutons, icônes)",
//   secondary: "Couleur du texte principal",
//   success: "Gros titres",
//   info: "Petits éléments",
// };

export default function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [palette, setPalette] = useState<colors | null>(colors || null);
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showCustomColors, setShowCustomColors] = useState(false);
  const [pickerPosition, setPickerPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

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

  const applyPredefinedStyle = (style: keyof typeof predefinedStyles) => {
    const newPalette = predefinedStyles[style];
    setPalette(newPalette);
    onChange(newPalette);
    setShowCustomColors(true);
  };

  const handleCustomizeClick = () => {
    setShowCustomColors(true);
    setPalette(colors || null);
  };

  const handleCardClick = (
    key: string,
    color: string,
    event: React.MouseEvent
  ) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setCurrentColor(color);
    setCurrentKey(key);
    setShowColorPicker(true);
    setPickerPosition({
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + window.scrollX,
    });
  };

  return (
    <div className="pt-4 pb-4">
      <h2 className="text-lg font-semibold mb-4">Palette de couleurs</h2>
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Styles prédéfinis</h3>
        <div className="flex space-x-2">
          {Object.keys(predefinedStyles).map((style) => (
            <Button
              key={style}
              variant={
                palette ===
                predefinedStyles[style as keyof typeof predefinedStyles]
                  ? "solid"
                  : "bordered"
              }
              color={
                palette ===
                predefinedStyles[style as keyof typeof predefinedStyles]
                  ? "primary"
                  : "default"
              }
              onClick={() =>
                applyPredefinedStyle(style as keyof typeof predefinedStyles)
              }
              className="transition-all"
            >
              {style}
            </Button>
          ))}
        </div>
      </div>
      {showCustomColors && (
        <div className="flex gap-4 flex-wrap mt-4">
          {palette &&
            (Object.keys(palette) as Array<keyof colors>).map((key) => (
              <div
                key={key} // Ajouter la clé ici sur l'élément parent
                className="dayMode bg-foreground p-2 border-2 border-[#252525] rounded-xl"
              >
                <div
                  className="p-4 flex flex-col items-start space-y-2 cursor-pointer bg-content1 rounded-md w-52 h-28"
                  style={{ backgroundColor: palette[key] }}
                  onClick={(e) => handleCardClick(key, palette[key], e)}
                >
                  <h3 className="text-md text-white font-semibold">{key}:</h3>
                  <div className="w-full flex items-center space-x-2">
                    <Input
                      value={palette[key]}
                      onChange={(e) =>
                        updateColor(key as string, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {showColorPicker && pickerPosition && (
        <div
          ref={pickerRef}
          style={{
            position: "absolute",
            top: pickerPosition.top,
            left: pickerPosition.left,
          }}
        >
          <ChromePicker color={currentColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}
