import _ from 'lodash'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import { WorkType } from '../../../../lib'
import { workFactoryMapFormData } from '../../../../lib/work-provider/work-functions/work-factory'

import styles from './WorkDetailDetailsPane.module.scss'

interface WorkDetailDetailsPaneProps {
    formData: any
}

const WorkDetailDetailsPane: FC<WorkDetailDetailsPaneProps> = ({ formData }: WorkDetailDetailsPaneProps) => {
    console.log(formData)
    const [formattedData, setFormattedData]: [any, Dispatch<SetStateAction<any>>] = useState<any>(formData)

    useEffect(() => {
        console.log('inside useeffect')
        const test: any = workFactoryMapFormData(formData?.workType?.selectedWorkType, formData.basicInfo)
        console.log(test)
        if (test) {
            setFormattedData(test)
        }
        // if (formData && Object.keys(formData.basicInfo).length > 0) {
        //     console.log('inside if')
        //     // setFormattedData(workFactoryMapFormData(formData?.workType?.selectedWorkType, formData.basicInfo))
        //     setFormattedData(formData)
        // }
    }, [formData, formattedData])

    // const formattedData: any = {}
    // if (formData && Object.keys(formData.basicInfo).length > 0) {
    //     console.log('inside if')
    //     // setFormattedData(workFactoryMapFormData(formData?.workType?.selectedWorkType, formData.basicInfo))
    //     formattedData = workFactoryMapFormData(formData?.workType?.selectedWorkType, formData.basicInfo)
    // }
    // const formattedData: any = workFactoryMapFormData(formData?.workType?.selectedWorkType, formData.basicInfo)
    // console.log(formattedData)

    // const formattedData: any = mapFormData(formData?.workType?.selectedWorkType, formData.basicInfo)

    return (
        <div className={styles['paneContent']}>
            {/* {sections
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
                })} */}
            {renderDetails(formattedData)}
        </div>
    )
}

// function renderPageDetails(formData: any, section: string): Array<JSX.Element> {
//     const items: { pages: [] } = formData[section] || {}
//     const pages: [] = items?.pages || []

//     return pages.map((page: { pageDetails?: string, pageName?: string }, index: number) => {
//         return (
//             <div>
//                 {page?.pageName && (
//                     <div className={styles['detail']}>
//                         <h4 className={styles['header']}>Page {index + 1} Name</h4>
//                         <p className={styles['content']}>{page?.pageName}</p>
//                     </div>
//                 )}
//                 {page?.pageDetails && (
//                     <div className={styles['detail']}>
//                         <h4 className={styles['header']}>Page {index + 1} Requirements</h4>
//                         <p className={styles['content']}>{page?.pageDetails}</p>
//                     </div>
//                 )}
//             </div>
//         )
//     })
// }

function renderDetails(formData: any): Array<JSX.Element | Array<JSX.Element>> {
    // let items: any = formData[section] || {}
    // if (formData?.workType?.selectedWorkType === 'Find Me Data') {
    //     items = _.omit(items, ['projectTitle', 'assetsUrl', 'goals'])
    // } else {
    //     items = _.omit(items, [
    //         'findMeProjectTitle',
    //         'analysis',
    //         'primaryDataChallenge',
    //         'primaryDataChallengeOther',
    //         'sampleData',
    //     ])
    // }
    return Object.keys(formData).map((key) => {
        if (_.isArray(formData[key])) {
            return _.map(formData[key], (item, i) => (
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
        console.log(key)
        return renderOption(formData[key])
    })
}

function renderOption(option: any, title: string = ''): JSX.Element {
    return (
        <>
            {option.value && (
                <div className={styles['detail']}>
                    <h4 className={styles['header']}>{option.title || title}</h4>
                    <p className={styles['content']}>{formatOption(option.value)}</p>
                </div>
            )}
        </>
    )
}

function formatOption(option: Array<string> | {}): string | Array<JSX.Element> {
    // if (_.isArray(option)) {
    //     return option.join(', ')
    // }
    if (_.isArray(option)) {
        return option.map((opt, index) => (<div id={`${index}`}>{opt}</div>))
    }
    if (_.isObject(option)) {
        return formatOption(_.get(option, 'option', option))
    }
    return option
}

export default WorkDetailDetailsPane
