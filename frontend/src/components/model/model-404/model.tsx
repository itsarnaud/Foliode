import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  showWalls: boolean;
}

const Model: React.FC<ModelProps> = ({ modelPath, showWalls }) => {
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);
  

  return <primitive object={scene} position={[0, 2, 0]}  rotation={[0, Math.PI / -7, -0.5]}/>;
};

export default Model;