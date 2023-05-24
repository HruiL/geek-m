import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
interface UserState {
  user: Partial<User>;
}
export const userSlice = createSlice<
  UserState,
  { saveUser: (state: Draft<UserState>, action: PayloadAction<User>) => void },
  "userReducer"
>({
  name: "userReducer",
  initialState: { user: {} },
  reducers: {
    saveUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const persistUserReducer = persistReducer(
  { key: "userReducer", storage },
  userSlice.reducer
);
export const { saveUser } = userSlice.actions;
