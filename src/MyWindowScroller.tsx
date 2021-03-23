import React from "react";
import {WindowScroller} from 'react-virtualized';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import './index.css';

const MyWindowScroller = () =>{
    const logFile = require('./resources/MOCK_DATA.json');
    document.body.style.overflow = "hidden";

    return(
        <WindowScroller>
            {({ height }) => (
                <AutoSizer disableHeight>
                    {({width}) => (
                        <List
                            width={width}
                            height={height}
                            itemCount={logFile.length}
                            itemSize={128}
                            // overscanCount={10}
                        >
                            {({index,style}) => (
                                <div style={style} className="post">
                                    <h3>{`${logFile[index].id}:-${logFile[index].first_name}-${logFile[index].last_name}`}</h3>
                                    <p>{logFile[index].timestamp}</p>
                                </div>
                            )}
                        </List>
                    )}
                </AutoSizer>
            )}
        </WindowScroller>
    );
}

export default MyWindowScroller;