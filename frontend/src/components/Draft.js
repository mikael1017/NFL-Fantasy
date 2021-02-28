import React, { useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import "./Draft.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import handleReset from "./DraftPage.js";
import { useHistory } from "react-router-dom";

export default function Draft() {
  const [NumOfPlayer, setNumOfPlayer] = useState(8);

  return (
    <>
      <Grid className="buttons" container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography className="title">Start a mock draft</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl className="radioButton" component="fieldset">
            <FormLabel component="legend">Choose number of Players</FormLabel>
            <RadioGroup defaultValue="8" aria-label="numOfPlayer" name="radios">
              <FormControlLabel
                control={<Radio color="primary" />}
                value="8"
                label="8"
                onChange={(e) => {
                  setNumOfPlayer(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value="10"
                label="10"
                onChange={(e) => {
                  setNumOfPlayer(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value="12"
                label="12"
                onChange={(e) => {
                  setNumOfPlayer(e.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            to={`/draft/${NumOfPlayer}`}
            component={Link}
          >
            Start Draft!
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Home
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
