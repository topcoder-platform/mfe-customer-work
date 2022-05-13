import { Sort } from '../../pagination'
import { TableColumn } from '../table-column.model'

export function getSorted<T extends { [propertyName: string]: any }>(
    data: ReadonlyArray<T>,
    sort: Sort,
    cols: ReadonlyArray<TableColumn<T>>
): ReadonlyArray<T> {

    // get the sort column
    const sortColumn: TableColumn<T> | undefined = cols.find(col => col.propertyName === sort.fieldName)

    const sortedData: Array<T> = [...data]

    // this should never happen, but
    // if we didn't find a column, don't sort
    if (!sortColumn) {
        return sortedData
    }

    function sortNumbers(a: number, b: number, direction: 'asc' | 'desc'): number {
        return direction === 'asc' ? a - b : b - a
    }

    if (sortColumn.type === 'money') {
        return sortedData
            .sort((a: T, b: T) => sortNumbers(+a[sort.fieldName], +b[sort.fieldName], sort.direction))
    }

    if (sortColumn.type === 'date') {
        return sortedData
            .sort((a: T, b: T) => sortNumbers(
                (a[sort.fieldName] as Date).getTime(),
                (b[sort.fieldName] as Date).getTime(),
                sort.direction
            ))
    }

    return sortedData
        .sort((a: T, b: T) => {
            const aField: string = a[sort.fieldName]
            const bField: string = b[sort.fieldName]
            return sort.direction === 'asc'
                ? aField.localeCompare(bField)
                : bField.localeCompare(aField)
        })
}
