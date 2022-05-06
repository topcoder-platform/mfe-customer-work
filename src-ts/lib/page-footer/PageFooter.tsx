
import { FC } from 'react'

import { FooterSocialConfig, FooterTCYear } from '../../config'
import { SocialLink, SocialLinkIcons } from '../social-links'

import styles from './PageFooter.module.scss'

export interface PageFooterProps {
}

const PageFooter: FC<PageFooterProps> = ({
}: PageFooterProps) => {
    return (
        <div className={styles['footer-wrap']}>
            <div className={styles['footer-inner']}>
                <div className={styles.utils}>
                    <div>
                        <span>© {FooterTCYear} Topcoder</span>
                        <a href='#'>Support</a>
                        <a href='#'>See a Bug?</a>
                    </div>
                    <div>
                        <a href='#'>Terms</a>
                        <a href='#'>Privacy Policy</a>
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
