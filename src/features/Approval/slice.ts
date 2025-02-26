import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Submission, SubmissionView } from "./types/approvalTypes";

interface SubmissionsState {
    submissions: Submission[] | null;
    submissionView: SubmissionView[] | null;
}

const initialState: SubmissionsState = {
    submissions: null,
    submissionView: null,
};


const submissionSlice = createSlice({
    name: 'submissionSlice',
    initialState,
    reducers: {
        setSubmissions: (state, action: PayloadAction<Submission[]>) => {
            state.submissions = action.payload;
        },
        setSubmissionView: (state, action: PayloadAction<SubmissionView[]>) => {
            state.submissionView = action.payload;
        },
    }
});

export const { setSubmissions, setSubmissionView } = submissionSlice.actions;
export default submissionSlice.reducer;