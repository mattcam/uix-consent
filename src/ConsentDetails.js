import React, {useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PrivacyPreferenceCenter from "./PrivacyPreferenceCenter";
import Progress from "./Progress";
import "regenerator-runtime/runtime";
import Box from "@mui/material/Box";

export default function ConsentDetails({endpoint, sourceId, sessionId, profileId, eventType, onEnd}) {

    const [consents, setConsents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({});
    const [groups, setGroups] = useState({});

    const url = endpoint + '/consents/type/enabled';

    const setSelectedConsents = (group, id, flag) => {
        setValues({...values, [id]: flag});
    }

    const handleResponse = async (response) => {
        // Fill the values from response
        response = await response
        if (response?.result) {
            setConsents(response?.result)
            let newValues = {}
            let newGroups = {}
            for (let consent in response?.result) {

                consent = response?.result[consent]
                newValues[consent.id] = (consent.default_value === 'grant')

                for (let tag in consent.tags) {
                    tag = consent.tags[tag]
                    if (!(tag in newGroups)) {
                        newGroups[tag] = []
                    }
                    newGroups[tag].push(consent.id)
                }
            }
            setValues(newValues);
            setGroups(newGroups);
        }
    }

    const handleConsents = async (consents) => {

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
        try {
            const response = await fetch(endpoint + "/track", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            console.log(response)
        } catch(e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }

    const handleConfirmChoices = async () => {
        await handleConsents(values)
        if (onEnd) {
            onEnd(values)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: 'GET'
        })
            .then(response => handleResponse(response.json()))
            .catch(e => console.error(e))
            .finally(() => {
                setLoading(false)
            });

    }, [url]);

    function groupByKey(array, key) {
        return array
            .reduce((hash, obj) => {
                if (obj[key] === undefined) return hash;
                return Object.assign(hash, {[obj[key]]: (hash[obj[key]] || []).concat(obj)})
            }, {})
    }

    function objectMap(obj, func) {
        return Object.entries(obj).map(([k, v]) => func(k, v));
    }

    function isChecked(group) {
        if (!(group in groups)) {
            return false
        }

        const vals = groups[group].map((id) => {
            return values[id]
        })

        return {
            all: vals.every(x => x === true),
            none: vals.every(x => x === false)
        }
    }

    const handleParentChange = (group, checked) => {
        if(!(group in groups)) {
            return false
        }
        let newValues = {...values}
        for(const i in groups[group]) {
            const grp = groups[group][i]
            newValues[grp] = checked
        }
        setValues(newValues)
    }

    const GroupConsents = () => {
        return <div>
            {objectMap(groupByKey(consents, "tags"),
                (group, consents) => {
                    const parentState = isChecked(group)
                    return <div key={group}>
                        <FormControlLabel
                            label={group}
                            control={
                                <Checkbox
                                    checked={parentState.all}
                                    indeterminate={!parentState.all !== parentState.none}
                                    onChange={(event) => handleParentChange(group, event.target.checked)}
                                />
                            }
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                            {
                                consents.map((consent, idx) => {
                                    return <ConsentItem
                                        key={idx}
                                        group={group}
                                        id={consent.id}
                                        name={consent.name}
                                        description={consent.description}
                                        checked={consent.id in values ? values[consent.id] : false}
                                    />
                                })
                            }
                        </Box>
                    </div>
                })}
        </div>
    }

    const Consents = () => {
        return <div style={{display: "flex", gap: 15, height: "100%", padding: 15, justifyContent: "space-between"}}>

            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div style={{paddingBottom: 60}}>
                    <Typography variant="h5" gutterBottom component="div">
                        Please Manage Consent Preferences
                    </Typography>
                    <GroupConsents/>
                </div>
                <div style={{position: "sticky", bottom: 0, width: "100%", padding: "10px 0", background: "rgba(255,255,255,0.95)"}}>
                    <Button variant="contained" onClick={handleConfirmChoices}>Confirm my choice</Button>
                </div>
            </div>
            <div style={{width: 24, paddingTop: 3, paddingLeft: 10}}>
                <PrivacyPreferenceCenter/>
            </div>
        </div>
    }

    const ConsentItem = ({group, id, name, description, revokable, checked}) => {
        return <FormGroup style={{width: "100%"}}>
            <FormControlLabel control={<Checkbox defaultChecked={checked}
                                                 onChange={(event) => setSelectedConsents(group, id, event.target.checked)}/>}
                              label={name}/>
            <FormHelperText id="my-helper-text">{description}</FormHelperText>
        </FormGroup>
    }

    return <div style={{width: "100%", height: "100%"}}>
        {loading && <Progress/>}
        {!loading && <Consents/>}
    </div>
}