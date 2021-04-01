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

interface Props {
    startDateTime: string,
    endDateTime: string,
    limit: number
}

const loadTypes = {
    prev: "PREV",
    next: "NEXT"
}

const ScrollerUser = (props: Props) => {
    const [currentData, setCurrentData] = useState<logType[]>([]);
    const [currentStartTime, setCurrentStartTime] = useState<string>("");
    const [currentEndTime, setCurrentEndTime] = useState<string>("");
    const [hasMore, setHasMore] = useState(true);
    const [hasPrev, setHasPrev] = useState(false);

    const apiCall = (startDateTime: string, endDateTime: string, limit: number, loadType: string) => {
        service(startDateTime, endDateTime, limit, loadType)
            .then((data: any) => {
                if (data.length > 0) {
                    setCurrentData(data);
                    loadType === loadTypes.next ? setHasPrev(true) : setHasMore(true);
                } else {
                    loadType === loadTypes.next ? setHasMore(false) : setHasPrev(false);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        apiCall(props.startDateTime, props.endDateTime, props.limit, loadTypes.next)
    }, []);

    useEffect(() => {
        if (currentData.length > 0) {
            setCurrentEndTime(currentData[currentData.length - 1].timestamp);
            setCurrentStartTime(currentData[0].timestamp);
        }
    }, [currentData]);

    const loadData = (loadType: string) => {
        loadType === loadTypes.next ? apiCall(currentEndTime, props.endDateTime, props.limit, loadTypes.next) : apiCall(props.startDateTime, currentStartTime, props.limit, loadTypes.prev)
    }

    const scrollerStyle = {border: "1px solid black"};

    const itemStyle = {border: "1px solid grey", paddingLeft: "10px"};

    return (
        <ScrollerComponent
            loadData={loadData}
            hasMore={hasMore}
            hasPrev={hasPrev}
            height={1290}
            style={scrollerStyle}
            endMessage={<h4>You have seen everything! :)</h4>}
        >

            <div>
                {currentData && currentData.map((row: logType) => (
                    <div key={row.id} style={itemStyle}>
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