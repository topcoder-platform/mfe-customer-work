import { MouseEvent as RMouseEvent, MouseEventHandler, MutableRefObject, useCallback, useEffect, useRef } from 'react'

/**
 * Registers an outside click event handler, and calls the callback on click outside
 * @param el Html element to register the event habdler for
 * @param cb Callback function to be called on click outside of provided element
 */
export function useClickOutside(el: HTMLElement|null, cb: (ev: MouseEvent) => void): void {
    const handleClick: (ev: MouseEvent) => void = useCallback((ev: MouseEvent) => {
        if (el && !el.contains(ev.target as unknown as Node)) {
            cb(ev)
        }
    }, [cb, el])

    useEffect(() => {
        if (!el) {
            document.removeEventListener('click', handleClick)
            return
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [el, handleClick])
}

export interface UseHoverElementValue {
    onMouseEnter: MouseEventHandler<HTMLDivElement>
    onMouseLeave: MouseEventHandler<HTMLDivElement>
}

/**
 * Registers an outside click event handler, and calls the callback on click outside
 * @param el Html element to register the event habdler for
 * @param cb Callback function to be called on click outside of provided element
 */
export function useOnHoverElement(el: HTMLElement|null, cb: (isVisible: boolean) => void): UseHoverElementValue {
    const counter: MutableRefObject<number> = useRef(0)

    const handleover: (ev: RMouseEvent<Element, MouseEvent>) => void = useCallback((ev: RMouseEvent<Element, MouseEvent>) => {
        const nextVal: number = counter.current + (ev.type === 'mouseenter' ? 1 : -1)
        if (!!nextVal !== !!counter.current) {
            cb(!!nextVal)
        }
        counter.current = nextVal
    }, [cb, el])

    return {
        onMouseEnter: handleover,
        onMouseLeave: handleover,
    }
}
