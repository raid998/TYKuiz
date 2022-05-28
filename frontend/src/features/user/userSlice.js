import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // data of the user = null at init -> user not loggin
  },
  reducers: {
    //update state
    login: (state, action) => {
      //action -> data passed to us
      state.login = action.payload.loggedIn
      state.user = { ...action.payload }
    },
    logout: (state) => {
      state.user = null
    },
    register: (state, action) => {
      //action -> data passed to us
      console.log(action.payload)
      state.registred = action.payload.registred
      console.log(state.registred)
      state.user = { ...action.payload }
    },
  },
})

export const { login, logout, register } = userSlice.actions
export const selectUser = (state) => state.user.user // de base state.user contient des information mais on va le remettre à jour avec plus
export default userSlice.reducer
