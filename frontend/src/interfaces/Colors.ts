export interface Colors {
  primary : string,
  secondary : string
  warning: string
  success: string
  info: string 
  light: string
}

export interface ColorPickerProps {
  colorKey: string;
  colorValue: string;
  onChange: (key: string, value: string) => void;
}