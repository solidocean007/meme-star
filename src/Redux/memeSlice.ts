// features/memes/memesSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getAllMemes } from '../api/getAllMemes';
import { MemeType } from '../Utils/types';
import { getAllData } from '../api/getAllData';
 // Adjust path as necessary

export const fetchMemes = createAsyncThunk(
  'memes/fetchMemes',
  async () => {
    // const response = await getAllMemes();
    const response = await getAllData();
    return response;
  }
);

interface MemeState {
  entities: MemeType[];
  loading: 'idle' | 'loading';
  error: string | null | undefined; // Allow undefined
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
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message ?? 'An unknown error occurred';
      });
  }
});

export default memesSlice.reducer;
