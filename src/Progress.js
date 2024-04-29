import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export default function Progress() {
    return <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", padding: 12}}><CircularProgress size={30}/></div>
}