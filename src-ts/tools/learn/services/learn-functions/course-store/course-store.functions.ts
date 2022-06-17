import { xhrGetAsync } from '../../../../../lib/functions'
import { getPath } from '../learn-url.config'

import { LearnCourse } from './learn-course.model'

export function getCoursesAsync(): Promise<Array<LearnCourse>> {
    return xhrGetAsync<Array<LearnCourse>>(getPath(
        'courses'
    ))
}
