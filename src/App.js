import React, {useState} from 'react';
import ConsentDetails from "./ConsentDetails";
import Question from "./Question";
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Popover from '@mui/material/Popover';
import { ReactComponent as CookieIcon} from './svg/cookies-icon.svg';

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
    const [height, setHeight] = useState(372);
    const [width, setWidth] = useState(400);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenInfo(true)
        setHeight(372)
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
                >
                    <CookieIcon style={{fill: "white"}}/>
                </Fab>
            </Zoom>
            <Popover
                id='info-popover'
                open={openInfo || openCustomize}
                anchorEl={anchorEl}
                onClose={() => {setOpenInfo(false); setOpenCustomize(false)}}
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


