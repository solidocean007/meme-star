import { Box, Button, useTheme } from "@mui/material";
import { RootState, useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { toggleTheme } from "../Redux/themeSlice";

const ThemeButton = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = useTheme();

  return (
    <Box 
      sx={{
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      }}
    >
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => dispatch(toggleTheme())}
      >
        Switch to {isDarkMode ? "Light" : "Dark"} Theme
      </Button>
    </Box>
  );
};

export default ThemeButton;
