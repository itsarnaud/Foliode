"use client";

import ColorPicker from "@/components/UI/ColorPicker";
import { useMultiStep } from "@/utils/store";
import { template } from "@/interfaces/templates";
import { Select, SelectItem, Card, CardHeader, Image } from "@nextui-org/react";
import { colors } from "@/interfaces/Colors";

export interface StepThreeData {
  template: string;
  couleurs: string;
  typo: string;
}

function FourStepForm() {
  const { multiStep, setMultiStep } = useMultiStep();

  const templates: template[] = [
    {
      id: "prestige",
      name: "prestige",
      preview: "/dashboard.png",
      color: {
        primary: "#0E0E0E",
        secondary: "#DAC6A7",
        warning: "#0E0E0E",
        success: "#DAC6A7",
        info: "#343230",
        light: "#181716",
      },
    },
    {
      id: "banto",
      name: "Banto",
      preview: "/banto.png",
      color: {
        primary: "#669BBC",
        secondary: "#FDF0D5",
        warning: "#ffc107",
        success: "#28a745",
        info: "#17a2b8",
        light: "#003049",
      },
    },
    {
      id: "emerald",
      name: "Emerald",
      preview: "/emerald.png",
      color: {
        primary: "#334B35",
        secondary: "#FFFFFF",
        warning: "#F6EEE1",
        success: "#FAAF15",
        info: "#231C0A",
        light: "#334B35",
      },
    },
  ];

  const handleChange = (value: template) => {
    const newData = { ...multiStep.portfolio, template: value.id, config: { colors: value.color } };
    setMultiStep({ ...multiStep, portfolio: newData });
  };

  const handleColorChange = (value: colors) => {
    const newData = { ...multiStep.portfolio.config, colors: value };
    setMultiStep({
      ...multiStep,
      portfolio: {
        ...multiStep.portfolio,
        config: newData,
      },
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Choisissez votre template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            isPressable
            onPress={() => handleChange(template)}
            className={`h-[300px] ${
              multiStep.portfolio.template === template.id
                ? "border-4 border-primary"
                : ""
            }`}
          >
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-black/40 rounded-t-xl w-full">
              <h4 className="text-white font-medium text-large">
                {template.name}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={`Template ${template.name}`}
              className="z-0 w-full h-full object-cover"
              src={template.preview}
            />
          </Card>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {multiStep.portfolio.template !== "" && (
          <ColorPicker
            onChange={(value) => handleColorChange(value)}
            colors={
              multiStep.portfolio.config.colors
                ? multiStep.portfolio.config.colors
                : undefined
            }
          />
        )}
        {/*
    <Select
    label="Typographie"
    placeholder="Choisissez votre typographie"
    value={multiStep.style.typo}
    onChange={(e) => handleChange("typo", e.target.value)}
  >
    <SelectItem key="poppins" value="poppins">
      Poppins
    </SelectItem>
    <SelectItem key="roboto" value="roboto">
      Roboto
    </SelectItem>
    <SelectItem key="openSans" value="openSans">
      Open Sans
    </SelectItem>
    <SelectItem key="montserrat" value="montserrat">
      Montserrat
    </SelectItem>
    <SelectItem key="lato" value="lato">
      Lato
    </SelectItem>
  </Select>
*/}
      </div>
    </div>
  );
}

export default FourStepForm;