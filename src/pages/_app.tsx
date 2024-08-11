import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/auth";
import "@/styles/index.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
