import React from 'react';
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div style={{margin:"100px"}}>
            <h1>Different Scroller Solutions</h1>
            <ul className="header">
                <li><Link to="/MyInfiniteScroller" style={{color:"black"}}>Infinite Scroller</Link></li>
                <li><Link to="/VirtualizedScroller" style={{color:"black"}}>Virtualized Scroller</Link></li>
                <li><Link to="/MyWindowScroller" style={{color:"black"}}>Window Scroller</Link></li>
            </ul>
        </div>
    );
}

export default MainPage;