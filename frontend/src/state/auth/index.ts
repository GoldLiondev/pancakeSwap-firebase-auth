/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'utils/form-validation'
import { AuthState, AuthPayload } from '../types'

const initialState: AuthState = {
  isAuthenticated: false,
  userEmail: '',
  userRole: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthPayload>) => {
      state.isAuthenticated = !isEmpty(action.payload.useremail)
      state.userEmail = action.payload.useremail
      state.userRole = action.payload.userrole
    },
  },
})

// Actions
export const { setAuth } = authSlice.actions

export default authSlice.reducer
