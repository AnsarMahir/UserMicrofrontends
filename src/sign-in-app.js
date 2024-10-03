import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return (
      <div>
        <h1>Error in Sign In app</h1>
        <p>{err.message}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
