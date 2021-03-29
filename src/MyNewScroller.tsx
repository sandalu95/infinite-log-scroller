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

const MyNewScroller = (props:Props) => {
    const logFile = require('./resources/MOCK_DATA.json');
    const sortedLogFile = _.sortBy(logFile, 'timestamp');
    const slicedLogFile = sortedLogFile.slice(0,150);

    //API Call : Request logs within initial start and end time given a limit of viewport visible count
    const [current, setCurrent] = useState(slicedLogFile.slice(0, props.limit));
    const [prevStart, setPrevStart] = useState(null);
    const [prevEnd, setPrevEnd] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [hasPrev, setHasPrev] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [showLoadPrev, setShowLoadPrev] = useState(false);

    const getMoreData = () => {
        // The actual way: Call API with prevEndTime(as start) and props.endtime given limit 10
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
        setShowLoadPrev(false);
        // ToDo: Loading more hides and timeout doesn't seem to work when setShowLoadMore(false);
        if(hasMore && (window.innerHeight + window.scrollY) >= document.body.offsetHeight){
            getMoreData();
            setShowLoadMore(true);
        }

        if(hasPrev && window.scrollY===0){
            getPrevData();
            setShowLoadPrev(true);
        }
    }

    return (
        <div style={{height: 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}>
            {hasPrev && showLoadPrev && <h3>Loading Prev...</h3>}
            <div style={{marginTop:"30px"}}>
                {current && current.map((row:logType) => (
                    <div key={row.id} style={{border:"1px solid black", paddingLeft:"10px"}}>
                        <h3>{`${row.id}:-${row.first_name}-${row.last_name}`}</h3>
                        <p>{row.timestamp}</p>
                    </div>
                ))
                }
            </div>
            {hasMore && showLoadMore && <h3>Loading More...</h3>}
            {!hasMore && <h3>Completed !</h3>}
        </div>
    );

}

export default MyNewScroller;