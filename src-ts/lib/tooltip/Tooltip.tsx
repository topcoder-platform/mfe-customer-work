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
        <div className={styles.tooltip}>
            <div className={styles['tooltip-icon']} onClick={toggleOpen}>
                <IconOutline.InformationCircleIcon />
            </div>
            {tooltipOpen && (
                <div
                    className={styles['tooltip-open']}
                    ref={ref}
                >
                    <div className={styles['tooltip-arrow']}>
                        <svg width='37' height='9' viewBox='0 0 37 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path fill-rule='evenodd' clip-rule='evenodd' d='M13.875 3.53787L15.8535 1.25575C17.2816 -0.391461 19.6241 -0.422124 21.0857 1.18727C21.1062 1.20983 21.1265 1.23266 21.1465 1.25575L23.125 3.53787C26.0826 6.94936 29.2109 9 34.368 9H37L0 9H2.63195C7.78907 9 10.9174 6.94936 13.875 3.53787Z' fill='#2A2A2A'/>
                            <path fill-rule='evenodd' clip-rule='evenodd' d='M13.875 3.53787L15.8535 1.25575C17.2816 -0.391461 19.6241 -0.422124 21.0857 1.18727C21.1062 1.20983 21.1265 1.23266 21.1465 1.25575L23.125 3.53787C26.0826 6.94936 29.2109 9 34.368 9H37L0 9H2.63195C7.78907 9 10.9174 6.94936 13.875 3.53787Z' fill='black' fill-opacity='0.2'/>
                        </svg>
                    </div>
                    <div className={styles['tooltip-content']}>
                        {props.tooltip}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Tooltip
