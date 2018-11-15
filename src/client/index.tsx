import * as React from "react";
import { Container, Menu } from "semantic-ui-react";
import { render } from "react-dom";
const logo = require("./logo.svg");

import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <div>
      <Menu attached="top" inverted={true}>
        <Menu.Item>
          <img src={logo} style={{ width: 85, height: 24 }} />
        </Menu.Item>
      </Menu>
      <Container>
        <a href="/auth/google">Login with Google</a>
      </Container>
    </div>
  );
};

render(<App />, document.getElementById("root"));
