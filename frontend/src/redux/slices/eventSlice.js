import { createSlice } from '@reduxjs/toolkit'
import { STATUS } from '../../utils/constants'
import Thumbnail from '../../assets/images/thumbnail.png';

const fakeData = [
    {
        id: '120213991',
        name: 'Sự kiện số 1',
        dateStart: '1/1/2023',
        dateEnd: '1/1/2023',
        members: 100,
        total: 100000,
        vat: 100,
        payed: 99,
        debt: 10,
        status: STATUS.ACTIVE,
        note: 'something',
        address: 'viet nam',
        thumbnail: Thumbnail
    },
    {
        id: '120223991',
        name: 'Sự kiện số 2',
        dateStart: '1/1/2023',
        dateEnd: '1/1/2023',
        members: 100,
        total: 100000,
        vat: 100,
        payed: 99,
        debt: 10,
        status: STATUS.PROGRESS,
        note: 'something',
        address: 'viet nam',
        thumbnail: Thumbnail
    }
]

const initialState = {
  evens: fakeData
}

export const eventSlices = createSlice({
  name: 'event',
  initialState,
  reducers: {
    listEvent: (state) => {
      return state.evens
    },
    filterEvent: (state, actions) =>{
        if(actions.payload !== STATUS.ALL) {
            return state.evens.filter((item) => item.status === actions.payload)
        }
            return state.evens
    }
  },
})

// Action creators are generated for each case reducer function
export const { listEvent } = eventSlices.actions

export default eventSlices.reducer