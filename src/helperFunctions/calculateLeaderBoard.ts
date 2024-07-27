import { ProcessedMemeType } from "../Utils/types";

// Define types for user points and user details
type UserPoints = { [userId: string]: number };
type UserDetails = { [userId: string]: { firstName: string; lastName: string } };

const calculateLeaderBoard = (memes: ProcessedMemeType[]): { userPoints: UserPoints; userDetails: UserDetails } => {
  const userPoints: UserPoints = {};
  const userDetails: UserDetails = {};

  memes.forEach((meme) => {
    let highestLikes = 0;
    const usersWithHighestLikes = new Set<string>();

    meme.allQuotes?.forEach((quote) => {
      const userId = quote.userId;

      // Initialize user points and details if not already
      if (!userPoints[userId]) {
        userPoints[userId] = 0;
        userDetails[userId] = {
          firstName: quote.userNameQuote.split(' ')[0], // Assuming userNameQuote contains full name
          lastName: quote.userNameQuote.split(' ')[1] || '',
        };
      }

      // Add points for the quote
      userPoints[userId] += 1;

      // Add points for likes
      userPoints[userId] += quote.quoteLikes.length * 5;

      // Determine users with the highest likes for their quotes within this meme
      if (quote.quoteLikes.length > highestLikes) {
        highestLikes = quote.quoteLikes.length;
        usersWithHighestLikes.clear();
        usersWithHighestLikes.add(userId);
      } else if (quote.quoteLikes.length === highestLikes) {
        usersWithHighestLikes.add(userId);
      }
    });

    // Add bonus points for users with the highest likes on their quotes within this meme
    usersWithHighestLikes.forEach(userId => {
      userPoints[userId] += 100;
    });
  });

  return { userPoints, userDetails };
};

export default calculateLeaderBoard;

