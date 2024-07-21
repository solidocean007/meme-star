// Root.tsx
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
