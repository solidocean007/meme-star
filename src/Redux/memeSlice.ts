import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LikedMemesType, MemeType } from "../Utils/types";
import { getAllData } from "../api/getAllData";
import { processMemes } from "../helperFunctions/processedMemes";

interface FetchError {
  message: string;
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
    addLikedQuoteToRedux: (
      state,
      action: PayloadAction<{
        memeId: string;
        quoteId: string;
        userId: string;
        id: string;
      }>
    ) => {
      const { memeId, quoteId, userId, id } = action.payload;
      const meme = state.entities.find((m) => m.id === memeId);
      const quote = meme?.allQuotes?.find((q) => q.id === quoteId);
      if (quote) {
        quote.quoteLikes.push({ userId, quoteId, memeId, id });
      }
    },
    removeLikedQuoteFromRedux: (
      state,
      action: PayloadAction<{ likedQuoteId: string }>
    ) => {
      state.entities.forEach((meme) => {
        meme.allQuotes = meme.allQuotes || [];
        meme.allQuotes.forEach((quote) => {
          quote.quoteLikes = quote.quoteLikes.filter(
            (like) => like.id !== action.payload.likedQuoteId
          );
        });
      });
    },
    deleteQuoteFromRedux: (
      state,
      action: PayloadAction<{ memeId: string; quoteId: string }>
    ) => {
      const { memeId, quoteId } = action.payload;
      const meme = state.entities.find((m) => m.id === memeId);
      if (meme) {
        meme.allQuotes = meme.allQuotes?.filter((q) => q.id !== quoteId);
      }
    },
    addQuoteToRedux: (
      state,
      action: PayloadAction<{
        id: string;
        memeId: string;
        text: string;
        userId: string;
        userNameQuote: string;
        quoteLikes: LikedMemesType[];
      }>
    ) => {
      const { id, text, userId, userNameQuote, memeId, quoteLikes } = action.payload;
      const meme = state.entities.find((m) => m.id === memeId);
      if (meme) {
        meme.allQuotes?.push({id, text, userId, userNameQuote, memeId, quoteLikes})
      }
    },
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

export const {
  deleteQuoteFromRedux,
  addLikedQuoteToRedux,
  removeLikedQuoteFromRedux,
  addQuoteToRedux,
} = memesSlice.actions;

export default memesSlice.reducer;
