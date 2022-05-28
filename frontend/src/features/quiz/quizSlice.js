import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const QUIZ_API = '/tykuiz/quiz'

export const fetchQuiz = createAsyncThunk(
  'quiz/getQuiz',
  async ({ cat, diff }) => {
    try {
      const response = await axios.get(
        `${QUIZ_API}?difficulty=${diff}&topic=${cat}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
        }
      )
      if (response.status == 200) return [...response.data]
      throw new Error(response.data)
    } catch (err) {
      return err.message
    }
  }
)

const initialState = {
  questions: [],
  score: 0,
  state: null,
  error: null,
}
export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ user, score }, getThunkAPI) => {
    const res = await axios.post(QUIZ_API, { user, score })
    console.log(res.data)
    return res.data
  }
)
const quizState = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      if (
        state.questions[action.payload.index]['correct_answers'][
          `${action.payload.answer}_correct`
        ] == 'true' &&
        !state.questions[action.payload.index].answered
      ) {
        state.score = state.score + 1
      }
      state.questions[action.payload.index].answered = true
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuiz.pending, (state, action) => {
        state.status = 'chargement'
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = 'success'
        state.questions = [...action.payload]
        state.state = 'playing'
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
      .addCase(submitQuiz.pending, (state, action) => {
        state.state = 'submitting'
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.questions = null
        state.state = 'idle'
        state.score = 0
        console.log('hi', action.payload)
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.state = 'error_submitting'
      })
  },
})

export const { setAnswer } = quizState.actions
export default quizState.reducer
