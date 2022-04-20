import classNames from 'classnames'

import { textFormatDateLocaleShortString, textFormatMoneyLocaleString } from '../../functions'
import { TableCellType } from '../table-cell.type'

import styles from './TableCell.module.scss'

interface TableCellProps<T> {
    readonly data: T
    readonly index: number
    readonly propertyName: string
    readonly renderer?: (data: T) => JSX.Element
    readonly type: TableCellType
}

const TableCell: <T extends { [propertyName: string]: any }>(props: TableCellProps<T>) => JSX.Element
    = <T extends { [propertyName: string]: any }>(props: TableCellProps<T>) => {

        let data: string | JSX.Element | undefined
        switch (props.type) {
            case 'date':
                data = textFormatDateLocaleShortString(props.data[props.propertyName] as Date)
                break

            case 'element':
                data = props.renderer?.(props.data)
                break

            case 'money':
                data = textFormatMoneyLocaleString(props.data[props.propertyName])
                break

            default:
                data = props.data[props.propertyName] as string
                break
        }

        return (
            <td
                className={classNames(styles.td, styles[props.type])}
                key={`${props.index}-${props.propertyName}`}
            >
                {data}
            </td>
        )
    }

export default TableCell
