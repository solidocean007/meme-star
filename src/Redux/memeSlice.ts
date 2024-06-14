// memesSlice.js
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MemeType } from "../Utils/types";
import { getAllData } from "../api/getAllData";
import { processMemes } from "../api/helperFunctions/processedMemes";

interface FetchError {
  message: string;
}

// Action payloads
interface LikeQuotePayload {
  memeId: string;
  quoteId: string;
  userId: string;
}

interface DeleteQuotePayload {
  memeId: string;
  quoteId: string;
}

export const fetchMemes = createAsyncThunk<
  MemeType[],
  void,
  { rejectValue: FetchError }
>("memes/fetchMemes", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllData();
    const processedMemes = processMemes(response);
    return processedMemes;
  } catch (error) {
    const fetchError: FetchError = {
      message: error instanceof Error ? error.message : "Unknown error",
    };
    return rejectWithValue(fetchError);
  }
});

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
      const { memeId, quoteId, userId, action: updateAction } = action.payload;
      const meme = state.entities.find(m => m.id === memeId);
      const quote = meme?.allQuotes.find(q => q.id === quoteId);
      if (quote) {
        switch (updateAction) {
          case 'like':
            quote.quoteLikedBy.push(userId);
            break;
          case 'unlike':
            quote.quoteLikedBy = quote.quoteLikedBy.filter(id => id !== userId);
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
        meme.allQuotes = meme.allQuotes.filter(q => q.id !== quoteId);
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

export default memesSlice.reducer;
