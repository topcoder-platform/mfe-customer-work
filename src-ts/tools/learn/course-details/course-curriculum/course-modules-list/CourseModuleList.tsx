import { FC } from 'react'

import { CourseModuleListItem } from './course-modules-list-item'
import styles from './CourseModuleList.module.scss'

interface CourseModuleListProps {
}

const CourseModuleList: FC<CourseModuleListProps> = (props: CourseModuleListProps) => {

    return (
        <div className={styles['wrap']}>
            <CourseModuleListItem
                name='Name of Module in Course'
                shortDescription='Pharetra massa massa ultricies mi quis hendrerit dolor magna eget. Sapien eget mi proin sed libero.'
                lessonsCount={4}
                duration={15}
                completed={false}
            />
            <CourseModuleListItem
                name='Name of Second Module in Course'
                shortDescription='Pharetra massa massa ultricies mi quis hendrerit dolor magna eget. Sapien eget mi proin sed libero.'
                lessonsCount={4}
                duration={15}
                completed={false}
            />
            <CourseModuleListItem
                name='Name of Third Module in Course'
                shortDescription='Pharetra massa massa ultricies mi quis hendrerit dolor magna eget. Sapien eget mi proin sed libero.'
                lessonsCount={4}
                duration={15}
                completed={false}
            />
            <CourseModuleListItem
                name='Name of Fourth Module in Course'
                shortDescription='Pharetra massa massa ultricies mi quis hendrerit dolor magna eget. Sapien eget mi proin sed libero.'
                lessonsCount={4}
                duration={15}
                completed={false}
            />
            <CourseModuleListItem
                name='Final Assessments'
                shortDescription='Pharetra massa massa ultricies mi quis hendrerit dolor magna eget. Sapien eget mi proin sed libero.'
                lessonsCount={4}
                duration={15}
                completed={false}
            />
        </div>
    )
}

export default CourseModuleList
