
import { Work, WorkStatusItem } from '../../../../lib'

function WorkStatusRenderer(work: Work): JSX.Element {
    return (
        <WorkStatusItem workStatus={work.status} />
    )
}

export default WorkStatusRenderer
