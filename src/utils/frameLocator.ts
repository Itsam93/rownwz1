import type {
  AvatarFrameConfig,
  AvatarPhotoConfig,
} from "../config/avatarFrames";

export interface FrameImageState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FrameCenter {
  x: number;
  y: number;
}

export interface FrameFit extends FrameImageState {
  scale: number;
}

export interface AlignmentDelta {
  dx: number;
  dy: number;
}

export interface FrameLocator {
  canvasSize: number;
  photo: AvatarPhotoConfig;
  frameCenter: FrameCenter;

  computeFit: (
    imageWidth: number,
    imageHeight: number
  ) => FrameFit;

  getAlignmentDelta: (
    imageState: FrameImageState
  ) => AlignmentDelta;

  snapToCenter: (
    imageState: FrameImageState
  ) => FrameImageState;
}

export function createFrameLocator(
  frameConfig: AvatarFrameConfig
): FrameLocator {
  const photo = frameConfig.photo;
  const canvasSize = frameConfig.canvasSize;

  const frameCenter: FrameCenter = {
    x: photo.x + photo.width / 2,
    y: photo.y + photo.height / 2,
  };

  return {
    canvasSize,

    photo,

    frameCenter,

    computeFit(
      imageWidth: number,
      imageHeight: number
    ): FrameFit {
      if (
        !imageWidth ||
        !imageHeight ||
        imageWidth <= 0 ||
        imageHeight <= 0
      ) {
        console.error(
          "[FrameLocator] Invalid image dimensions:",
          {
            imageWidth,
            imageHeight,
          }
        );

        return {
          scale: 1,
          x: photo.x,
          y: photo.y,
          width: photo.width,
          height: photo.height,
        };
      }

      const scale = Math.max(
        photo.width / imageWidth,
        photo.height / imageHeight
      );

      const width =
        imageWidth * scale;

      const height =
        imageHeight * scale;

      const x =
        photo.x +
        (photo.width - width) / 2;

      const y =
        photo.y +
        (photo.height - height) / 2;

      return {
        scale,
        x,
        y,
        width,
        height,
      };
    },

    getAlignmentDelta(
      imageState: FrameImageState
    ): AlignmentDelta {
      const imageCenter: FrameCenter = {
        x:
          imageState.x +
          imageState.width / 2,

        y:
          imageState.y +
          imageState.height / 2,
      };

      return {
        dx:
          imageCenter.x -
          frameCenter.x,

        dy:
          imageCenter.y -
          frameCenter.y,
      };
    },

    snapToCenter(
      imageState: FrameImageState
    ): FrameImageState {
      return {
        ...imageState,

        x:
          frameCenter.x -
          imageState.width / 2,

        y:
          frameCenter.y -
          imageState.height / 2,
      };
    },
  };
}
