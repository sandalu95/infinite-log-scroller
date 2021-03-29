import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import MyInfiniteScroller from "./MyInfiniteScroller";
import VirtualizedScroller from "./VirtualizedScroller";
import MyWindowScroller from "./MyWindowScroller";
import MainPage from "./MainPage";
import MyNewScroller from "./MyNewScroller";
import ModifiedScroller from "./ModifiedScroller";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/MyInfiniteScroller" component={MyInfiniteScroller} />
                <Route exact path="/VirtualizedScroller" component={VirtualizedScroller} />
                <Route exact path="/MyWindowScroller" component={MyWindowScroller} />
                <Route exact path="/MyNewScroller" render={(props)=><MyNewScroller startDateTime="2020-03-19T20:11:03Z" endDateTime="2020-05-16T21:56:45Z" limit={15}/>} />
                <Route exact path="/ModifiedScroller" render={(props)=><ModifiedScroller startDateTime="2020-03-19T20:11:03Z" endDateTime="2020-05-16T21:56:45Z" limit={15}/>} />
            </Switch>
        </Router>
    );
}

export default App;
