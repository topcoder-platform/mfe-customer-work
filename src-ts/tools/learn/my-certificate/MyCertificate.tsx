import { FC, useContext } from 'react'
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom'

import { IconOutline, profileContext, ProfileContextData } from '../../../lib'
import {
    CoursesProviderData,
    MyCertificationProgressProviderData,
    useCoursesProvider,
    useMyCertificationProgress
} from '../learn-lib'

import { ActionButton } from './action-button'
import { Certificate } from './certificate'
import styles from './MyCertificate.module.scss'

interface MyCertificateProps {
}

const MyCertificate: FC<MyCertificateProps> = (props: MyCertificateProps) => {
    const routeParams: Params<string> = useParams()
    const { profile }: ProfileContextData = useContext(profileContext)
    const navigate: NavigateFunction = useNavigate()

    const {
        course,
    }: CoursesProviderData = useCoursesProvider(routeParams.provider, routeParams.certification)

    const {
        certificateProgress,
    }: MyCertificationProgressProviderData = useMyCertificationProgress(
        profile?.userId,
        routeParams.provider,
        routeParams.certification
    )

    function handleBackBtnClick(): void {
        navigate(-1)
    }

    return (
        <div className={styles['wrap']}>
            <div className={styles['content-wrap']}>
                <div className={styles['btns-wrap']}>
                    <ActionButton
                        icon={<IconOutline.ChevronLeftIcon />}
                        onClick={handleBackBtnClick}
                    />
                </div>
                <div className={styles['certificate-wrap']}>
                    <Certificate
                        course={course?.title}
                        userName={[profile?.firstName, profile?.lastName].filter(Boolean).join(' ')}
                        tcHandle={profile?.handle}
                        provider={course?.provider}
                        completedDate={certificateProgress?.completedDate ?? ''}
                    />
                </div>
                <div className={styles['btns-wrap']}>
                    <ActionButton icon={<IconOutline.PrinterIcon />} />
                    <ActionButton icon={<IconOutline.DownloadIcon />} />
                    <ActionButton icon={<IconOutline.ShareIcon />} />
                </div>
            </div>
        </div>
    )
}

export default MyCertificate
