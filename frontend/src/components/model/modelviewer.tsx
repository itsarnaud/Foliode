"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import Model from "./model";


const ModelViewer: React.FC = () => {

  return (
    <div className="absolute top-5 right-0 z-index: -3 mt-12">
      <Canvas
        style={{ height: "80vh", width: "30vw"  }}
        className="shadow-lg border-place holder-color rounded-lg mx-auto mb-auto"
        camera={{ position: [0, 3, 8]}}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={7} />
        <directionalLight position={[-10, -10, -5]} intensity={3} />
        <Suspense
          
        >
        
          <Model modelPath="/model/Sae501_robot_complet_final.gltf" showWalls={true} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;