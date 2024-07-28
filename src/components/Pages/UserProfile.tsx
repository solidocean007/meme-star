import { Box, Container, Typography, Tabs, Tab, Avatar, styled } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router";
import { ChangeType } from "../../Utils/types";
import ProfileQuotes from "../ProfileQuotes";
import ProfileMemes from "../ProfileMemes";
import { TabsSerrated } from "./TabsSerrated";

const UserProfile = () => {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const [value, setValue] = React.useState(0);

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
    <Container sx={{ width: "100%", p: 2 }}>
      <Box display="flex" alignItems="center">
        <Avatar alt={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} />
        <Box ml={2}>
          <Typography variant="h4">
            {loggedInUser?.firstName} {loggedInUser?.lastName}
          </Typography>
        </Box>
      </Box>

      <Box mt={2} sx={{ width: "100%", p: 2 }}>
        
      <TabsSerrated value={value} onChange={handleChange} />
        {value === 0 ? (
          <ProfileMemes setPendingChanges={setPendingChanges} />
        ) : (
          <ProfileQuotes
            pendingChanges={pendingChanges}
            setPendingChanges={setPendingChanges}
          />
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
