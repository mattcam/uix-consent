import React, {useEffect, useRef, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import PrivacyPreferenceCenter from "./PrivacyPreferenceCenter";
import Progress from "./Progress";
import "regenerator-runtime/runtime";

export default function ConsentDetails({endpoint, onConfirmChoices}) {

    const [consents, setConsents] = useState([]);
    const [loading, setLoading] = useState(false);

    const values = useRef({})
    const url = endpoint + '/consents/type/0/100';

    const handleResponse = async (response) => {
        response = await response
        if(response?.result) {
            setConsents(response?.result)
            values.current = {}
            for(let consent in response?.result) {
                consent = response?.result[consent]
                const c = {[consent.id]: consent.default_value==='grant'}
                values.current = {...values.current, ...c}
            }
        }
    }

    const handleConfirmChoices = () => {
        if(onConfirmChoices) {
            onConfirmChoices(values.current)
        }
    }

    const setSelectedConsents = (consent) => {
        values.current = {...values.current, ...consent}
    }

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: 'GET'
        })
            .then(response => handleResponse(response.json()))
            .catch(e => console.error(e))
            .finally(() => {setLoading(false)});

    }, [url]);

    const Consents = () => {
        return <div style={{display: "flex", gap: 15, height: "100%"}}>
            <div style={{flex: "1 1"}}>
                <PrivacyPreferenceCenter/>
            </div>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div>
                    <Typography variant="h5" gutterBottom component="div">
                        We require the following consents
                    </Typography>
                    {consents.map((consent, idx) => {
                        return <ConsentItem key={idx} {...consent}/>
                    })}
                </div>
                <div>
                    <Button variant="contained" onClick={handleConfirmChoices}>Confirm my choice</Button>
                </div>
            </div>

            </div>
    }

    const ConsentItem = ({id, name, description, revokable, default_value}) => {
        return <FormGroup style={{width: "100%"}}>
            <FormControlLabel control={<Checkbox defaultChecked={default_value==='grant'}
                                                 value={id}
                                                 onChange={(event) => setSelectedConsents({[id]: event.target.checked})}/>}
                              label={name} />
            <FormHelperText id="my-helper-text">{description}</FormHelperText>
        </FormGroup>
    }

    return <div style={{width: "100%", height: "100%"}}>
        {loading && <Progress/>}
        {!loading && <Consents/>}
    </div>
}