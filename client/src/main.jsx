import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer autoClose={1000} newestOnTop={true} closeOnClick />
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </Provider>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import CustomUserContext from "./userContext";
// import { BrowserRouter } from "react-router-dom";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <>
//     <CustomUserContext states>
//       <BrowserRouter>
//         <App usehere />
//       </BrowserRouter>
//     </CustomUserContext>
//   </>
// );
