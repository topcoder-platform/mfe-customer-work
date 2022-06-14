import classNames from 'classnames'
import { FC, useMemo } from 'react'

import { IconOutline, IconSolid } from '../../../../lib'

import styles from './StatusIcon.module.scss'

interface StatusIconProps {
    completed?: boolean
    partial?: boolean
}

const StatusIcon: FC<StatusIconProps> = (props: StatusIconProps) => {
    const classes: string = classNames(
        styles['checkmark'],
        'status-checkbox',
        props.completed && 'completed',
        props.partial && 'partial',
    )

    const icon = useMemo(() => (
        props.completed
            ? <IconSolid.CheckCircleIcon />
            : props.partial
                ? <IconOutline.ClockIcon />
                : <IconOutline.DotsCircleHorizontalIcon />
    ), [props.completed, props.partial]);
    
    return (
        <div className={classes}>
            {icon}
        </div>
    )
}

export default StatusIcon
