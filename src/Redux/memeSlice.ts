// memesSlice.js
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MemeType } from '../Utils/types';
import { getAllData } from '../api/getAllData';
import { processMemes } from '../api/helperFunctions/processedMemes';


interface FetchError {
  message: string;
}

export const fetchMemes = createAsyncThunk<MemeType[], void, { rejectValue: FetchError }>(
  'memes/fetchMemes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllData();
      const processedMemes = processMemes(response);
      return processedMemes;
    } catch (error) {
      const fetchError: FetchError = { message: error instanceof Error ? error.message : 'Unknown error' };
      return rejectWithValue(fetchError);
    }
  }
);

interface MemeState {
  entities: MemeType[];
  loading: 'idle' | 'loading';
  error: string | null;
}

const initialState: MemeState = {
  entities: [],
  loading: 'idle',
  error: null
};

const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchMemes.fulfilled, (state, action: PayloadAction<MemeType[]>) => {
        state.entities = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchMemes.rejected, (state, action: PayloadAction<FetchError | undefined>) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload.message : 'An unknown error occurred';
      });
  }
});

export default memesSlice.reducer;
