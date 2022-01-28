/*
*  Original by Dan Abramov: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/
import React from "react";

export default function useInterval(callback: () => void, delay: number) {
    const savedCallback = React.useRef<() => void>();
    // Remember the latest function.
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
