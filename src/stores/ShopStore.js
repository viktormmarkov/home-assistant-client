import {createSlice} from '@reduxjs/toolkit'
const initialSlice = {
    list: []
}

export const shopSlice = createSlice({
    name: 'shops',
    initialSlice,
    reducers: {
        listLoaded: (action) => {
            return {
                ...state,
                list: [...action.payload]
              };
        }
    }
})