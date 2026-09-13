import rownFrame from "../assets/frame.png";

export interface AvatarAsset {
  frame: string;
}

export interface AvatarAssets {
  rown: AvatarAsset;
}

export const avatarAssets: AvatarAssets = {
  rown: {
    frame: rownFrame,
  },
};
