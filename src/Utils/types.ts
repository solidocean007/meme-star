export interface MemeType  {
  'id'?: string,
  'imageUrl': string,
  'createdBy': UsersType,
  'allQuotes'?: QuoteType[],
}

export interface UsersType {
  'id'?: string,
  'firstName': string,
  'lastName': string,
  'password': string,
  'email': string
}

export interface NewUserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifyPasswordInput: string;
}

export interface QuoteType {
  'id'?: string | undefined,
  "memeId": string,
  'text': string,
  'userId': string | undefined,
  'userNameQuote': string,
  'quoteLikes': LikedQuotesType[],
}

export interface LikedQuotesType {
  'id'?: string;     
  'userId': string | undefined;
  'quoteId': string | undefined;
}

export interface LikedMemesType {
  'id'?: string;        // Unique identifier for the like
  'userId': string;
  'memeId': string;
}
