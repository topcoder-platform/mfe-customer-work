import { xhrGetAsync } from '../../../../../lib/functions'
import { getPath } from '../../learn-url.config'
import { LearnMyCertificationProgress } from './learn-my-certification-progress.model'


export function getMyCertificationsProgressAsync(userId: number, certification?: string): Promise<Array<LearnMyCertificationProgress>> {
    return xhrGetAsync<Array<LearnMyCertificationProgress>>(getPath(
        'certification-progresses',
        userId,
        ...(!certification ? [] : [
            'certification',
            certification
        ])
    ))
}
