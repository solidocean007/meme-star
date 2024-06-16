import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MemeType, LikedQuotesType } from "../Utils/types";
import { getAllData } from "../api/getAllData";
import { processMemes } from "../helperFunctions/processedMemes";

interface FetchError {
  message: string;
}

interface UpdateQuotePayload {
  memeId: string;
  quoteId: string;
  likedQuote: LikedQuotesType;
  action: 'like' | 'unlike';
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
  loading: "idle" | "loading";
  error: string | null;
}

const initialState: MemeState = {
  entities: [],
  loading: "idle",
  error: null,
};

const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    updateLikedQuotes: (state, action: PayloadAction<UpdateQuotePayload>) => {
      const { memeId, quoteId, likedQuote, action: updateAction } = action.payload;
      const meme = state.entities.find(m => m.id === memeId);
      const quote = meme?.allQuotes?.find(q => q.id === quoteId);
      if (quote) {
        switch (updateAction) {
          case 'like':
            quote.quoteLikes.push(likedQuote);
            break;
          case 'unlike':
            quote.quoteLikes = quote.quoteLikes.filter(like => like.id !== likedQuote.id);
            break;
          default:
            break;
        }
      }
    },
    deleteQuote: (state, action: PayloadAction<{ memeId: string, quoteId: string }>) => {
      const { memeId, quoteId } = action.payload;
      const meme = state.entities.find(m => m.id === memeId);
      if (meme) {
        meme.allQuotes = meme.allQuotes?.filter(q => q.id !== quoteId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(
        fetchMemes.fulfilled,
        (state, action: PayloadAction<MemeType[]>) => {
          state.entities = action.payload;
          state.loading = "idle";
        }
      )
      .addCase(
        fetchMemes.rejected,
        (state, action: PayloadAction<FetchError | undefined>) => {
          state.loading = "idle";
          state.error = action.payload
            ? action.payload.message
            : "An unknown error occurred";
        }
      );
  },
});

export const { updateLikedQuotes, deleteQuote } = memesSlice.actions;

export default memesSlice.reducer;

