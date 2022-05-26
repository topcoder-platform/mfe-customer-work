import { Sort } from '../../pagination'
import { TableColumn } from '../table-column.model'

export function getDefaultSort<T>(columns: ReadonlyArray<TableColumn<T>>): Sort | undefined {

    const defaultSortColumn: TableColumn<T> | undefined = columns.find(col => col.isDefaultSort)
        || columns.find(col => !!col.propertyName)

    const defaultSort: Sort | undefined = !defaultSortColumn?.propertyName
        ? undefined
        : {
            direction: defaultSortColumn.defaultSortDirection || 'asc',
            fieldName: defaultSortColumn.propertyName,
        }

    return defaultSort
}

export function getSorted<T extends { [propertyName: string]: any }>(
    data: ReadonlyArray<T>,
    cols: ReadonlyArray<TableColumn<T>>,
    sort?: Sort,
): ReadonlyArray<T> {

    // get the sort column
    const sortColumn: TableColumn<T> | undefined = !!sort
        ? cols.find(col => col.propertyName === sort.fieldName)
        : undefined

    const sortedData: Array<T> = [...data]

    // if we don't have a column to sort, don't sort
    if (!sort || !sortColumn) {
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
