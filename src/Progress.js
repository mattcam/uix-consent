import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export default function Progress() {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%", height: "100%"}}><CircularProgress size={30}/></div>
}