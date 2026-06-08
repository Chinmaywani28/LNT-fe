import { Box } from "@mui/material";
import { styled } from "@mui/system";

const HorizontalScrollableBox = styled(Box)({
    position : 'relative',
    width: "100%",
    padding : '8px',
    overflowX: "auto",
    overflowY: "hidden", 
    whiteSpace: "nowrap", 
    "&::-webkit-scrollbar": {
      height: "4px", 
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
});

export default HorizontalScrollableBox;
