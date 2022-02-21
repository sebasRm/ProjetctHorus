import React from "react";
import { Provider } from "react-redux";

import { Approuter } from "./router/Approuter";
import { store } from "./store/store";

export const HorusApp = () => {
  return (
    <Provider store={store}>
      <Approuter />
    </Provider>
  );
};
