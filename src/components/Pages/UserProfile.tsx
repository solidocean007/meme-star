import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router";
import { ChangeType, MemeType, ProcessedMemeType, QuoteType } from "../../Utils/types";
import ProfileQuotes from "../ProfileQuotes";
import ProfileMemes from "../ProfileMemes";

const UserProfile = () => {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const [value, setValue] = React.useState(1);

  const [pendingChanges, setPendingChanges] = useState<ChangeType[]>([]);
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate("/login-sign-up");
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 


  // const profileCardMediaStyle = {
  //   position: "relative",
  //   height: { md: 250, lg: 350 },
  //   width: "100%",
  // };

  // const profileCaptionStyle = {
  //   flexGrow: 1,
  //   mr: 1,
  //   fontSize: { md: 15, lg: 25 },
  // };

  // const profileUserNameStyle = {
  //   fontSize: { md: 15, lg: 20 },
  // };

  return (
    <Container maxWidth={false}>
      <Box display="flex" alignItems="center">
        <Avatar alt={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} />
        <Box ml={2}>
          <Typography variant="h4">
            {loggedInUser?.firstName} {loggedInUser?.lastName}
          </Typography>
        </Box>
      </Box>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Memes" />
        <Tab label="Quotes" />
      </Tabs>
      <Box mt={2} sx={{ width: "100%", p: 2 }}>
        {value === 0 ? (
          <ProfileMemes setPendingChanges={setPendingChanges} />
        ) : (
          <ProfileQuotes pendingChanges={pendingChanges} setPendingChanges={setPendingChanges} />
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
