'use client';

import { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@heroui/react';

import { useMultiStep } from '@/utils/store';
import { Template } from '@/interfaces/Template';
import { templates } from '@/data/templates/templates';
import { Colors } from '@/interfaces/Colors';
import { templatesStyles } from '@/data/templates/styles';

import ColorPicker from '@/components/UI/ColorPicker';

function FourStepForm() {
  const { portfolio, setPortfolio } = useMultiStep();
  const [selectedStyle, setSelectedStyle] = useState<Colors | null>(null);

  const handleTemplateChange = (value: Template) => {
    const newData = {
      ...portfolio,
      template: value.id,
      config: { colors: value.color },
    };
    setPortfolio(newData);
  };

  const handleStyleChange = (style: Colors) => {
    setSelectedStyle(style);
    
    const newData = {
      ...portfolio,
      config: { 
        ...portfolio.config,
        colors: {
          primary: style.primary,
          secondary: style.secondary,
          warning: style.warning,
          success: style.success,
          info: style.info,
          light: style.light
        }
      },
    };
    setPortfolio(newData);
  };
  
  const handleColorChange = (key: string, colorValue: string) => {
    if (!selectedStyle) return;
    
    const updatedStyle = {
      ...selectedStyle,
      [key]: colorValue
    };
    setSelectedStyle(updatedStyle);
    
    const newData = {
      ...portfolio,
      config: { 
        ...portfolio.config,
        colors: {
          ...(portfolio.config.colors || {
            primary: "",
            secondary: "",
            warning: "",
            success: "",
            info: "",
            light: ""
          }),
          [key]: colorValue
        }
      },
    };
    setPortfolio(newData);
  };
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Choisissez votre template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} isPressable shadow="sm" onPress={() => handleTemplateChange(template)}
            className={portfolio.template === template.id ? "ring-2 ring-primary" : ""}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={template.name}
                className="w-full object-cover h-[140px]"
                radius="lg"
                shadow="sm"
                src={template.preview}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{template.name}</b>
            </CardFooter>
          </Card>
        ))}
      </div>

      {portfolio.template &&
      <>
        <h3 className="text-lg font-semibold my-4">Choisissez votre palette de couleurs</h3>
        <div className="w-full flex items-center justify-between gap-5">
          {templatesStyles.map((style) => (
            <Button 
              key={style.name} 
              variant={selectedStyle?.primary === style.primary ? "solid" : "bordered"} 
              color={selectedStyle?.primary === style.primary ? "primary" : "default"}
              className="w-full"
              onPress={() => handleStyleChange(style)}
            >
              {style.name}
            </Button>
          ))}
        </div>

        {selectedStyle && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Personnalisez vos couleurs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {Object.entries(selectedStyle).map(([key, value]) => {
                if (key === 'name') return null;
                return (
                  <ColorPicker 
                    key={key} 
                    colorKey={key} 
                    colorValue={value} 
                    onChange={handleColorChange}
                  />
                );
              })}
            </div>
          </div>
        )}
      </>
      }
    </div>
  );
}

export default FourStepForm;