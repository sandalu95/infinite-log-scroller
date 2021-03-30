import ScrollerComponent from "./scroller_library/ScrollerComponent";
import React, {useEffect, useState} from "react";
import {service} from "./services/api.service";

interface logType {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    timestamp: string,
    ip_address: string
}

const loadTypes = {
    prev: "PREV",
    next: "NEXT"
}

const ScrollerUser = () => {
    const startDateTime = "2020-03-19T20:11:02Z";
    const endDateTime = "2020-05-16T21:56:45Z";
    const limit = 15;

    const [current, setCurrent] = useState<logType[]>([]);
    const [prevStart, setPrevStart] = useState<string>("");
    const [prevEnd, setPrevEnd] = useState<string>("");
    const [hasMore, setHasMore] = useState(true);
    const [hasPrev, setHasPrev] = useState(false);

    const apiCall = (startDateTime: string, endDateTime: string, limit: number, loadType: string) => {
        service(startDateTime, endDateTime, limit, loadType)
            .then((data: any) => {
                if (data.length > 0) {
                    setCurrent(data);
                    loadType === loadTypes.next ? setHasPrev(true) : setHasMore(true);
                } else {
                    loadType === loadTypes.next ? setHasMore(false) : setHasPrev(false);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        apiCall(startDateTime, endDateTime, limit, loadTypes.next)
    }, []);

    useEffect(() => {
        if (current.length > 0) {
            setPrevEnd(current[current.length - 1].timestamp);
            setPrevStart(current[0].timestamp);
        }
    }, [current]);

    const loadData = (loadType: string) => {
        loadType === loadTypes.next ? apiCall(prevEnd, endDateTime, limit, loadTypes.next) : apiCall(startDateTime, prevStart, limit, loadTypes.prev)
        document.documentElement.scrollTop = 50;
    }

    return (
        <ScrollerComponent
            loadData={loadData}
            hasMore={hasMore}
            hasPrev={hasPrev}
        >

            <div style={{marginTop: "30px"}}>
                {current && current.map((row: logType) => (
                    <div key={row.id} style={{border: "1px solid black", paddingLeft: "10px"}}>
                        <h3>{`${row.id}:-${row.first_name}-${row.last_name}`}</h3>
                        <p>{row.timestamp}</p>
                    </div>
                ))
                }
            </div>

        </ScrollerComponent>
    );
}

export default ScrollerUser;