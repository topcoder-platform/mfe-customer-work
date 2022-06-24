import { WorkPrice } from './work-price.model'
import { WorkType } from './work-type.enum'

export const WorkPrices: { [workType: string]: WorkPrice } = {
    [WorkType.data]: {
        base: 799,
        getPrice: getDefaultPrice,
        promo: 599,
        usePromo: true,
    },
    [WorkType.design]: {
        base: 398,
        getPrice: (price: WorkPrice, pageCount?: number, deviceCount?: number) => {
            const safePageCount: number = pageCount || 1
            const safeDeviceCount: number = deviceCount || 1
            return (price.promo || 1)
            + (safePageCount * (price.perPage || 1))
            + (safePageCount * (safeDeviceCount - 1) * (price.perPage || 1))
        },
        perPage: 99,
        promo: 100,
        usePromo: false,
    },
    [WorkType.findData]: {
        base: 399,
        getPrice: getDefaultPrice,
        promo: 299,
        usePromo: true,
    },
    [WorkType.unknown]: {
        base: 0,
        getPrice: () => 0,
        usePromo: false,
    },
}

function getDefaultPrice(price: WorkPrice): number {
    return price.usePromo && price.promo ? price.promo : price.base
}
