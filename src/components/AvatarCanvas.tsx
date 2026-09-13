import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import type { AvatarFrameConfig } from "../config/avatarFrames";
import type { Position } from "../types/avatar";
import { createFrameLocator } from "../utils/frameLocator";

export interface AvatarCanvasProps {
  uploadedImage: string;
  frameImage: string;
  copiesSponsored: number;
  config: AvatarFrameConfig;
  zoom?: number;
  position?: Position;
  onPositionChange?: (position: Position) => void;
}

export interface AvatarCanvasHandle {
  download: () => void;
}

interface DragState {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startPositionX: number;
  startPositionY: number;
}

const DEFAULT_POSITION: Position = {
  x: 0,
  y: 0,
};

const AvatarCanvas = forwardRef<
  AvatarCanvasHandle,
  AvatarCanvasProps
>(function AvatarCanvas(
  {
    uploadedImage,
    frameImage,
    copiesSponsored,
    config,
    zoom = 1,
    position = DEFAULT_POSITION,
    onPositionChange,
  },
  ref
) {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const dragRef =
    useRef<DragState | null>(null);

  const [dragPosition, setDragPosition] =
    useState<Position>(position);

  const previousPositionRef =
    useRef<Position>(position);

  useEffect(() => {
    const previous =
      previousPositionRef.current;

    if (
      previous.x !== position.x ||
      previous.y !== position.y
    ) {
      setDragPosition(position);
      previousPositionRef.current =
        position;
    }
  }, [position]);

  const updatePosition =
    useCallback(
      (nextPosition: Position): void => {
        setDragPosition(nextPosition);
        previousPositionRef.current =
          nextPosition;
        onPositionChange?.(nextPosition);
      },
      [onPositionChange]
    );

  useImperativeHandle(
    ref,
    () => ({
      download: (): void => {
        const canvas =
          canvasRef.current;

        if (!canvas) {
          return;
        }

        const link =
          document.createElement("a");

        link.download =
          "rown-avatar.png";

        link.href =
          canvas.toDataURL("image/png");

        link.click();
      },
    }),
    []
  );

  const handlePointerDown =
    useCallback(
      (
        event: React.PointerEvent<HTMLCanvasElement>
      ): void => {
        const canvas =
          canvasRef.current;

        if (!canvas) {
          return;
        }

        event.preventDefault();

        try {
          canvas.setPointerCapture(
            event.pointerId
          );
        } catch {
          return;
        }

        dragRef.current = {
          pointerId:
            event.pointerId,

          startClientX:
            event.clientX,

          startClientY:
            event.clientY,

          startPositionX:
            dragPosition.x,

          startPositionY:
            dragPosition.y,
        };
      },
      [dragPosition]
    );

  const handlePointerMove =
    useCallback(
      (
        event: React.PointerEvent<HTMLCanvasElement>
      ): void => {
        const canvas =
          canvasRef.current;

        const drag =
          dragRef.current;

        if (
          !canvas ||
          !drag ||
          drag.pointerId !==
            event.pointerId
        ) {
          return;
        }

        event.preventDefault();

        const rect =
          canvas.getBoundingClientRect();

        if (
          rect.width <= 0 ||
          rect.height <= 0
        ) {
          return;
        }

        const scaleX =
          canvas.width /
          rect.width;

        const scaleY =
          canvas.height /
          rect.height;

        const deltaX =
          (event.clientX -
            drag.startClientX) *
          scaleX;

        const deltaY =
          (event.clientY -
            drag.startClientY) *
          scaleY;

        updatePosition({
          x:
            drag.startPositionX +
            deltaX,

          y:
            drag.startPositionY +
            deltaY,
        });
      },
      [updatePosition]
    );

  const releasePointer =
    useCallback(
      (
        event: React.PointerEvent<HTMLCanvasElement>
      ): void => {
        const canvas =
          canvasRef.current;

        const drag =
          dragRef.current;

        if (
          !canvas ||
          !drag ||
          drag.pointerId !==
            event.pointerId
        ) {
          return;
        }

        event.preventDefault();

        try {
          if (
            canvas.hasPointerCapture(
              event.pointerId
            )
          ) {
            canvas.releasePointerCapture(
              event.pointerId
            );
          }
        } catch {
          // Ignore pointer capture errors.
        }

        dragRef.current = null;
      },
      []
    );

  const handlePointerCancel =
    useCallback(
      (
        event: React.PointerEvent<HTMLCanvasElement>
      ): void => {
        const canvas =
          canvasRef.current;

        const drag =
          dragRef.current;

        if (
          !canvas ||
          !drag ||
          drag.pointerId !==
            event.pointerId
        ) {
          return;
        }

        try {
          if (
            canvas.hasPointerCapture(
              event.pointerId
            )
          ) {
            canvas.releasePointerCapture(
              event.pointerId
            );
          }
        } catch {
          // Ignore pointer capture errors.
        }

        dragRef.current = null;
      },
      []
    );

  useEffect(() => {
    if (
      !uploadedImage ||
      !frameImage ||
      !config ||
      !Number.isFinite(copiesSponsored)
    ) {
      return;
    }

    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const context =
      canvas.getContext("2d");

    if (!context) {
      return;
    }

    let cancelled = false;

    const userImage =
      new Image();

    const frame =
      new Image();

    userImage.src =
      uploadedImage;

    frame.src =
      frameImage;

    const size =
      config.canvasSize || 1536;

    const loadImage = (
      image: HTMLImageElement
    ): Promise<void> =>
      new Promise(
        (
          resolve,
          reject
        ) => {
          if (
            image.complete &&
            image.naturalWidth > 0
          ) {
            resolve();
            return;
          }

          image.onload = () =>
            resolve();

          image.onerror = () =>
            reject(
              new Error(
                "Failed to load avatar image."
              )
            );
        }
      );

    const render =
      async (): Promise<void> => {
        try {
          await Promise.all([
            loadImage(userImage),
            loadImage(frame),
          ]);

          if (cancelled) {
            return;
          }

          const copiesConfig =
            config.copiesSponsored;

          const fontFamily =
            copiesConfig.fontFamily ||
            "Arial, sans-serif";

          const labelFontFamily =
            copiesConfig.labelFontFamily ||
            "Arial, sans-serif";

          const fontWeight =
            copiesConfig.fontWeight ||
            900;

          const labelFontWeight =
            copiesConfig.labelFontWeight ||
            700;

          const fontSize =
            copiesConfig.fontSize ||
            82;

          const labelFontSize =
            copiesConfig.labelFontSize ||
            32;

          try {
            await Promise.all([
              document.fonts.load(
                `${fontWeight} ${fontSize}px ${fontFamily}`
              ),
              document.fonts.load(
                `${labelFontWeight} ${labelFontSize}px ${labelFontFamily}`
              ),
            ]);
          } catch {
            // Continue with the available fonts.
          }

          if (cancelled) {
            return;
          }

          canvas.width =
            size;

          canvas.height =
            size;

          context.clearRect(
            0,
            0,
            size,
            size
          );

          context.drawImage(
            frame,
            0,
            0,
            size,
            size
          );

          const centerX =
            config.photo.x +
            config.photo.width / 2;

          const centerY =
            config.photo.y +
            config.photo.height / 2;

          const radius =
            Math.min(
              config.photo.width,
              config.photo.height
            ) / 2;

          const locator =
            createFrameLocator(config);

          const fit =
            locator.computeFit(
              userImage.naturalWidth,
              userImage.naturalHeight
            );

          const safeZoom =
            Math.max(
              0.01,
              zoom
            );

          const scaledWidth =
            fit.width *
            safeZoom;

          const scaledHeight =
            fit.height *
            safeZoom;

          const scaledX =
            centerX -
            scaledWidth / 2 +
            dragPosition.x;

          const scaledY =
            centerY -
            scaledHeight / 2 +
            dragPosition.y;

          context.save();

          context.beginPath();

          context.arc(
            centerX,
            centerY,
            radius,
            0,
            Math.PI * 2
          );

          context.clip();

          context.drawImage(
            userImage,
            scaledX,
            scaledY,
            scaledWidth,
            scaledHeight
          );

          context.restore();

          const textX =
            copiesConfig.x;

          const textY =
            copiesConfig.y;

          const formattedCopies =
            copiesSponsored.toLocaleString(
              "en-US"
            );

          context.textAlign =
            copiesConfig.align ||
            "center";

          context.textBaseline =
            "middle";

          context.shadowColor =
            "rgba(0, 0, 0, 0.35)";

          context.shadowBlur = 6;

          context.shadowOffsetX = 0;

          context.shadowOffsetY = 2;

          context.fillStyle =
            copiesConfig.color ||
            "#FFFFFF";

          context.font =
            `${fontWeight} ${fontSize}px ${fontFamily}`;

          context.fillText(
            formattedCopies,
            textX,
            textY
          );

          context.shadowColor =
            "transparent";

          context.shadowBlur = 0;

          context.shadowOffsetX = 0;

          context.shadowOffsetY = 0;

          context.fillStyle =
            copiesConfig.labelColor ||
            copiesConfig.color ||
            "#FFFFFF";

          context.font =
            `${labelFontWeight} ${labelFontSize}px ${labelFontFamily}`;

          context.fillText(
            "Copies",
            textX,
            textY +
              fontSize * 0.72
          );
        } catch (error) {
          if (!cancelled) {
            console.error(
              "[AvatarCanvas] Failed to render avatar:",
              error
            );
          }
        }
      };

    void render();

    return () => {
      cancelled = true;
    };
  }, [
    uploadedImage,
    frameImage,
    copiesSponsored,
    config,
    zoom,
    dragPosition,
  ]);

  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
      "
    >
      <canvas
        ref={canvasRef}
        className="
          block
          w-full
          max-w-xl
          touch-none
          select-none
          rounded-xl
          border
          border-[#DCE9DF]
        "
        style={{
          touchAction: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          releasePointer
        }
        onPointerCancel={
          handlePointerCancel
        }
      />
    </div>
  );
});

AvatarCanvas.displayName =
  "AvatarCanvas";

export default AvatarCanvas;
