import React, {useEffect, useState} from 'react';
import Drawer from "@mui/material/Drawer";
import ConsentDetails from "./ConsentDetails";
import Question from "./Question";
import Collapse from "@mui/material/Collapse";

function App({domElement}) {

    const endpoint = domElement.getAttribute("data-endpoint") || "http://0.0.0.0:8686";
    const eventType = domElement.getAttribute("data-event-type") || "user-consent";
    const agreeAllEventType = domElement.getAttribute("data-agree-all-event-type") || "user-consent-all";
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
            <Drawer
                anchor={position}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Collapse in={expand} collapsedSize={60}>
                    <div style={{
                        fontFamily: "apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                        height: maxHeight,
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        {!customize && <Question
                            endpoint={endpoint}
                            sourceId ={sourceId}
                            sessionId = {sessionId}
                            profileId = {profileId}
                            agreeAllEventType = {agreeAllEventType}
                            onCustomize={handleCustomize}
                            onEnd={() => setOpen(false)}/>}
                        {customize && <ConsentDetails
                            endpoint={endpoint}
                            sourceId ={sourceId}
                            sessionId = {sessionId}
                            profileId = {profileId}
                            eventType = {eventType}
                            onEnd={() => setOpen(false)}/>}
                    </div>
                </Collapse>
            </Drawer>
    );
}

export default App;


