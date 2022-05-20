import _ from 'lodash'
import { FC, useState } from 'react'

import PageDivider from '../../../../../src/components/PageDivider'

import styles from './WorkDetailDetailsPane.module.scss'

interface WorkDetailDetailsPaneProps {
    formData: any
}

const WorkDetailDetailsPane: FC<WorkDetailDetailsPaneProps> = (props: WorkDetailDetailsPaneProps) => {
    const [steps, setSteps] = useState([
        {
            id: 0,
            isOpen: true,
            label: 'Review Your Project Details',
            value: 'basicInfo',
        },
        { id: 1, label: 'Website Purpose', value: 'websitePurpose', isOpen: true },
        { id: 2, label: 'Page Details', value: 'pageDetails', isOpen: true },
        { id: 3, label: 'Branding', value: 'branding', isOpen: true },
    ])

    const renderPageDetails = (step: any) => {
        const items = props.formData[step.value] || {}
        const pages = items?.pages || []

        return pages.map((page: any, index: number) => {
            return (
                <div>
                    {page?.pageName && (
                        <div className={styles['detail']}>
                            <div className={styles['itemWrapper']}>
                                <p className={styles['item']}>Page {index + 1} Name</p>
                            </div>
                            <p className={styles['key']}>{page?.pageName}</p>
                        </div>
                    )}
                    {page?.pageDetails && (
                        <div className={styles['detail']}>
                            <div className={styles['itemWrapper']}>
                                <p className={styles['item']}>Page {index + 1} Requirements</p>
                            </div>
                            <p className={styles['key']}>{page?.pageDetails}</p>
                        </div>
                    )}
                </div>
            )
        })
    }

    const renderDetails = (step: any) => {
        let items = props.formData[step.value] || {}
        if (props.formData?.workType?.selectedWorkType === 'Find Me Data') {
            items = _.omit(items, ['projectTitle', 'assetsUrl', 'goals'])
        } else {
            items = _.omit(items, [
                'findMeProjectTitle',
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
                        <div className={styles['itemWrapper']}>
                            <p className={styles['item']}>
                                {key} {i + 1}
                            </p>
                        </div>
                        <p className={styles['key']}>
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

    const renderOption = (option: any, title = '') => {
        console.log('renderOption', option.title)
        return (
            <div>
                {option.option && (
                    <div className={styles['detail']}>
                        <div className={styles['itemWrapper']}>
                            <p className={styles['item']}>{option.title || title}</p>
                        </div>
                        <p className={styles['key']}>{formatOption(option.option)}</p>
                    </div>
                )}
            </div>
        )
    }

    const formatOption = (option: any): any => {
        if (_.isArray(option)) {
            return option.join(', ')
        }
        if (_.isObject(option)) {
            return formatOption(_.get(option, 'option', option))
        }
        return option
    }

    return (
        <div className={styles['paneContent']}>
            {steps
                .filter((s) => {
                    if (s.value === 'pageDetails') {
                        return _.get(props.formData[s.value], 'pages[0].pageDetails') !== ''
                    }
                    return !!props.formData[s.value]
                })
                .map((step) => {
                    return (
                        <>
                            <div
                                className={styles['header']}
                            >
                                <p className={styles['stepLabel']}>
                                    {step.label}
                                </p>
                            </div>
                            {step.value === 'pageDetails'
                                ? renderPageDetails(step)
                                : renderDetails(step)
                            }

                            <PageDivider styleName={''} />
                        </>
                    )
                })}
        </div>
    )
}

export default WorkDetailDetailsPane
