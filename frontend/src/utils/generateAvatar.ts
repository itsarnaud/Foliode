
import {createAvatar} from "@dicebear/core";
import {bigSmile} from "@dicebear/collection";

export const generateAvatar = (size: number, email: string) => {
  const avatar = createAvatar(bigSmile, {
    seed: email,
    size: size,
  });
  return avatar.toDataUri();
};
