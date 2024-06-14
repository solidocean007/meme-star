import React from "react";
import { Slide, Snackbar, Alert, SlideProps } from "@mui/material";

// Define the slide transition function
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

// Define the SnackBarSlide component
const SnackBarSlide = ({ message, type }: { message: string; type: "success" | "error" }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(true);
  }, [message]);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarSlide;
