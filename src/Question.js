import Button from "@mui/material/Button";
import React, {useState} from "react";
import Progress from "./Progress";
import PoweredBy from "./PoweredBy";

export default function Question({endpoint, sourceId, sessionId, profileId, onCustomize, onEnd}) {

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
            }
        }

        setLoading(true)
        try {
            const response = await fetch(endpoint + "/customer/consent?all=true", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'omit'
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

    const Ask = () => <div style={{fontFamily: "'IBM Plex Sans', 'Helvetica', 'Arial', sans-serif"}}>
        <div style={{padding: 20, fontSize: 22, fontWeight: 400, boxShadow: "0px 2px 18px -5px rgba(0,0,0,0.3)"}}>This website
            uses cookies
        </div>
        <div style={{
            padding: "0 20px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 35,
            alignItems: "flex-end",

        }}>
            <section style={{marginTop: 10}}>
                <p style={{fontSize: 15}}>We use cookies to personalise content and ads, to provide social media features and to analyse our
                    traffic. We also share information about your use of our site with our social media, advertising and
                    analytics partners who may combine it with other information that you’ve provided to them or that
                    they’ve collected from your use of their services.</p>

                <div style={{display: "flex", flexWrap: "nowrap", marginTop: 30}}>
                    <Button variant="contained" style={{marginRight: 10, marginBottom: 2}}
                            onClick={handleAgree}>Agree</Button>
                    <Button variant="outlined" onClick={onCustomize}>Customize</Button>
                </div>
            </section>

            <PoweredBy/>
        </div>
    </div>

    return <div style={{height: "100%"}}>
        {loading && <Progress/>}
        {!loading && <Ask/>}
    </div>
}
