
import { Work, WorkStatusItem } from '../../../../lib'

function WorkStatusRenderer(work: Work): JSX.Element {
    return (
        <WorkStatusItem work={work} />
    )
}

export default WorkStatusRenderer
