import classNames from 'classnames'
import { FC } from 'react'

import { IconSolid } from '../../../../lib'

import styles from './StatusCheckbox.module.scss'

interface StatusCheckboxProps {
    completed?: boolean
    partial?: boolean
}

const StatusCheckbox: FC<StatusCheckboxProps> = (props: StatusCheckboxProps) => {
    const classes = classNames(
        styles['checkmark'],
        'status-checkbox',
        props.completed && 'completed',
        props.partial && 'partial',
    )
    
    return (
        <div className={classes}>
            {props.completed && (
                <IconSolid.CheckCircleIcon />
            )}
        </div>
    )
}

export default StatusCheckbox
