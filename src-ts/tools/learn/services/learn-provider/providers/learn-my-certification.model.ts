import { LearnCertification } from '../../learn-functions'

import { LearnMyCertificationProgress } from './learn-my-certification-progress.model'

export interface LearnMyCertification extends LearnCertification {
    progress: LearnMyCertificationProgress
}
