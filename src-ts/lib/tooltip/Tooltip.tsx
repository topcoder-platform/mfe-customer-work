import classNames from 'classnames'
import {
    Dispatch,
    FC,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    useCallback,
    useRef,
    useState,
} from 'react'

import { useClickOutside, UseHoverElementValue, useOnHoverElement } from '../functions'
import { TooltipArrowIcon } from '../svgs'

import styles from './Tooltip.module.scss'

interface TooltipProps {
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

    const toggleOpen: (toggleValue?: boolean) => void = useCallback((toggleValue?: boolean) => {
        setTooltipOpen(currentTooltipOpen => typeof toggleValue === 'boolean' ? toggleValue : !currentTooltipOpen)
    }, [])

    const revealHandlers: ClickHandlersValue | UseHoverElementValue = triggerOn === 'click'
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
                        <TooltipArrowIcon />
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
