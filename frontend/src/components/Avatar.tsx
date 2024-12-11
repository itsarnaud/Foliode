import { createAvatar } from "@dicebear/core";
import { bigSmile } from "@dicebear/collection";

interface AvatarProps {
  email: string;
  size: number;
}

export default function Avatar({ email, size }: AvatarProps) {
  const avatar = createAvatar(bigSmile, {
    seed: email,
    size: size,
    backgroundColor: ['b6e3f4', 'c0aede', 'ffdfbf'],
  });

  const dataUri = avatar.toDataUri();

  return (
    <img 
      src={dataUri} 
      width={size} 
      height={size} 
      alt="Avatar"
      style={{ borderRadius: '50%' }}
    />
  );
}