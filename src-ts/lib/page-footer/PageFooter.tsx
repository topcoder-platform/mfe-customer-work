
import { FC } from 'react'

import { SocialIconFacebook, SocialIconInstagram, SocialIconLinkedin, SocialIconTwitter, SocialIconYoutube } from '../svgs'

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
                        <span>© 2022 Topcoder</span>
                        <a href='#'>Support</a>
                        <a href='#'>See a Bug?</a>
                    </div>
                    <div>
                        <a href='#'>Terms</a>
                        <a href='#'>Privacy Policy</a>
                    </div>
                </div>
                <div className={styles.social}>
                    <a href='https://www.facebook.com/topcoder' target='_blank'>
                        <SocialIconFacebook />
                    </a>
                    <a href='https://www.youtube.com/channel/UCFv29ANLT2FQmtvS9DRixNA ' target='_blank'>
                        <SocialIconYoutube />
                    </a>
                    <a href='https://www.linkedin.com/company/topcoder' target='_blank'>
                        <SocialIconLinkedin />
                    </a>
                    <a href='https://twitter.com/topcoder ' target='_blank'>
                        <SocialIconTwitter />
                    </a>
                    <a href='https://www.instagram.com/topcoder' target='_blank'>
                        <SocialIconInstagram />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PageFooter
