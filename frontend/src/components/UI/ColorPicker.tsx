import { ColorPickerProps } from '@/interfaces/Colors';
import { Tooltip }          from '@heroui/react';

export default function ColorPicker({ colorKey, colorValue, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col items-center">
      <Tooltip content="Cliquez pour modifier la couleur">
        <label htmlFor={`color-${colorKey}`} className="cursor-pointer">
          <div 
            className="w-16 h-16 sm:w-28 rounded-lg shadow-md mb-2 relative group"
            style={{ backgroundColor: colorValue }}
          >
          </div>
          <input
            id={`color-${colorKey}`}
            type="color"
            value={colorValue}
            onChange={(e) => onChange(colorKey, e.target.value)}
            className="opacity-0 absolute w-0 h-0"
          />
        </label>
      </Tooltip>
      <span className="text-sm font-medium">{colorKey}</span>
      <span className="text-xs text-gray-500">{colorValue}</span>
    </div>
  );
}