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

  useEffect(() => {
    if (actions) {
      const action = actions["ArmatureAction.002"]; 
      if (action) {
        action.play();
      }
    }
  }, [actions]);
  

  return <primitive object={scene} position={[0, -1, 0]}  rotation={[0, Math.PI / -6, 0]}/>;
};

export default Model;