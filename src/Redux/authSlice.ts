// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewUserType, UsersType } from '../Utils/types';
import loginService from '../api/auth/loginService';
import signUpService from '../api/auth/signUpService';
import { AppDispatch } from './store';

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


export const loginUser = createAsyncThunk<
  UsersType,
  { email: string; password: string },
  { rejectValue: string; dispatch: AppDispatch }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await loginService(email, password, dispatch);
      if (data) {
        return data;
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue('Failed to login');
    }
  }
);

export const signUpUser = createAsyncThunk<UsersType, NewUserType,{ rejectValue: string }>(
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
    setUser(state, action: PayloadAction<UsersType | null>) {
      state.user = action.payload;
      state.isAuthenticated = action.payload !== null;
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

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
