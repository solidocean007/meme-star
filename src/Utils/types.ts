export interface MemeType  {
  'imageUrl': string;
  'caption' : string;
}

export interface UsersType {
  'name': string,
  'password': string
}

export interface QuoteType {
  "memeId": string,
  'text': string,
  'userId': string
}

export interface LikedQuotesType {
  'userId': string,
  'likedQuoteId': string,
}

export interface likedMemesType {
  'userId': string,
  'likedMemeId': string
}