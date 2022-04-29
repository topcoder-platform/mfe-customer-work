import classNames from 'classnames'
import { Dispatch, FC, MutableRefObject, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useClickOutside, UseHoverElementValue, useOnHoverElement } from '../functions'

import styles from './Tooltip.module.scss'

interface TooltipProps {
    content?: string
    positionX?: 'start'|'middle'|'end'
    positionY?: 'start'|'middle'|'end'
    trigger: ReactNode
    triggerOn?: 'click'|'hover'
}

interface ClickHandlersValue {
    onClick: (ev: any) => void
}

function useClickHandlers(trigger: MutableRefObject<any>, toggle: (ev: any) => void): ClickHandlersValue {
    useClickOutside(trigger.current, () => toggle(false))

    return {
        onClick: toggle,
    }
}

const Tooltip: FC<TooltipProps> = ({
    content,
    trigger,
    triggerOn = 'click',
    positionX = 'middle',
    positionY = 'end',
}: TooltipProps) => {
    // if we didn't get a tooltip, just return an empty fragment
    if (!content) {
        return <></>
    }

    const triggerRef: MutableRefObject<any> = useRef(undefined)
    const [tooltipOpen, setTooltipOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    const toggleOpen: (t?: boolean) => void = useCallback((t?: boolean) => {
      setTooltipOpen(d => typeof t === 'boolean' ? !!t : !d)
    }, [])

    const revealHandlers: ClickHandlersValue|UseHoverElementValue = triggerOn === 'click'
        ? useClickHandlers(triggerRef, toggleOpen)
        : useOnHoverElement(triggerRef.current, toggleOpen)

    return (
        <div className={styles.tooltip}>
            <div
                className={classNames('tooltip-icon', styles['tooltip-icon'])}
                ref={triggerRef}
                {...revealHandlers}
            >
                {trigger}
            </div>
            {tooltipOpen && (
                <div className={classNames(styles['tooltip-open'], `posy-${positionY}`, `posx-${positionX}`)}>
                    <div className={styles['tooltip-arrow']}>
                        {/* TODO: convert this to a .svg file and import from /svgs */}
                        <svg width='37' height='9' viewBox='0 0 37 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path fill-rule='evenodd' clip-rule='evenodd' d='M13.875 3.53787L15.8535 1.25575C17.2816 -0.391461 19.6241 -0.422124 21.0857 1.18727C21.1062 1.20983 21.1265 1.23266 21.1465 1.25575L23.125 3.53787C26.0826 6.94936 29.2109 9 34.368 9H37L0 9H2.63195C7.78907 9 10.9174 6.94936 13.875 3.53787Z' fill='#2A2A2A'/>
                            <path fill-rule='evenodd' clip-rule='evenodd' d='M13.875 3.53787L15.8535 1.25575C17.2816 -0.391461 19.6241 -0.422124 21.0857 1.18727C21.1062 1.20983 21.1265 1.23266 21.1465 1.25575L23.125 3.53787C26.0826 6.94936 29.2109 9 34.368 9H37L0 9H2.63195C7.78907 9 10.9174 6.94936 13.875 3.53787Z' fill='black' fill-opacity='0.2'/>
                        </svg>
                    </div>
                    <div className={styles['tooltip-content']}>
                        {content}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Tooltip
