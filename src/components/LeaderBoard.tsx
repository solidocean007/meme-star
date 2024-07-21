import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import calculateLeaderBoard from '../helperFunctions/calculateLeaderBoard';

// Styled component for the leaderBoard container
const LeaderBoardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  margin: 'auto',
  textAlign: 'center',
  height: '100%', // Ensure full height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
}));

// Styled component for the leaderBoard item
const LeaderBoardItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const LeaderBoard = () => {
  const { entities: memes, loading, error } = useSelector((state: RootState) => state.memes);

  const { userPoints, userDetails } = calculateLeaderBoard(memes);

  const sortedUsers = Object.keys(userPoints)
    .map(userId => ({
      userId,
      points: userPoints[userId],
      user: userDetails[userId],
    }))
    .sort((a, b) => b.points - a.points);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <LeaderBoardContainer>
      <Typography variant="h5" color="white" gutterBottom>
        Leader board
      </Typography>
      <List>
        {sortedUsers.map((entry, index) => (
          <LeaderBoardItem key={entry.userId}>
            <ListItemText
              primary={`${index + 1}. ${entry.user.firstName} ${entry.user.lastName}`}
              primaryTypographyProps={{ color: 'white' }}
            />
            <Typography variant="h6" color="green">
              {entry.points}
            </Typography>
          </LeaderBoardItem>
        ))}
      </List>
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;

