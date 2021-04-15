import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import MyInfiniteScroller from "./other/MyInfiniteScroller";
import VirtualizedScroller from "./other/VirtualizedScroller";
import MyWindowScroller from "./other/MyWindowScroller";
import MyNewScroller from "./other/MyNewScroller";
import MainPage from "./MainPage";
import ScrollerUser from "./ScrollerUser";
import ScrollerUserNew from "./ScrollerUserNew";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/MyInfiniteScroller" component={MyInfiniteScroller} />
                <Route exact path="/VirtualizedScroller" component={VirtualizedScroller} />
                <Route exact path="/MyWindowScroller" component={MyWindowScroller} />
                <Route exact path="/MyNewScroller" render={(props)=><MyNewScroller startDateTime="2020-03-19T20:11:03Z" endDateTime="2020-05-16T21:56:45Z" limit={15}/>} />
                <Route exact path="/MyScrollerUser" render={(props)=><ScrollerUser startDateTime="2020-03-19T20:11:02Z" endDateTime="2020-05-16T21:56:45Z" limit={15}/>} />
                <Route exact path="/MyScrollerUserNew" render={(props)=><ScrollerUserNew startId="1" endId="700"/>} />
            </Switch>
        </Router>
    );
}

export default App;
