import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    profiles: [],
    isProfileDeleted: false,
    usersCount: null,
    loading: false,
  },

  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },

    setProfiles(state, action) {
      state.profiles = action.payload;
      state.loading = false;
    },

    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },

    setProfileDeleted(state) {
      state.isProfileDeleted = true;
    },

    setUsersCount(state, action) {
      state.usersCount = action.payload;
    },

    clearProfileDelete(state) {
      state.isProfileDeleted = false;
    },

    setLoading(state) {
      state.loading = true;
    },

    clearLoading(state) {
      state.loading = false;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
