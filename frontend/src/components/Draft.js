import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  useState,
} from "@material-ui/core";
import "./Draft.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
export default function Draft() {
  const [numOfPlayer, setNumOfPlayer] = useState();

  function handleButtonClick(number) {
    setNumOfPlayer(number);
  }
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
                onclick={handleButtonClick(8)}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value="10"
                label="10"
                onclick={handleButtonClick(10)}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value="12"
                label="12"
                onclick={handleButtonClick(12)}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            to="/mockdraft"
            component={Link}
          >
            Start Draft!
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
