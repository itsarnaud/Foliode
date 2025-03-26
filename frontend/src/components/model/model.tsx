import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  step?: number;
}

const Model: React.FC<ModelProps> = ({ 
  modelPath, 
  position = [0, -1, 0], 
  rotation = [0, Math.PI / -6, 0],
  step = 0 
}) => {
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);
  const modelRef = useRef<THREE.Group>(null);
  const prevStep = useRef(step);

  useEffect(() => {
    if (actions) {
      const action = actions["ArmatureAction.002"]; 
      if (action) {
        action.play();
      }
    }
  }, [actions]);

  useEffect(() => {
    if (prevStep.current !== step && modelRef.current) {
      prevStep.current = step;
      modelRef.current.scale.set(0.9, 0.9, 0.9);
      
      const scaleUp = () => {
        if (modelRef.current) {
          modelRef.current.scale.x += 0.01;
          modelRef.current.scale.y += 0.01;
          modelRef.current.scale.z += 0.01;
          
          if (modelRef.current.scale.x < 1) {
            requestAnimationFrame(scaleUp);
          }
        }
      };
      
      scaleUp();
    }
  }, [step]);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
      const targetRotation = rotation[1] + (step * Math.PI / 12);
      modelRef.current.rotation.y += (targetRotation - modelRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    />
  );
};

export default Model;