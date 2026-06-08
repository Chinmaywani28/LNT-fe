import React from "react";
import { Box, IconButton } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RefreshIcon from "@mui/icons-material/Refresh";

const ImageBox = ({ image }) => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "500px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        position: "relative",
      }}
    >
      <TransformWrapper minScale={1} maxScale={3} wheel={{ step: 0.1 }}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={image}
                alt="image_floor"
                style={{
                  width: "100%",
                  height: "500px",
                  display: "block",
                  margin: "auto",
                  objectFit: "contain",
                  justifyContent: "center",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </TransformComponent>
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <IconButton
                onClick={() => zoomIn()}
                sx={{
                  fontSize: "24px",
                  padding: "5px",
                }}
              >
                <ZoomInIcon />
              </IconButton>
              <IconButton
                onClick={() => zoomOut()}
                sx={{
                  fontSize: "24px",
                  padding: "5px",
                }}
              >
                <ZoomOutIcon />
              </IconButton>
              <IconButton
                onClick={() => resetTransform()}
                sx={{
                  fontSize: "24px",
                  padding: "5px",
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </>
        )}
      </TransformWrapper>
    </Box>
  );
};

export default ImageBox;