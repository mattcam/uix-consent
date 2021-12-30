import React from "react";
import Typography from "@mui/material/Typography";

export default function CookieInfo() {
    return <Typography variant="body2" style={{padding: 15}}>
        <p>When you visit any web site, it may store or retrieve information on your browser, mostly in the form of
            cookies. This information might be about you, your preferences or your device and is mostly used to make the
            site work as you expect it to. The information does not usually directly identify you, but it can give you a
            more personalized web experience.</p>

        <p>Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the
            different category headings to find out more and change our default settings. However, blocking some types
            of cookies may impact your experience of the site and the services we are able to offer.
        </p>
        <p>
            In some cases, data obtained from cookies is shared with third parties and may be considered a “sale of
            personal information” under the California Consumer Privacy Act (CCPA). You can exercise your right to
            opt-out of that sharing at any time by disabling cookies.
        </p>
    </Typography>
}