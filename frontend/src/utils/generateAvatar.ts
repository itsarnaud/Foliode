
import {createAvatar} from "@dicebear/core";
import {bigSmile} from "@dicebear/collection";

export const generateAvatar = (size: number, email: string) => {
  const avatar = createAvatar(bigSmile, {
    seed: email,
    size: size,
    backgroundColor: ["b6e3f4", "c0aede", "ffdfbf"],
    skinColor: ["8c5a2b","643d19","a47539", "c99c62", "e2ba87", "efcc9f", "f5d7b1", "ffe4c0"],
    hair: ["bangs","braids","halfShavedHead", "froBun", "wavyBob", "mohawk", "curlyShortHair", "bowlCutHair", "shortHair"]
  });
  return avatar.toDataUri();
};
