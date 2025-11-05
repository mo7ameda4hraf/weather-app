import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material";
import CardComponant from "./card.jsx";
import "./i18n";

const theme = createTheme({
    typography: {
        fontFamily: ["IBM"],
    },
});

function App() {
    return ( <
        div className = "App" >
        <
        ThemeProvider theme = { theme } >
        <
        CardComponant / >
        <
        /ThemeProvider>{" "} <
        /div>
    );
}

export default App;