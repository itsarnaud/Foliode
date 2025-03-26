"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./model";


const ModelViewer: React.FC = () => {

  return (
    <div className="top-5 left-12 -z-10 mt-12 hidden md:block">
      <Canvas
        style={{ height: "80vh", width: "30vw" }}
        className="rounded-lg mx-auto mb-auto"
        camera={{ position: [0, 3, 8] }}
      >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={7} />
      <directionalLight position={[-10, -10, -5]} intensity={3} />
      <Suspense>
        <Model modelPath="/model/fusee.gltf" />
      </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;