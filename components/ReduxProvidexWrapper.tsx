import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function ReduxProvidexWrapper(props: any) {
  return <Provider store={store}>{props.children}</Provider>;
}
