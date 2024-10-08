export interface MemeType {
  'id': string | undefined,
  'imageUrl': string,
  'userId': string
}

export interface ProcessedMemeType  {
  'id': string | undefined,
  'imageUrl': string,
  'createdBy': UsersType,
  'allQuotes'?: QuoteType[],
}

export interface UsersType {
  'id': string,
  'firstName': string,
  'lastName': string,
  'password': string,
  'email': string
}

export type NewUserType = Omit<UsersType, 'id'>;

export interface QuoteType {
  'id': string | undefined,
  "memeId": string | undefined,
  'text': string,
  'userId': string,
  'userNameQuote': string,
  'quoteLikes': LikedQuotesType[],
}

export type ProcessedQuoteType = QuoteType & {
  userNameQuote: string;
  quoteLikes: LikedQuotesType[];
};

export interface LikedQuotesType {
  'id': string | undefined;     
  'userId': string;
  'quoteId': string;
  'memeId': string;
}

export type ChangeType =
  | { type: "addLikedQuote"; data: LikedQuotesType }
  | { type: "addQuote"; data: QuoteType }
  | { type: "deleteQuote"; data: { quoteId: string, memeId: string }; }
  | { type: "deleteLikedQuote"; data: {  likedQuoteId: string, memeId: string, }; }
  | { type: "deleteMeme"; data: {  memeId: string }; }
  | { type: "addMeme"; data: MemeType; };

