import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubmissionsState {
    submissions: ISubmission[] | null;
    submissionView: ISubmissionView[] | null;
}

const initialState: SubmissionsState = {
    submissions: null,
    submissionView: null,
};


const submissionSlice = createSlice({
    name: 'submissionSlice',
    initialState,
    reducers: {
        setSubmissions: (state, action: PayloadAction<ISubmission[]>) => {
            state.submissions = action.payload;
        },
        setSubmissionView: (state, action: PayloadAction<ISubmissionView[]>) => {
            state.submissionView = action.payload;
        },
    }
});

export const { setSubmissions, setSubmissionView } = submissionSlice.actions;
export default submissionSlice.reducer;