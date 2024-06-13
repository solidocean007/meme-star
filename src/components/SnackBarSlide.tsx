import { SlideProps, Snackbar } from "@mui/material"

function SlideTransition(props: SlideProps){
  return <Slide {...props} direction="down"/>;
}

const handleClose = () => {
  setState({
    ...state,
    open: false,
  });
};

export const SnackBarSlide = (message) => {
  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >,
    ) =>
    () => {
      setState({
        open: true,
        Transition,
      });
    };

  return {
    <Snackbar
      open={state.open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}}
      message={message}
      key={state.Transition.name}
      autoHideDuration={1200}
    />
  }
}