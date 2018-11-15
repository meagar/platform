import * as React from "react";
import { render } from "react-dom";

const App = () => {
  return <a href="/auth/google">Hello World!</a>;
};

render(<App />, document.getElementById("root"));
