import { Dispatch, FC, SetStateAction, useState } from 'react'

import { ComponentVisible, useHideClickOutside } from '../functions'
import { IconOutline } from '../svgs'

import styles from './Tooltip.module.scss'

interface TooltipProps {
    tooltip?: string
}

const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {

    const [tooltipOpen, setTooltipOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    // if we didn't get a tooltip, just return an empty fragment
    if (!props.tooltip) {
        return <></>
    }

    const {
        isComponentVisible,
        ref,
        setIsComponentVisible,
    }: ComponentVisible = useHideClickOutside(false)

    function toggleOpen(): void {
        const toggleTo: boolean = !tooltipOpen
        setTooltipOpen(toggleTo)
        setIsComponentVisible(toggleTo)
    }

    if (!isComponentVisible && tooltipOpen) {
        setTooltipOpen(isComponentVisible)
    }

    return (
        <>
            <div
                className={styles.tooltip}
                onClick={toggleOpen}
            >
                <IconOutline.InformationCircleIcon />
            </div>
            {tooltipOpen && (
                <div
                    className={styles['tooltip-open']}
                    ref={ref}
                >
                    {props.tooltip}
                </div>
            )}
        </>
    )
}

export default Tooltip
