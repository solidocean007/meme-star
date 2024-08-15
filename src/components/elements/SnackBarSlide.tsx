// SnackbarComponent.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';
import { RootState } from '../../Redux/store';
import { hideSnackbar } from '../../Redux/snackBarSlice';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const SnackBarSlide: React.FC = () => {
  const dispatch = useDispatch();
  const { message, type, open } = useSelector((state: RootState) => state.snackbar);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

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
