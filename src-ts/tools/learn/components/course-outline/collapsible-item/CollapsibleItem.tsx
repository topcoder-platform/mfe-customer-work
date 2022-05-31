import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconSolid } from '../../../../../lib'

import { StatusCheckbox } from '../../status-checkbox'

import styles from './CollapsibleItem.module.scss'

interface CollapsibleItemProps {
    title: string
    items: {title: string; completed?: boolean}[]
    id?: (item: any) => string
    active?: string;
    path?: (item: any) => string;
}

const CollapsibleItem: FC<CollapsibleItemProps> = (props: CollapsibleItemProps) => {
    const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const toggle = useCallback(() => {
      setIsOpen(open => !open)
    }, []);
    
    const completed = props.items.every(it => it.completed)
    const partial = props.items.some(it => it.completed)

    const listItem = (item: any) => (
        <>
            <span className={styles['item-icon']}>
                {item.completed && (
                    <IconSolid.CheckCircleIcon />
                )}
            </span>
            <span>
                {item.title}
            </span>
        </>
    )

    return (
        <div className={classNames(styles['wrap'], isOpen ? 'open' : 'collapsed')}>
            <div className={styles['title-row']} onClick={toggle}>
                <StatusCheckbox completed={completed} partial={partial} />
                <span className={styles['title']}>
                    {props.title}
                </span>
                <span className={styles['chevron']}>
                    <IconSolid.ChevronUpIcon />
                </span>
            </div>

            {isOpen && (
                <ul className={styles['list']}>
                    {props.items.map(it => (
                        <li key={props.id?.(it) ?? it.title} className={classNames(styles['item-wrap'], props.id?.(it) === props.active && 'active')}>
                            {props.path ? (
                                <Link className={styles['item-wrap']} to={props.path(it)}>{listItem(it)}</Link>
                            ) : (listItem(it))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CollapsibleItem
