import ScrollerComponent from "./scroller_library/ScrollerComponent";
import React from "react";
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

const ScrollerUser = (props: Props) => {

    const apiCall = (startDateTime: string, endDateTime: string, limit: number, loadType: string) => {
        return new Promise((resolve, reject) => {
            service(startDateTime, endDateTime, limit, loadType)
                .then((data: any) => {
                    resolve(data)
                })
                .catch(err => reject(err));
        })
    }


    const getItems = (currentData: []) => {
        return (
            <div>
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
        <div style={{height:'1020px'}}>
            <ScrollerComponent
                getItems={getItems}
                scrollerHeight={1020}
                itemHeight={100}
                style={scrollerStyle}
                endMessage={<h4>You have seen everything! :)</h4>}
                apiCall={apiCall}
                indexProperty={"timestamp"}
                start={props.startDateTime}
                end={props.endDateTime}
            />
        </div>
    );
}

export default ScrollerUser;
