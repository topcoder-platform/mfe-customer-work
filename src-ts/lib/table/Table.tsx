import classNames from 'classnames'
import { MouseEvent } from 'react'

import { Tooltip } from '../tooltip'

import { TableCell } from './table-cell'
import { TableColumn } from './table-column.model'
import styles from './Table.module.scss'

interface TableProps<T> {
    readonly columns: Array<TableColumn<T>>
    readonly data: Array<T>
    readonly onRowClick?: (data: T) => void
}

const Table: <T extends { [propertyName: string]: any }>(props: TableProps<T>) => JSX.Element
    = <T extends { [propertyName: string]: any }>(props: TableProps<T>) => {

        const headerRow: Array<JSX.Element> = props.columns
            .map(col => (
                <th className={styles.th}>
                    {col.label}
                    <Tooltip tooltip={col.tooltip} />
                </th>
            ))

        const rowCells: Array<JSX.Element> = props.data
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
            <table className={styles.table}>
                <tr className={styles.tr}>
                    {headerRow}
                </tr>
                {rowCells}
            </table>
        )
    }

export default Table
