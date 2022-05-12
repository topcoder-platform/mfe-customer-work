import classNames from 'classnames'
import { Dispatch, FC, MouseEvent, SetStateAction, SVGProps, useEffect, useState } from 'react'

import { Button } from '../button'
import { Sort } from '../pagination'
import '../styles/_palette.scss'
import { IconOutline } from '../svgs'
import { Tooltip } from '../tooltip'

import { TableCell } from './table-cell'
import { TableColumn } from './table-column.model'
import { tableGetSorted } from './table-functions'
import styles from './Table.module.scss'

interface TableProps<T> {
    readonly columns: ReadonlyArray<TableColumn<T>>
    readonly data: ReadonlyArray<T>
    readonly defaultSort: Sort
    readonly onRowClick?: (data: T) => void
}

const Table: <T extends { [propertyName: string]: any }>(props: TableProps<T>) => JSX.Element
    = <T extends { [propertyName: string]: any }>(props: TableProps<T>) => {

        const [sort, setSort]: [Sort, Dispatch<SetStateAction<Sort>>] = useState<Sort>(props.defaultSort)
        const [sortMap, setSortMap]: [{ [fieldame: string]: boolean }, Dispatch<SetStateAction<{ [fieldame: string]: boolean }>>]
            = useState<{ [fieldame: string]: boolean }>({})
        const [sortedData, setSortData]: [ReadonlyArray<T>, Dispatch<SetStateAction<ReadonlyArray<T>>>]
            = useState<ReadonlyArray<T>>(props.data)

        useEffect(() => {

            // sort the data
            setSortData(tableGetSorted(props.data, sort, props.columns))

            // create the sortmap to remember the last
            // sort direction of a column that is not
            // the currently sorted column
            const map: { [fieldame: string]: boolean } = {
                [sort.fieldName]: sort.direction === 'asc',
            }

            // A) if column X is sorted in one direction,
            // then column Y is sorted,
            // then column X is sorted again,
            // the 2nd sort of column X will toggle its sort
            // direction
            // B) all columns default to sorting ascending, so if there
            // not a last known sort for a column, set it to descending
            // so the next toggle toggles it ascending.
            props.columns
                .filter(col => !!col.propertyName && col.propertyName !== sort.fieldName)
                .forEach(col => {
                    const currentAscending: boolean | undefined = sortMap[col.propertyName as string]
                    map[col.propertyName as string] = !!currentAscending
                })
            setSortMap(map)
        },
            [
                sort,
            ])

        function toggleSort(fieldName: string): void {
            const newSort: Sort = {
                direction: sortMap[fieldName] ? 'desc' : 'asc',
                fieldName,
            }
            setSort(newSort)
        }

        function getSortButton(iconClass: string, isCurrentlySorted: boolean, propertyName?: string): JSX.Element {

            if (!propertyName) {
                return <></>
            }

            // if this isn't the currently sorted field,
            // use the disambiguated icon
            const icon: FC<SVGProps<SVGSVGElement>> = isCurrentlySorted
                ? sort.direction === 'asc' ? IconOutline.SortAscendingIcon : IconOutline.SortDescendingIcon
                : IconOutline.SwitchVerticalIcon

            return (
                <Button
                    buttonStyle='icon'
                    className={iconClass}
                    icon={icon}
                    onClick={() => toggleSort(propertyName as string)}
                    size='sm'
                />
            )
        }

        const headerRow: Array<JSX.Element> = props.columns
            .map(col => {
                const isCurrentlySorted: boolean = col.propertyName === sort.fieldName
                const colorClass: string = isCurrentlySorted ? 'black-100' : 'black-60'
                return (
                    <th className={styles.th}>
                        <div className={classNames(styles['header-container'], styles[col.type], colorClass)}>
                            {col.label}
                            {!!col.tooltip && (
                                <div className={styles.tooltip}>
                                    <Tooltip
                                        content={col.tooltip}
                                        positionX='end'
                                        positionY='end'
                                        trigger={<IconOutline.InformationCircleIcon />}
                                    />
                                </div>
                            )}
                            {getSortButton(colorClass, isCurrentlySorted, col.propertyName)}
                        </div>
                    </th>
                )
            })

        const rowCells: Array<JSX.Element> = sortedData
            .map((data, index) => {

                function onRowClick(event: MouseEvent<HTMLTableRowElement>): void {
                    event.preventDefault()
                    props.onRowClick?.(data)
                }

                // get the cells in the row
                const cells: Array<JSX.Element> = props.columns
                    .map(col => {
                        return (
                            <TableCell
                                {...col}
                                data={data}
                                index={index}
                            />
                        )
                    })

                // return the entire row
                return (
                    <tr
                        className={classNames(styles.tr, !!onRowClick ? styles.clickable : undefined)}
                        onClick={onRowClick}
                        key={index}
                    >
                        {cells}
                    </tr >
                )
            })

        return (
            /* TODO: sticky header */
            <div className={styles['table-wrap']}>
                <table className={styles.table}>
                    <tr className={styles.tr}>
                        {headerRow}
                    </tr>
                    {rowCells}
                </table>
            </div>
        )
    }

export default Table
