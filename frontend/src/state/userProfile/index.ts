/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  profile: {},
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.profile = { ...action.payload }
    },
  },
})

// Actions
export const { setUserProfile } = userProfileSlice.actions

export default userProfileSlice.reducer
