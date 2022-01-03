import React from "react";

export default function CookieInfo() {
    return <div style={{padding: 15, fontSize: 14, fontFamily: "apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    }}>
        <p style={{fontSize: "inherit", fontFamily: "inherit"}}>When you visit any web site, it may store or retrieve information on your browser, mostly in the form of
            cookies. This information might be about you, your preferences or your device and is mostly used to make the
            site work as you expect it to. The information does not usually directly identify you, but it can give you a
            more personalized web experience.</p>

        <p style={{fontSize: "inherit", fontFamily: "inherit"}}>Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the
            different category headings to find out more and change our default settings. However, blocking some types
            of cookies may impact your experience of the site and the services we are able to offer.
        </p>
        <p style={{fontSize: "inherit", fontFamily: "inherit"}}>
            In some cases, data obtained from cookies is shared with third parties and may be considered a “sale of
            personal information” under the California Consumer Privacy Act (CCPA). You can exercise your right to
            opt-out of that sharing at any time by disabling cookies.
        </p>
    </div>
}