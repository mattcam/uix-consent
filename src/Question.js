import Button from "@mui/material/Button";
import React, {useState} from "react";
import Progress from "./Progress";

export default function Question({endpoint, sourceId, sessionId, profileId, agreeAllEventType, onCustomize, onEnd}) {

    const [loading, setLoading] = useState(false)

    const handleAgreeAllConsents = async () => {
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
                {type: agreeAllEventType, properties: {}}
            ]
        }

        setLoading(true)
        try {
            const response = await fetch(endpoint + "/track", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            console.log(response)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }

    const handleAgree = async () => {
        await handleAgreeAllConsents()
        if (onEnd) {
            onEnd()
        }
    }

    const Ask = () => <>
        <p style={{fontSize: 14, margin: "0 10px 0 0"}}>By clicking “Agree”, you agree to this site Privacy Policy & Use
            Terms.</p>
        <div style={{display: "flex", flexWrap: "nowrap"}}>
            <Button variant="contained" style={{marginRight: 10, marginBottom: 2}} onClick={handleAgree}>Agree</Button>
            <Button variant="outlined" onClick={onCustomize}>Customize</Button>
        </div>
    </>

    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: 60,
        padding: "0 10px"
    }}>
        {loading && <Progress/>}
        {!loading && <Ask/>}
    </div>
}
