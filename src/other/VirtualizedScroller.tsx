import React from 'react';
import {WindowScroller,List} from 'react-virtualized';
import AutoSizer from "react-virtualized-auto-sizer";

interface LogType {
    index: number,
    key: string,
    style: object
}

const VirtualizedScroller = () =>{
    const logFile = require('./resources/MOCK_DATA.json');

    const renderRow = (logType: LogType) => (
        <div key={logType.key} style={logType.style} className="post">
            <h3>{`${logFile[logType.index].id}:-${logFile[logType.index].first_name}-${logFile[logType.index].last_name}`}</h3>
            <p>{logFile[logType.index].timestamp}</p>
        </div>
    )

    return (
        <WindowScroller>
            {({ height, scrollTop }) => (
                <AutoSizer disableHeight>
                    {({width}) => (
                        <List
                            autoHeight={true}
                            width={width}
                            height={height}
                            overscanRowCount={10}
                            rowRenderer={renderRow}
                            rowCount={logFile.length}
                            rowHeight={120}
                            scrollTop={scrollTop}
                        />
                    )}
                </AutoSizer>
            )}
        </WindowScroller>
    );
}

export default VirtualizedScroller;