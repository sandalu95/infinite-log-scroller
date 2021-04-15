import ScrollerComponent from "./scroller_library/ScrollerComponent";
import React, {useRef} from "react";
import {serviceNew} from "./services/api.service";

interface logType {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    timestamp: string,
    ip_address: string
}

interface Props {
    startId: string,
    endId: string,
}

const ScrollerUserNew = (props: Props) => {

    const scrollerRef = useRef<any>(null);

    const apiCall = (startId: string, endId: string, limit: number, loadType: string) => {
        serviceNew(startId, endId, limit, loadType)
            .then((data: any) => {
                scrollerRef.current.apiCall(data, loadType);
            })
            .catch(err => console.log(err));
    }


    const getItems = (currentData: []) => {
        return (
            <div style={{height: '100px'}}>
                {currentData && currentData.map((row: logType) => (
                    <div key={row.id} style={itemStyle}>
                        <h3>{`${row.id}:-${row.first_name}-${row.last_name}`}</h3>
                        <p>{row.timestamp}</p>
                    </div>
                ))}
            </div>
        )
    }

    const scrollerStyle = {border: "1px solid black"};

    const itemStyle = {border: "1px solid grey", paddingLeft: "10px"};

    return (
        <ScrollerComponent
            ref={scrollerRef}
            getItems={getItems}
            scrollerHeight={1000}
            itemHeight={100}
            style={scrollerStyle}
            endMessage={<h4>You have seen everything! :)</h4>}
            apiCall={apiCall}
            indexProperty={"id"}
            start={props.startId}
            end={props.endId}
        />

    );
}

export default ScrollerUserNew;