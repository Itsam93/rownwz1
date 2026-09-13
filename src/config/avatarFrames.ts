export interface AvatarPhotoConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  anchor?: "center";
}

export interface AvatarCopiesConfig {
  x: number;
  y: number;

  fontSize: number;
  labelFontSize: number;
  labelGap: number;

  color?: string;
  labelColor?: string;

  fontFamily?: string;
  labelFontFamily?: string;

  fontWeight?: number | string;
  labelFontWeight?: number | string;

  align?: CanvasTextAlign;
  anchor?: "text-center";
}

export interface AvatarFrameConfig {
  canvasSize: number;

  photo: AvatarPhotoConfig;

  copiesSponsored: AvatarCopiesConfig;
}

export const avatarFrames = {
  rown: {
    canvasSize: 1536,

    photo: {
      x: 500,
      y: 520,
      width: 540,
      height: 670,
      anchor: "center",
    },

    copiesSponsored: {
      x: 1330,
      y: 750,

      fontSize: 75,
      labelFontSize: 42,
      labelGap: 10,

      color: "#FFFFFF",
      labelColor: "#FFFFFF",

      fontFamily:
        '"Arial Black", Arial, sans-serif',
      labelFontFamily:
        "Arial, sans-serif",

      fontWeight: 900,
      labelFontWeight: 700,

      align: "center",
      anchor: "text-center",
    },
  },
} satisfies Record<
  string,
  AvatarFrameConfig
>;
