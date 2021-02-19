import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

import DraftPage from "./DraftPage";
import Data from "./Data.js";
import Draft from "./Draft.js";
import "./Homepage.css";
export default class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  renderHomePage() {
    return (
      <>
        <head>
          <base href="/" />
        </head>
        <Grid className="container" spacing={3}>
          <Grid className="child" item xs={12}>
            <Typography className="title" variant="h3" compact="h3">
              NFL Fantasy Helper
            </Typography>
          </Grid>
          <Grid className="child-btn" item xs={12}>
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/draft" component={Link}>
                Mock Draft
              </Button>
              <Button color="default" to="/list" component={Link}>
                Make your own list
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </>
    );
  }
  render() {
    return (
      <Router>
        <Route exact path="/" render={this.renderHomePage} />
        <Route exact path="/draft" component={Draft} />
        <Route path="/list/:people" component={Data} />
        <Route path="/draft/:NumOfPlayer" component={DraftPage} />
      </Router>
    );
  }
}
