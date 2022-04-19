import { TableColumn } from '../../lib'

import WorkBadgeRenderer from './work-badge-renderer/WorkBadgeRenderer'
import WorkListTitleRenderer from './work-list-title-renderer/WorkListTitleRenderer'
import WorkStatusRenderer from './work-status-renderer/WorkStatusRenderer'
import { Work } from './work.model'

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
