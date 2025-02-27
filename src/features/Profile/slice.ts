import { createSlice } from "@reduxjs/toolkit";

const initialState: IProfile = {
    id: 0,
    email: "",
    full_name: "",
    role_id: 0,
    jti: "",
    active: false,
    created_at: "",
    updated_at: ""
};

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        getProfileDetails: (profile) => {
            return profile;
        }
    }
});

export const { getProfileDetails } = profileSlice.actions;
export default profileSlice.reducer;