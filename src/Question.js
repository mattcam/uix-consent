import {Button} from "@mui/material";
import React from "react";

export default function Question({onCustomize, onAgree}) {
    return <>
        <p>By clicking “Allow All”, you agree to the storing of cookies on your device to enhance site
            navigation, analyze site usage, and assist in our marketing efforts.</p>
        <div style={{display: "flex", flexWrap: "nowrap"}}>
            <Button variant="contained" style={{marginRight:10, marginBottom: 2}} onClick={onAgree}>Agree</Button>
            <Button variant="outlined" onClick={onCustomize}>Customize</Button>
        </div>
    </>
}
