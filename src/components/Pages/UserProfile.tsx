import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router";
import { ChangeType } from "../../Utils/types";
import ProfileQuotes from "../ProfileQuotes";
import ProfileMemes from "../ProfileMemes";
import { TabsSerrated } from "../TabsSerrated";

const UserProfile = () => {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const [value, setValue] = React.useState(0);

  const [pendingChanges, setPendingChanges] = useState<ChangeType[]>([]);
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate("/login-sign-up");
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ width: "100%", p: 2 }}>
      <Box display="flex" alignItems="center">
        <Avatar alt={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} />
        <Box ml={2}>
          <Typography variant="h4" color="primary">
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
