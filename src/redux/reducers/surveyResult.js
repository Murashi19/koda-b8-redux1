import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
};
const surveyResult = createSlice({
    name: 'surveyResult',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload);
        },
        removeData: (state, action) => {
            state.data = state.data.filter((_, index) => index !== action.payload)
        }
    }

})

export default surveyResult.reducer
export const { addData, removeData } = surveyResult.actions