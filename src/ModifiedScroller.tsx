import React, {useEffect, useState} from "react";
import _ from "lodash";

interface logType {
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    timestamp:string,
    ip_address:string
}
export interface Props {
    startDateTime: string;
    endDateTime: string;
    limit:number;
}

const ModifiedScroller=(props:Props)=>{
    const logFile = require('./resources/MOCK_DATA.json');
    const sortedLogFile = _.sortBy(logFile, 'timestamp');
    const slicedLogFile = sortedLogFile.slice(0,150);

    const [current, setCurrent] = useState(slicedLogFile.slice(0, props.limit));
    const [prevStart, setPrevStart] = useState(null);
    const [prevEnd, setPrevEnd] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [hasPrev, setHasPrev] = useState(false);

    const getMoreData = () => {
        setTimeout(() => {
            let index = slicedLogFile.findIndex(x => x.timestamp ===prevEnd) + 1;
            setCurrent(slicedLogFile.slice(index, index + props.limit));
            document.documentElement.scrollTop = 50;
        },1000);
    }

    const getPrevData = () => {
        setTimeout(()=>{
            let index = slicedLogFile.findIndex(x => x.timestamp ===prevStart);
            setCurrent(slicedLogFile.slice(index - props.limit, index));
            document.documentElement.scrollTop = 50;
        },1000)
    }

    useEffect(() => {
        setPrevEnd(current[current.length-1].timestamp);
        setPrevStart(current[0].timestamp);
        setHasMore(!(current[current.length-1].timestamp === props.endDateTime));
        setHasPrev(current[0].timestamp !== props.startDateTime);
    }, [current, props.endDateTime, props.startDateTime]);

    window.onscroll=function() {
        if(hasMore && (window.innerHeight + window.scrollY) >= document.body.offsetHeight){
            getMoreData();
        }

        if(hasPrev && window.scrollY===0){
            getPrevData();
        }
    }

    return (
        <div style={{height: 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}>
            <div style={{marginTop:"30px"}}>
                {current && current.map((row:logType) => (
                    <div key={row.id} style={{border:"1px solid black", paddingLeft:"10px"}}>
                        <h3>{`${row.id}:-${row.first_name}-${row.last_name}`}</h3>
                        <p>{row.timestamp}</p>
                    </div>
                ))
                }
            </div>
            {!hasMore && <h3>Completed !</h3>}
        </div>
    );
}

export default ModifiedScroller