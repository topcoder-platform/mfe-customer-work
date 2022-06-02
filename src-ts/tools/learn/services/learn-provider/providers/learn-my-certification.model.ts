import { LearnCertification } from './learn-certification.model'
import { LearnMyCertificationProgress } from './learn-my-certification-progress.model'

export interface LearnMyCertification extends LearnCertification {
    progress: LearnMyCertificationProgress
}
