import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { AppState } from "@store/index";
interface Credential {
  token: string;
  refresh_token: string;
}
const initialState: Credential = {
  token: "",
  refresh_token: "",
};
export const credentialSlice = createSlice<
  Credential,
  {
    saveCredential(
      state: Draft<Credential>,
      action: PayloadAction<Credential>
    ): void;
    resetCredential(state: Draft<Credential>): void;
  },
  "credential"
>({
  name: "credential",
  initialState: initialState,
  reducers: {
    // 保存用户登录凭据
    saveCredential(state, action) {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    },
    // 重置登录凭据
    resetCredential(state) {
      state.token = "";
      state.refresh_token = "";
    },
  },
});
export const persistCredentialReducer = persistReducer(
  { key: "credentialReducer", storage },
  credentialSlice.reducer
);

// 获取token
export const tokenSelector = (state: AppState) => state.credential.token;
export const { saveCredential, resetCredential } = credentialSlice.actions;
