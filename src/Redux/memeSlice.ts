import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LikedQuotesType, ProcessedMemeType } from "../Utils/types";
import { getAllData } from "../api/getAllData";
import { processMemes } from "../helperFunctions/processedMemes";
import { AppDispatch } from "./store";
import { showSnackbar } from "./snackBarSlice";

interface FetchError {
  message: string;
}

export const fetchMemes = createAsyncThunk<
  ProcessedMemeType[],
  void,
  { rejectValue: FetchError; dispatch: AppDispatch }
>(
  'memes/fetchMemes',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getAllData();
      const processedMemes = processMemes(response);
      console.log(processedMemes)
      return processedMemes;
    } catch (error) {
      const fetchError: FetchError = {
        message: error instanceof Error ? error.message : 'Unknown error',
      };
      dispatch(showSnackbar({ message: fetchError.message, type: 'error' }));
      return rejectWithValue(fetchError);
    }
  }
);

interface MemeState {
  entities: ProcessedMemeType[];
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
      action: PayloadAction<{ memeId: string; likedQuoteId: string }>
    ) => {
      const { memeId, likedQuoteId } = action.payload;
      const meme = state.entities.find((m) => m.id === memeId);
      if (meme) {
        meme.allQuotes?.forEach((quote) => {
          quote.quoteLikes = quote.quoteLikes.filter(
            (like) => like.id !== likedQuoteId
          );
        });
      }
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
        quoteLikes: LikedQuotesType[];
      }>
    ) => {
      const { id, memeId, text, userId, userNameQuote, quoteLikes } = action.payload;
      const memeToAddQuoteTo = state.entities.find((m) => m.id === memeId);
      if (memeToAddQuoteTo) {
        memeToAddQuoteTo.allQuotes?.push({id, text, userId, userNameQuote, memeId, quoteLikes})
      }
    },
    deleteMemeFromRedux: (
      state,
      action: PayloadAction<{ memeId: string }>
    ) => {
      state.entities = state.entities.filter((meme) => meme.id !== action.payload.memeId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(
        fetchMemes.fulfilled,
        (state, action: PayloadAction<ProcessedMemeType[]>) => {
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
  deleteMemeFromRedux,
} = memesSlice.actions;

export default memesSlice.reducer;
