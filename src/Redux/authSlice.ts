// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewUserType, UsersType } from '../Utils/types';
import loginService from '../api/auth/loginService';
import signUpService from '../api/auth/signUpService';

interface AuthState {
  user: UsersType | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};


export const loginUser = createAsyncThunk<UsersType, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginService(email, password);
      return data;
    } catch (error) { // unexpected any type
      return rejectWithValue('Failed to login');
    }
  }
);

export const signUpUser = createAsyncThunk<NewUserType, NewUserType,{ rejectValue: string }>(
  'auth/signUp',
  async (userData: NewUserType, { rejectWithValue }) => {
    try {
        const data = await signUpService(userData);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to sign up');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UsersType>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<UsersType>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
