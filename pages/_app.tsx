import "@Styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@Public/assets/styles/main.scss";

import { Context, createWrapper } from "next-redux-wrapper";
import { Store, createStore } from "redux";

import { Provider } from "react-redux";
import initializeStore from "@Redux/store";

const initialState = {};

const store = initializeStore(initialState);

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

const makeStore = (context: Context) => createStore(initializeStore);

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);
