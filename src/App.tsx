import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import MyInfiniteScroller from "./MyInfiniteScroller";
import VirtualizedScroller from "./VirtualizedScroller";
import MyWindowScroller from "./MyWindowScroller";
import MainPage from "./MainPage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/MyInfiniteScroller" component={MyInfiniteScroller} />
                <Route exact path="/VirtualizedScroller" component={VirtualizedScroller} />
                <Route exact path="/MyWindowScroller" component={MyWindowScroller} />
            </Switch>
        </Router>
    );
}

export default App;
