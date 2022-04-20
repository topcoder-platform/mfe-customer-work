import { TableColumn } from '../../lib'

import { WorkBadgeRenderer } from './work-badge-renderer'
import { Work } from './work-functions'
import { WorkListTitleRenderer } from './work-list-title-renderer'
import { WorkStatusRenderer } from './work-status-renderer'

function messageBadgeRenderer(work: Work): JSX.Element {
    return WorkBadgeRenderer({
        count: work.messageCount,
        type: 'messages',
    })
}

export const workListColumns: Array<TableColumn<Work>> = [
    {
        label: 'Title',
        propertyName: 'title',
        renderer: WorkListTitleRenderer,
        type: 'element',
    },
    {
        label: 'Status',
        propertyName: 'status',
        renderer: WorkStatusRenderer,
        type: 'element',
    },
    {
        label: 'Type',
        propertyName: 'type',
        type: 'text',
    },
    {
        label: 'Created',
        propertyName: 'created',
        type: 'date',
    },
    {
        label: 'Solutions Ready',
        propertyName: 'solutionsReady',
        type: 'date',
    },
    {
        label: 'Cost (USD)',
        propertyName: 'cost',
        type: 'money',
    },
    {
        label: 'Messages',
        propertyName: 'messageCount',
        renderer: messageBadgeRenderer,
        type: 'element',
    },
]
