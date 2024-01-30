import { COLOR, STATUS } from "./constants"

export const generateColorByType = (type) =>{
    return COLOR[type]
}

export const listOptionsSelect = [
    {
        label: 'Tất cả sự kiện',
        value: STATUS.ALL
    },
    {
        label: 'Sự kiện đang diễn ra',
        value: STATUS.PROGRESS
    },
    {
        label: 'Sự kiện đã qua',
        value: STATUS.COMPLETE
    },
    {
        label: 'Sự kiện đã bị hủy',
        value: STATUS.CANCEL
    },
]