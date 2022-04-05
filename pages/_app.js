import Layout from "../components/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer pauseOnHover={false} autoClose={3000} />
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
