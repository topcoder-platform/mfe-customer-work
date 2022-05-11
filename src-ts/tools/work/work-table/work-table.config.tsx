import { TableColumn, Work } from '../../../lib'

import { WorkBadgeRenderer } from './work-badge-renderer'
import { WorkDeleteButtonRenderer } from './work-delete-button-renderer'
import { WorkStatusRenderer } from './work-status-renderer'
import { WorkTableTitleRenderer } from './work-table-title-renderer'

function messageBadgeRenderer(work: Work): JSX.Element {
    return WorkBadgeRenderer({
        count: work.messageCount,
        type: 'messages',
    })
}

export const workListColumns: Array<TableColumn<Work>> = [
    {
        label: 'Title',
        renderer: WorkTableTitleRenderer,
        type: 'element',
    },
    {
        label: 'Status',
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
    /*
        TODO: add this column back when the bug is fixed:
        https://topcoder.atlassian.net/browse/PROD-1860
        Unread Messages count from API don't match embedded forum widget
    {
        label: 'Messages',
        renderer: messageBadgeRenderer,
        tooltip: 'Messages pending response',
        type: 'element',
    },
    */
    {
        renderer: WorkDeleteButtonRenderer,
        type: 'action',
    },
]
