/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsersState } from '../types'

const initialState: UsersState = {
  users: [],
}

export const userlistSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<any>) => {
      state.users = action.payload
    },
  },
})

// Actions
export const { setUserList } = userlistSlice.actions

export default userlistSlice.reducer
