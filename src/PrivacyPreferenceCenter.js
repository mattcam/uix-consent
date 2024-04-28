import CookieInfo from "./CookieInfo";
import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function PrivacyPreferenceCenter() {

    const [displayInfo, setDisplayInfo] = useState(false);
    const [displayAbout, setDisplayAbout] = useState(false);

    const Info = () => {
        return <Dialog onClose={() => setDisplayInfo(false)} open={displayInfo}>
            <DialogTitle>Privacy Preference Center</DialogTitle>
            <CookieInfo/>
            <Button onClick={() => setDisplayInfo(false)}>Close</Button>
        </Dialog>
    }

    const About = () => {
        return <Dialog onClose={() => setDisplayAbout(false)} open={displayAbout}>
            <DialogTitle>About Tracardi</DialogTitle>
            <div style={{
                padding: "0px 40px 20px 40px", "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
                "fontSize": 15,
            }}>
                <p>Tracardi is an open-source Customer Data Platform (CDP) designed to enhance customer engagement and the overall consumer experience. It is not strictly a marketing automation system, though it includes some elements of marketing automation. Tracardi is particularly useful for businesses that handle various forms of customer interaction, such as through sales, service delivery, or e-commerce platforms.</p>

                <p>The platform is designed with a low-code/no-code approach, making it accessible even to those without extensive technical expertise. Tracardi can integrate seamlessly with numerous systems and supports the collection of data from multiple sources including mobile apps, web services, and even physical customer interactions.</p>

                <p>Key features of Tracardi include:</p>

                <ul>
                    <li>Event-based actions which can trigger automated marketing communications like SMS or emails.</li>
                    <li>Integration capabilities with social media, SaaS products, and AI technologies to enhance sales and customer interaction.</li>
                    <li>A flexible architecture that allows the collection of customer data from various channels to create a unified customer profile.</li>
                </ul>

                <p>For more detailed information about its features and setup, you can visit Tracardi's documentation and resources on their official website and GitHub repository.</p>

            </div>
            <Button onClick={() => setDisplayAbout(false)}>Close</Button>
        </Dialog>
    }

    return <>
        <div style={{width: 150}}>
            <Button onClick={() => setDisplayInfo(true)} variant="outlined" size="small" style={{marginRight: 5}}>Info</Button>
            <Button onClick={() => setDisplayAbout(true)} variant="outlined" size="small">About</Button></div>
        <Info/>
        <About/>
    </>
}