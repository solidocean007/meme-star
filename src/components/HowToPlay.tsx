import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  CheckCircle,
  Create,
  ThumbUp,
  Leaderboard,
  SentimentSatisfied,
  FormatQuote,
} from "@mui/icons-material";

// Styled component for the How to Play container
const HowToPlayContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: "auto",
  textAlign: "center",
  maxWidth: "800px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Custom shadow directly applied
}));

// Styled component for each step card
const StepCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Custom shadow directly applied
}));

const HowToPlay = ({ open , onClose } : { open : boolean , onClose : () => void } ) => {
  const steps = [
    {
      icon: <Create color="primary" />,
      title: "Create a Meme",
      description:
        "Click on the 'Create Meme' button to upload an image and add a funny quote.",
    },
    {
      icon: <ThumbUp color="primary" />,
      title: "Like Meme Quotes",
      description:
        "Browse the memes and their quotes and click the like button to vote for your favorites.",
    },
    {
      icon: <FormatQuote color="primary" />,
      title: "Add Quotes",
      description:
        "Add your own funny quotes to existing memes to make them even better.",
      subPoints: ["For every quote you submit you earn 1 point."],
    },
    {
      icon: <Leaderboard color="primary" />,
      title: "Gain More Points",
      description: "The more likes your quotes get, the more points you earn!",
      subPoints: [
        "Each time someone likes one of your quotes you earn 5 points.",
        "If your quote has the most likes for a meme you earn 100 points!",
      ],
    },
    {
      icon: <CheckCircle color="primary" />,
      title: "Leaderboard",
      description:
        "Check out the leaderboard to see who has the most points and is leading the game.",
    },
    {
      icon: <SentimentSatisfied color="primary" />,
      title: "Have Fun",
      description:
        "Keep it friendly and fun. Respect others and avoid offensive content.",
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="how-to-play-dialog-title"
    >
      <DialogTitle id="how-to-play-dialog-title">How to Play</DialogTitle>
      <DialogContent dividers>
        <HowToPlayContainer>
          <Grid container spacing={2}>
            {steps.map((step, index) => (
              <Grid item xs={12} key={index}>
                <StepCard>
                  <CardHeader
                    avatar={step.icon}
                    title={
                      <Typography variant="h6" color="textPrimary">
                        {step.title}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">
                      {step.description}
                    </Typography>
                    {step.subPoints && (
                      <Box sx={{ mt: 1 }}>
                        {step.subPoints.map((subPoint, idx) => (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            key={idx}
                          >
                            - {subPoint}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </StepCard>
              </Grid>
            ))}
          </Grid>
        </HowToPlayContainer>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default HowToPlay;

