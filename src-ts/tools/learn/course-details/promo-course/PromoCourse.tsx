import { FC } from 'react'

import { LearnGetCertified } from '../../../../lib'

import styles from './PromoCourse.module.scss'


interface PromoCourseProps {
}

const PromoCourse: FC<PromoCourseProps> = (props: PromoCourseProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['text-content']}>
                <h4 className='details'>Coming soon</h4>
                <div className='body-medium-bold'>
                    More ways to reach your potential with Recommended Learning Paths
                </div>
                <div className='body-main'>
                    [Messaging about how courses offered through Topcoder Academy build a
                    foundation to reach career goals. As we add more learning opportunities
                    to our offerings we will recommend sequences of courses to
                    help qualify for a specific role.]
                </div>
            </div>
            <LearnGetCertified />
        </div>
    )
}

export default PromoCourse
