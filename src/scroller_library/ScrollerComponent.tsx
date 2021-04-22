import React, {CSSProperties, ReactNode, useEffect, useState} from "react";

type Fn1 = (currentData: []) => any;

type Fn2 = (start: any, end: any, limit: number, loadType: string) => any;

export interface Props {
    getItems: Fn1;
    apiCall: Fn2;
    start: any;
    end: any;
    indexProperty: string;
    endMessage?: ReactNode;
    style?: CSSProperties;
    threshold?: number;
    scrollerHeight: number;
    itemHeight: number;
}

const loadTypes = {
    prev: "PREV",
    next: "NEXT"
}

const isElementAtTop = (target: HTMLElement) => {
    return (target.scrollTop === 0);
}

const isElementAtBottom = (target: HTMLElement) => {
    return (target.scrollTop + target.clientHeight >= target.scrollHeight);
}

const ScrollerComponent = (props: Props) => {
    const [currentData, setCurrentData] = useState<any>([]);
    const [currentStart, setCurrentStart] = useState<string>("");
    const [currentEnd, setCurrentEnd] = useState<string>("");
    const [hasMore, setHasMore] = useState(true);
    const [hasPrev, setHasPrev] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [showLoadPrev, setShowLoadPrev] = useState(false);

    const limit = parseInt(String(props.scrollerHeight / props.itemHeight), 10) + (props.threshold ? props.threshold : 5);

    const apiCall = (start: string, end: string, limit: number, loadType: string) => {
        props.apiCall(start, end, limit, loadType)
            .then((data: any) => {
                if (data.length > 0) {
                    setCurrentData(data);
                    loadType === loadTypes.next ? setHasPrev(true) : setHasMore(true);
                    setShowLoadPrev(false);
                    setShowLoadMore(false);
                } else {
                    loadType === loadTypes.next ? setHasMore(false) : setHasPrev(false);
                }
            })
            .catch(((err: any) => console.log(err)));
    }


    useEffect(() => {
        apiCall(props.start, props.end, limit, loadTypes.next)
    }, []);

    useEffect(() => {
        if (currentData.length > 0) {
            setCurrentEnd(currentData[currentData.length - 1][props.indexProperty]);
            setCurrentStart(currentData[0][props.indexProperty]);
        }
    }, [currentData]);

    const loadData = (loadType: string) => {
        loadType === loadTypes.next ? apiCall(currentEnd, props.end, limit, loadTypes.next) : apiCall(props.start, currentStart, limit, loadTypes.prev)
    }

    const style = {
        height: props.scrollerHeight,
        overflowY: 'scroll',
        ...props.style
    } as CSSProperties;

    const handleScroll = (event: any) => {
        if (hasPrev && isElementAtTop(event.target)) {
            setShowLoadPrev(true);
            loadData(loadTypes.prev);
            event.target.scrollTop = 50;
        }

        if (hasMore && isElementAtBottom(event.target)) {
            setShowLoadMore(true);
            loadData(loadTypes.next);
            event.target.scrollTop = 50;
        }
    };

    return (
        <div style={style} onScroll={handleScroll}>
            {hasPrev && showLoadPrev && <h3>Loading Prev...</h3>}
            <div>
                {props.getItems(currentData)}
            </div>
            {hasMore && showLoadMore && <h3>Loading More...</h3>}
            <div>{!hasMore && props.endMessage}</div>
        </div>
    );
}

export default ScrollerComponent
