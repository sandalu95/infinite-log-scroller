import React, {ReactNode} from "react";

type Fn = (loadType: string) => any;

export interface Props {
    children: ReactNode;
    loadData: Fn;
    hasMore: boolean;
    hasPrev: boolean;
}

const loadTypes = {
    prev: "PREV",
    next: "NEXT"
}

const ScrollerComponent = (props: Props) => {
    window.onscroll = function () {
        if (props.hasMore && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            props.loadData(loadTypes.next);
        }

        if (props.hasPrev && window.scrollY === 0) {
            props.loadData(loadTypes.prev);
        }
    }

    return (
        <div style={{height: 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}>
            {props.children}
            {!props.hasMore && <h3>Completed !</h3>}
        </div>
    );
}

export default ScrollerComponent