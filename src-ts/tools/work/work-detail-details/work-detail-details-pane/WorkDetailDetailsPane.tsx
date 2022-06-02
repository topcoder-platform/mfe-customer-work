import _ from 'lodash'
import { FC } from 'react'

import styles from './WorkDetailDetailsPane.module.scss'

interface WorkDetailDetailsPaneProps {
    formData: any
}

const WorkDetailDetailsPane: FC<WorkDetailDetailsPaneProps> = ({ formData }: WorkDetailDetailsPaneProps) => {
    const sections: Array<string> = ['basicInfo', 'websitePurpose', 'pageDetails', 'branding']

    return (
        <div className={styles['paneContent']}>
            {sections
                .filter((section) => {
                    if (section === 'pageDetails') {
                        return _.get(formData[section], 'pages[0].pageDetails') !== ''
                    }
                    return !!formData[section]
                })
                .map((section) => {
                    return (
                        <>
                            {section === 'pageDetails'
                                ? renderPageDetails(formData, section)
                                : renderDetails(formData, section)
                            }
                        </>
                    )
                })}
        </div>
    )
}

function renderPageDetails(formData: any, section: string): Array<JSX.Element> {
    const items: { pages: [] } = formData[section] || {}
    const pages: [] = items?.pages || []

    return pages.map((page: { pageDetails?: string, pageName?: string }, index: number) => {
        return (
            <div>
                {page?.pageName && (
                    <div className={styles['detail']}>
                        <h4 className={styles['header']}>Page {index + 1} Name</h4>
                        <p className={styles['content']}>{page?.pageName}</p>
                    </div>
                )}
                {page?.pageDetails && (
                    <div className={styles['detail']}>
                        <h4 className={styles['header']}>Page {index + 1} Requirements</h4>
                        <p className={styles['content']}>{page?.pageDetails}</p>
                    </div>
                )}
            </div>
        )
    })
}

function renderDetails(formData: any, section: string): Array<JSX.Element | Array<JSX.Element>> {
    let items: any = formData[section] || {}
    if (formData?.workType?.selectedWorkType === 'Find Me Data') {
        items = _.omit(items, ['assetsUrl', 'goals'])
    } else {
        items = _.omit(items, [
            'analysis',
            'primaryDataChallenge',
            'primaryDataChallengeOther',
            'sampleData',
        ])
    }
    return Object.keys(items).map((key) => {
        if (_.isArray(items[key])) {
            return _.map(items[key], (item, i) => (
                <div className={styles['detail']} key={i}>
                    <h4 className={styles['header']}>
                        {key} {i + 1}
                    </h4>
                    <p className={styles['content']}>
                        {Object.keys(item).map((subKey) =>
                            renderOption(item[subKey], subKey)
                        )}
                    </p>
                </div>
            ))
        }
        return renderOption(items[key])
    })
}

function renderOption(option: any, title: string = ''): JSX.Element {
    return (
        <>
            {option.option && (
                <div className={styles['detail']}>
                    <h4 className={styles['header']}>{option.title || title}</h4>
                    <p className={styles['content']}>{formatOption(option.option)}</p>
                </div>
            )}
        </>
    )
}

function formatOption(option: Array<string> | {}): string {
    if (_.isArray(option)) {
        return option.join(', ')
    }
    if (_.isObject(option)) {
        return formatOption(_.get(option, 'option', option))
    }
    return option
}

export default WorkDetailDetailsPane
