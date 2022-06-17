import { xhrGetAsync } from '../../../../../lib/functions'
import { getPath } from '../learn-url.config'

import { LearnCourse } from './learn-course.model'

export function getCourseAsync(certification: string): Promise<LearnCourse|undefined> {
    return xhrGetAsync<Array<LearnCourse>>(getPath(
        'courses',
        `?certification=${certification}`
    )).then(courses => courses[0])
}
