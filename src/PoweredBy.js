import React from 'react';

export default function PoweredBy() {
    return <span style={{right: 20, position: "absolute", color: "gray",display: (typeof window !== 'undefined' && window.innerWidth <= 1024) ? 'none' : 'inline'}}>Powered by <a href="http://www.tracardi.com" style={{color: "black"}}>TRACARDI</a></span>
}