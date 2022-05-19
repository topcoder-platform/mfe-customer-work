import classNames from 'classnames'
import { Dispatch, FC, MutableRefObject, ReactNode, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

import { useClickOutside, UseHoverElementValue, useOnHoverElement } from '../functions'
import { useWindowSize, WindowSize } from '../hooks/use-window-size.hook'
import { Portal } from '../portal'
import { TooltipArrowIcon } from '../svgs'

import styles from './Tooltip.module.scss'

interface TooltipProps {
    className?: string
    content?: string
    positionX?: 'start' | 'middle' | 'end'
    positionY?: 'start' | 'middle' | 'end'
    trigger: ReactNode
    triggerOn?: 'click' | 'hover'
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
    className,
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

    const portalRef: MutableRefObject<any> = useRef(undefined)
    const triggerRef: MutableRefObject<any> = useRef(undefined)
    const tooltipRef: MutableRefObject<any> = useRef(undefined)
    const [tooltipOpen, setTooltipOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
    const { width: windowWidth, height: windowHeight }: WindowSize = useWindowSize()

    const toggleOpen: (toggleValue?: boolean) => void = useCallback((toggleValue?: boolean) => {
        setTooltipOpen(currentTooltipOpen => typeof toggleValue === 'boolean' ? toggleValue : !currentTooltipOpen)
    }, [])

    const revealHandlers: ClickHandlersValue | UseHoverElementValue = triggerOn === 'click'
        ? useClickHandlers(triggerRef, toggleOpen)
        : useOnHoverElement(triggerRef.current, toggleOpen)

    useEffect(() => {

        if (!tooltipOpen || !portalRef?.current || !tooltipRef?.current) {
            return
        }

        const triggerEl: HTMLElement = triggerRef.current
        const box: DOMRect = triggerEl.getBoundingClientRect()
        const left: number = Math.max(box.left, windowWidth - (box.left + tooltipRef.current.getBoundingClientRect().width))

        Object.assign(portalRef.current.style, {
            height: `${box.width}px`,
            left: `${left}px`,
            top: `${box.top + window.scrollY}px`,
            width: `${box.width + window.scrollX}px`,
        })
    }, [
        tooltipOpen,
        windowWidth,
        windowHeight,
    ])

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
                <Portal portalRef={portalRef} className={styles['tooltip-portal']}>
                    <div className={classNames(styles['tooltip-open'], `posy-${positionY}`, `posx-${positionX}`, className)} ref={tooltipRef}>
                        <div className={styles['tooltip-arrow']}>
                            <TooltipArrowIcon />
                        </div>
                        <div className={styles['tooltip-content']}>
                            {content}
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    )
}

export default Tooltip
