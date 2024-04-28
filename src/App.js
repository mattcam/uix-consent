import React, {useEffect, useState} from 'react';
import Drawer from "@mui/material/Drawer";
import ConsentDetails from "./ConsentDetails";
import Question from "./Question";
import Collapse from "@mui/material/Collapse";
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
})


function App({domElement}) {

    const endpoint = domElement.getAttribute("data-endpoint") || "http://0.0.0.0:8686";
    const sourceId = domElement.getAttribute("data-source") || null;
    const sessionId = domElement.getAttribute("data-session") || null;
    const profileId = domElement.getAttribute("data-profile") || null;
    const position = domElement.getAttribute("data-position") || "bottom";
    const maxHeight = domElement.getAttribute("data-expand-height") || 400;

    const [open, setOpen] = useState(false);
    const [customize, setCustomize] = useState(false);

    const [expand, setExpand] = useState(false)

    useEffect(() => {
        setOpen(true)
    }, [])

    const handleCustomize = () => {
        setExpand(true);
        setCustomize(true);
    }

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                anchor={position}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Collapse in={expand} collapsedSize={60}>
                    <div style={{
                        fontFamily: "'IBM Plex Sans', 'Helvetica', 'Arial', sans-serif",
                        fontSize: 15,
                        height: maxHeight,
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        {!customize && <Question
                            endpoint={endpoint}
                            sourceId ={sourceId}
                            sessionId = {sessionId}
                            profileId = {profileId}
                            onCustomize={handleCustomize}
                            onEnd={() => setOpen(false)}/>}
                        {customize && <ConsentDetails
                            endpoint={endpoint}
                            sourceId ={sourceId}
                            sessionId = {sessionId}
                            profileId = {profileId}
                            onEnd={() => setOpen(false)}/>}
                    </div>
                </Collapse>
            </Drawer>
        </ThemeProvider>
    );
}

export default App;


