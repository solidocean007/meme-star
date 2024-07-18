export interface MemeType  {
  'id': string,
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
  'id'?: string,
  "memeId": string,
  'text': string,
  'userId': string,
  'userNameQuote': string,
  'quoteLikes': LikedQuotesType[],
}

export interface LikedQuotesType {
  'id'?: string;     
  'userId': string;
  'quoteId': string;
  'memeId': string;
}

export type ChangeType =
  | { type: "addLikedQuote"; data: LikedQuotesType }
  | { type: "addQuote"; data: QuoteType }
  | { type: "deleteQuote"; data: { quoteId: string, memeId: string }; }
  | { type: "deleteLikedQuote"; data: {  likedQuoteId: string, memeId: string, }; };

