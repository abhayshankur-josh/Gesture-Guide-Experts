import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getFromLocalStorage = (): IProfile | null => {
    const localValue = localStorage.getItem('profile');
    if (localValue) {
        const obj: IProfile = JSON.parse(localValue);
        return obj;
    }
    return null;
}

const storedProfile = getFromLocalStorage();

const initialState: IProfile = {
    id: (storedProfile && storedProfile.id) || 0,
    email: (storedProfile && storedProfile.email) || "",
    full_name: (storedProfile && storedProfile.full_name) || "",
    role_id: (storedProfile && storedProfile.role_id) || 0,
    jti: (storedProfile && storedProfile.jti) || "",
    active: (storedProfile && storedProfile.active) || false,
    created_at: (storedProfile && storedProfile.created_at) || "",
    updated_at: (storedProfile && storedProfile.updated_at) || ""
};

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        setProfileDetails: (_profileState,  action: PayloadAction<IProfile>) => {
            _profileState = action.payload;
            localStorage.setItem('profile',JSON.stringify(action.payload));
        },
        getProfileDetails: (_profileState) => {
            return { ..._profileState };
        },
        removeProfileDetails: (_profileState) => {
            localStorage.removeItem('profile');
            _profileState = initialState;

        }
    }
});

export const { setProfileDetails, getProfileDetails, removeProfileDetails } = profileSlice.actions;
export default profileSlice.reducer;