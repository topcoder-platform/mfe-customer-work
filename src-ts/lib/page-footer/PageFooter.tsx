
import { Dispatch, FC, SetStateAction, useState } from 'react'

import { FooterSocialConfig } from '../../config'
import { OrderContractModal, PrivacyPolicyModal, TermsModal } from '../modals'
import { SocialLink, SocialLinkIcons } from '../social-links'

import styles from './PageFooter.module.scss'

const todayYear: number = (new Date()).getFullYear()

export interface PageFooterProps {
}

const PageFooter: FC<PageFooterProps> = ({
}: PageFooterProps) => {
    const [isOrderContractModalOpen, setIsOrderContractModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
    const [isPrivacyModalOpen, setIsPrivacyModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
    const [isTermsModalOpen, setIsTermsModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    return (
        <div className={styles['footer-wrap']}>
            <OrderContractModal isOpen={isOrderContractModalOpen} onClose={() => setIsOrderContractModalOpen(false)} />
            <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
            <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />

            <div className={styles['footer-inner']}>
                <div className={styles.utils}>
                    <div>
                        <span>© {todayYear} Topcoder</span>
                        <a href='#'>Support</a>
                        <a href='#'>See a Bug?</a>
                    </div>
                    <div>
                        <a href='#' onClick={(e) => {e.preventDefault(); setIsTermsModalOpen(true)}}>Terms</a>
                        <a href='#' onClick={(e) => {e.preventDefault(); setIsPrivacyModalOpen(true)}}>Privacy Policy</a>
                    </div>
                </div>
                <div className={styles.social}>
                    {Object.entries(FooterSocialConfig).map(([platform, url]: [string, string]) => (
                        <SocialLink icon={platform as keyof typeof SocialLinkIcons} url={url} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PageFooter
