import { Box, Typography, List, ListItem, ListItemText, Card, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle } from '@mui/icons-material';

// Styled component for the How to Play container
const HowToPlayContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: 'auto',
  textAlign: 'left',
  maxWidth: '600px',
  boxShadow: theme.shadows[5],
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
}));

const HowToPlay = () => {
  return (
    <HowToPlayContainer>
      <Typography variant="h4" color="primary" gutterBottom>
        How to Play
      </Typography>
      <List>
        <StyledListItem>
          <ListItemIcon>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="1. Create a Meme: Click on the 'Create Meme' button to upload an image and add a funny quote."
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemIcon>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="2. Like Memes Quotes: Browse the memes and their quotes and click the like button to vote for your favorites."
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemIcon>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="3. Add Quotes: Add your own funny quotes to existing memes to make them even better."
          />
        </StyledListItem>
        <StyledListItem>
          <Box sx={{ pl: 4 }}>
            <List>
              <ListItem>
                <ListItemText secondary="- For every quote you submit you earn 1 point." />
              </ListItem>
            </List>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <ListItemIcon>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="4. Gain more points by creating popular memes and adding popular quotes. The more likes your quotes get, the more points you earn!"
          />
        </StyledListItem>
        <StyledListItem>
          <Box sx={{ pl: 4 }}>
            <List>
              <ListItem>
                <ListItemText secondary="- Each time someone likes one of your quotes you earn 5 points." />
              </ListItem>
              <ListItem>
                <ListItemText secondary="- If your quote has the most likes for a meme you earn 100 points!" />
              </ListItem>
            </List>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <ListItemIcon>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="5. Leaderboard: Check out the leaderboard to see who has the most points and is leading the game."
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemIcon>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="6. Have Fun: Keep it friendly and fun. Respect others and avoid offensive content."
          />
        </StyledListItem>
      </List>
    </HowToPlayContainer>
  );
};

export default HowToPlay;
