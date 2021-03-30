import React, {useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

interface logType {
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    timestamp:string,
    ip_address:string
}

const MyInfiniteScroller = () =>{
    const logFile = require('./resources/MOCK_DATA.json');

    const [count, setCount] = useState({
        prev: 0,
        next: 10
    })
    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState(logFile.slice(count.prev, count.next))
    const getMoreData = () => {
        if (current.length === logFile.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setCurrent(current.concat(logFile.slice(count.prev + 10, count.next + 10)))
        }, 1000)
        setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
    }

    return(
        <InfiniteScroll
            dataLength={current.length}
            next={getMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <div>
                {current && current.map(((row:logType) => (
                    <div key={row.id} style={{height:"120px"}}>
                        <h3>{`${row.id}:-${row.first_name}-${row.last_name}`}</h3>
                        <p>{row.timestamp}</p>
                    </div>
                )))
                }
            </div>
        </InfiniteScroll>
    );
}

export default MyInfiniteScroller;