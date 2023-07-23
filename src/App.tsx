import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";

import { router } from "./Routes";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#21bfc2b3",
      light: "#90DFE0",
      dark: "#105F61",
      contrastText: "#E5E7E8",
    },
    secondary: {
      main: "#d34c6b",
      light: "#e9a5b5",
      dark: "#692635",
      contrastText: "#E5E7E8",
    },
    background: {
      default: "#1c1e26",
      paper: "#222830",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;