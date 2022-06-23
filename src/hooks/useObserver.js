import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoading, func) => {
    const observer = useRef();

    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        const callBack = function(entries, observer) {
            if(entries[0].isIntersecting && canLoad) {
              func();
            } 
        }
        // использование обсервер для динамической подгрузки страниц
        observer.current = new IntersectionObserver(callBack);
        observer.current.observe(ref.current);
      }, [isLoading])
}