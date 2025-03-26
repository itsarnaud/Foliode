import { useGLTF, useAnimations } from "@react-three/drei";

interface ModelProps {
  modelPath: string;
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
  const { scene, animations } = useGLTF(modelPath);
  useAnimations(animations, scene);
  

  return <primitive object={scene} position={[0, 2, 0]}  rotation={[0, Math.PI / -7, -0.5]}/>;
};

export default Model;