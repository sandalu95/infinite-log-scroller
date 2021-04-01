import React, {CSSProperties, ReactNode} from "react";

type Fn = (loadType: string) => any;

export interface Props {
    children: ReactNode;
    loadData: Fn;
    hasMore: boolean;
    hasPrev: boolean;
    height: number;
    style?: CSSProperties;
    endMessage?: ReactNode;
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
    const style = {
        height: props.height,
        overflowY: 'scroll',
        ...props.style
    } as CSSProperties;

    const handleScroll = (event: any) => {
        if (props.hasPrev && isElementAtTop(event.target)) {
            props.loadData(loadTypes.prev);
            event.target.scrollTop = 50;
        }

        if (props.hasMore && isElementAtBottom(event.target)) {
            props.loadData(loadTypes.next);
            event.target.scrollTop = 50;
        }
    };

    return (
        <div style={style} onScroll={handleScroll}>
            {props.children}
            {!props.hasMore && props.endMessage}
        </div>
    );
}

export default ScrollerComponent