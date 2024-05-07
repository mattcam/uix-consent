import React, {useState} from 'react';
import ConsentDetails from "./ConsentDetails";
import Question from "./Question";
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Popover from '@mui/material/Popover';

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
    // const position = domElement.getAttribute("data-position") || "bottom";
    // const maxHeight = domElement.getAttribute("data-expand-height") || 400;

    const [openInfo, setOpenInfo] = useState(false);
    const [openCustomize, setOpenCustomize] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [height, setHeight] = useState(362);
    const [width, setWidth] = useState(400);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenInfo(true)
        setHeight(362)
        setWidth(400)
    };

    const handleCustomize = () => {
        setHeight(500)
        setWidth(900)
        setOpenCustomize(true);
        setOpenInfo(false);
    }

    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        left: 16,
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <ThemeProvider theme={theme}>
            <Zoom
                in={true}
                timeout={transitionDuration}
                unmountOnExit
            >
                <Fab color="primary"
                     aria-label="consents"
                     sx={fabStyle}
                     onClick={handleClick}
                     size="medium"
                >
                    <svg version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         x="0px"
                         y="0px" viewBox="0 0 123 123" style={{enableBackground: "new 0 0 120.23 122.88", fill: "white", padding: 4}}
                         space="preserve">
                        <style type="text/css">{".st0{fill-rule:evenodd; clip-rule:evenodd;}"}</style>
                        <g><path className="st0" d="M98.18,0c3.3,0,5.98,2.68,5.98,5.98c0,3.3-2.68,5.98-5.98,5.98c-3.3,0-5.98-2.68-5.98-5.98 C92.21,2.68,94.88,0,98.18,0L98.18,0z M99.78,52.08c5.16,7.7,11.69,10.06,20.17,4.85c0.28,2.9,0.35,5.86,0.2,8.86 c-1.67,33.16-29.9,58.69-63.06,57.02C23.94,121.13-1.59,92.9,0.08,59.75C1.74,26.59,30.95,0.78,64.1,2.45 c-2.94,9.2-0.45,17.37,7.03,20.15C64.35,44.38,79.49,58.63,99.78,52.08L99.78,52.08z M30.03,47.79c4.97,0,8.99,4.03,8.99,8.99 s-4.03,8.99-8.99,8.99c-4.97,0-8.99-4.03-8.99-8.99S25.07,47.79,30.03,47.79L30.03,47.79z M58.35,59.25c2.86,0,5.18,2.32,5.18,5.18 c0,2.86-2.32,5.18-5.18,5.18c-2.86,0-5.18-2.32-5.18-5.18C53.16,61.57,55.48,59.25,58.35,59.25L58.35,59.25z M35.87,80.59 c3.49,0,6.32,2.83,6.32,6.32c0,3.49-2.83,6.32-6.32,6.32c-3.49,0-6.32-2.83-6.32-6.32C29.55,83.41,32.38,80.59,35.87,80.59 L35.87,80.59z M49.49,32.23c2.74,0,4.95,2.22,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95c-2.74,0-4.95-2.22-4.95-4.95 C44.54,34.45,46.76,32.23,49.49,32.23L49.49,32.23z M76.39,82.8c4.59,0,8.3,3.72,8.3,8.3c0,4.59-3.72,8.3-8.3,8.3 c-4.59,0-8.3-3.72-8.3-8.3C68.09,86.52,71.81,82.8,76.39,82.8L76.39,82.8z M93.87,23.1c3.08,0,5.58,2.5,5.58,5.58 c0,3.08-2.5,5.58-5.58,5.58s-5.58-2.5-5.58-5.58C88.29,25.6,90.79,23.1,93.87,23.1L93.87,23.1z"/></g></svg>
                </Fab>
            </Zoom>
            <Popover
                id='info-popover'
                open={openInfo || openCustomize}
                anchorEl={anchorEl}
                onClose={() => {
                    setOpenInfo(false);
                    setOpenCustomize(false)
                }}
                anchorOrigin={{
                    vertical: -10,
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div style={{height, width}}>
                    {openInfo && <Question
                        endpoint={endpoint}
                        sourceId={sourceId}
                        sessionId={sessionId}
                        profileId={profileId}
                        onCustomize={handleCustomize}
                        onEnd={() => setOpenInfo(false)}
                    />}
                    {openCustomize && <ConsentDetails
                        endpoint={endpoint}
                        sourceId={sourceId}
                        sessionId={sessionId}
                        profileId={profileId}
                        onEnd={() => setOpenCustomize(false)}
                    />}
                </div>

            </Popover>
        </ThemeProvider>
    );
}

export default App;


