import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import { Link, useParams } from "react-router-dom";
export default function DraftPage() {
  const { NumOfPlayer } = useParams();
  console.log(NumOfPlayer);
  return (
    <Grid className="buttons" container spacing={1}>
      <Grid item xs={12} align="left">
        <Button
          color="secondary"
          variant="contained"
          to="/draft"
          component={Link}
        >
          Leave
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography className="title">Welcome to the Mock Draft!</Typography>
      </Grid>
    </Grid>
  );
}
