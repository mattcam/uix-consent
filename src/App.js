import React, {useEffect, useState} from 'react';
import Drawer from "@mui/material/Drawer";
import ConsentDetails from "./ConsentDetails";
import Question from "./Question";
import Progress from "./Progress";

function App({domElement}) {

    const endpoint = domElement.getAttribute("data-endpoint") || "http://0.0.0.0:8686";
    const eventType = domElement.getAttribute("data-event-type") || "user-consent";
    const sourceId = domElement.getAttribute("data-event-type") || null;
    const sessionId = domElement.getAttribute("data-event-type") || null;
    const profileId = domElement.getAttribute("data-event-type") || null;

    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(50);
    const [customize, setCustomize] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setOpen(true)
    }, [])

    const handleCustomize = () => {
        setHeight(400);
        setCustomize(true);
    }

    const handleAgree = () => {
        setOpen(false)
    }

    const handleConsents = (consents) => {

        const payload = {
            source: {
                id: sourceId
            },
            session: {
                id: sessionId
            },
            profile: {
                id: profileId
            },
            events: [
                {type: eventType, properties: consents}
            ]
        }
        setLoading(true)
        fetch(endpoint + "/track", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => console.log(response.json()))
            .catch(e => console.error(e))
            .finally(() => {setLoading(false); setOpen(false)});
    }

    return (
        <Drawer
            anchor={"bottom"}
            open={open}
            onClose={() => setOpen(false)}
        >
                <div style={{
                    fontFamily: "apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                    height: height,
                    padding: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}>
                    {loading && <Progress/>}
                    {!loading && !customize && <Question onCustomize={handleCustomize} onAgree={handleAgree}/>}
                    {!loading && customize && <ConsentDetails endpoint={endpoint} onConfirmChoices={handleConsents}/>}
                </div>
        </Drawer>
    );
}

export default App;


