export interface MemeType  {
  'id': string,
  'imageUrl': string,
  'userId': string
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
  'userId': string
}

export interface LikedQuotesType {
  'id': string;        // Unique identifier for the like
  'userId': string;
  'quoteId': string;
}


export interface LikedMemesType {
  'id': string;        // Unique identifier for the like
  'userId': string;
  'memeId': string;
}
