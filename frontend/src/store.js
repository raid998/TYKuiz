import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './features/quiz/quizSlice'
import userReducer from './features/user/userSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedQuizReducer = persistReducer(persistConfig, quizReducer)
const persistedUserReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    quiz: persistedQuizReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
const persistor = persistStore(store)
export { store, persistor }
