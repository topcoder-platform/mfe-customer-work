import { WorkPrice } from './work-price.model'
import { WorkType } from './work-type.enum'

export const WorkPrices: { [workType: string]: WorkPrice } = {
    [WorkType.data]: {
        base: 0,
        getPrice: getDefaultPrice,
        promo: 0,
        usePromo: true,
    },
    [WorkType.design]: {
        base: 0,
        getPrice: (price: WorkPrice, pageCount?: number, deviceCount?: number) => {
            const safePageCount: number = pageCount || 1
            const safeDeviceCount: number = deviceCount || 1
            return price.base +
                safePageCount * (price.perPage || 1) +
                safePageCount * (safeDeviceCount - 1) * (price.perPage || 1)
        },
        promo: 0,
        usePromo: true,
    },
    [WorkType.findData]: {
        base: 0,
        getPrice: getDefaultPrice,
        promo: 0,
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
