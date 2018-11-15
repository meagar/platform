import * as React from "react";
import { Menu } from "semantic-ui-react";
import { render } from "react-dom";
const logo = require("./logo.svg");

import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <div>
      <Menu fixed="top" inverted={true}>
        <Menu.Item>
          <img src={logo} style={{ width: 85, height: 24 }} />
        </Menu.Item>
      </Menu>
      <a href="/auth/google">Hello World!</a>
    </div>
  );
};

render(<App />, document.getElementById("root"));
