import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state) => {
            state.loading = false;
        },
        setData: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const { setLoading, setData, setError } = homeSlice.actions

export default homeSlice.reducer;