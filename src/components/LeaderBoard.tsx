import { Box, Typography, List, ListItem, ListItemText, useTheme, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import calculateLeaderBoard from '../helperFunctions/calculateLeaderBoard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './leaderboard.css'

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
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.5s, transform 0.5s',
  position: 'relative', // Required for the glare effect
  overflow: 'hidden', // Required for the glare effect
  // color: "white"
}));

const LeaderBoard = () => {
  const { entities: memes, loading, error } = useSelector((state: RootState) => state.memes);
  const theme = useTheme<Theme>();
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
        <TransitionGroup>
          {sortedUsers.map((entry, index) => (
            <CSSTransition
              key={entry.userId}
              timeout={500}
              classNames="leader-item"
            >
              <LeaderBoardItem className={index === 0 ? 'top-player' : ''}>
                <ListItemText
                  primary={`${index + 1}. ${entry.user.firstName} ${entry.user.lastName}`}
                  primaryTypographyProps={{ color: 'white' }}
                />
                <Typography variant="h6" color={theme.palette.primary}>
                  {entry.points}
                </Typography>
                {index === 0 && <div className="glare"></div>}
              </LeaderBoardItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;

