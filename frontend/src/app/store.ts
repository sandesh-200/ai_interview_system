import { configureStore } from '@reduxjs/toolkit'
import  interviewReducer  from '@/features/interview/interviewSlice'
import interviewSessionReducer from '@/features/interviewSession/interviewSessionSlice'


export const store = configureStore({
    reducer:{
        interview:interviewReducer,
        interviewSession:interviewSessionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch