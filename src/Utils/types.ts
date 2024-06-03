export interface MemeType  {
  'id': string,
  'imageUrl': string,
  'createdBy': UsersType,
  'allQuotes'?: QuoteType[],
}

export interface UsersType {
  'id': string,
  'name': string,
  'password': string
}

export interface QuoteType {
  'id': string,
  "memeId": string,
  'text': string,
  'userId': string,
  'userNameQuote': string,
  'quoteLikedBy': string[],
}

export interface LikedQuotesType {
  'id': string;     
  'userId': string;
  'quoteId': string;
}


export interface LikedMemesType {
  'id': string;        // Unique identifier for the like
  'userId': string;
  'memeId': string;
}
