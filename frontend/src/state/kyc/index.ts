/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    kycData: {},
}

export const kycData = createSlice({
    name: 'KYC',
    initialState,
    reducers: {
        setKYC: (state, action: PayloadAction<any>) => {
            state.kycData = { ...action.payload }
        },
    },
})

// Actions
export const { setKYC } = kycData.actions

export default kycData.reducer
