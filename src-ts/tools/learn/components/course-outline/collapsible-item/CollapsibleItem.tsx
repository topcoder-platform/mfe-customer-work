import classNames from 'classnames'
import { Dispatch, FC, ReactNode, SetStateAction, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { IconSolid, LearnMyCertificationProgress, LearnMyModuleProgress } from '../../../../../lib'
import { StatusCheckbox } from '../../status-checkbox'

import styles from './CollapsibleItem.module.scss'

interface CollapsibleListItem {
    dashedName: string
    title: string
}

interface CollapsibleItemProps {
    active?: string
    id: string
    itemId?: (item: any) => string
    items: Array<CollapsibleListItem>
    path?: (item: any) => string
    progress?: LearnMyCertificationProgress['modules']
    title: string
}

const CollapsibleItem: FC<CollapsibleItemProps> = (props: CollapsibleItemProps) => {
    const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    const toggle: () => void = useCallback(() => {
        setIsOpen(open => !open)
    }, [])

    const progress: LearnMyModuleProgress|undefined = useMemo(() => {
        return props.progress?.find(m => m.module === props.id)
    }, [props.progress, props.id])

    const isCompleted: boolean = useMemo(() => {
        return !!progress && progress.lessonCount === progress?.completedLessons.length
    }, [progress])

    const isPartial: boolean = useMemo(() => {
        return !!progress && !!progress.completedLessons.length
    }, [progress])

    const isItemCompleted: (key: string) => boolean = (key: string) => (
        !!progress?.completedLessons.find(l => l.dashedName === key)
    )

    const listItem: (item: any) => ReactNode = (item: any) => (
        <>
            <span className={styles['item-icon']}>
                {isItemCompleted(item.dashedName) && (
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
                <StatusCheckbox completed={isCompleted} partial={isPartial} />
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
                        <li key={props.itemId?.(it) ?? it.title} className={classNames(styles['item-wrap'], props.itemId?.(it) === props.active && 'active')}>
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
