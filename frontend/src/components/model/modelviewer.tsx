"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./model";

interface ModelViewerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  step?: number;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  position = [0, -1, 0], 
  rotation = [0, Math.PI / -6, 0],
  step = 0 
}) => {
  const getTransform = () => {
    const xTranslate = step % 2 === 0 ? '75%' : '-400%';
    const yTranslate = `${step * 20}%`;
    
    return `translate(${xTranslate}, ${yTranslate})`;
  };

  return (
    <div className="fixed -z-10 hidden lg:block transition-all duration-700 ease-in-out"
      style={{ 
        top: '5rem',
        right: '15%',
        transform: getTransform(),
        width: 'clamp(150px, 15vw, 300px)',
        height: 'clamp(300px, 80vh, 600px)'
      }}>
      <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 3, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={7} />
        <directionalLight position={[-10, -10, -5]} intensity={3} />
        <Suspense>
          <Model 
            modelPath="/model/Sae501_robot_complet_final.gltf" 
            position={position}
            rotation={rotation}
            step={step}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;