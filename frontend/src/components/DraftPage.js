import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PersonalList from "./PersonalList";
import Button from "@material-ui/core/Button";

import { Link, useParams } from "react-router-dom";

function createTable(num) {
  const items = [];
  for (let i = 0; i < num; i++) {
    items.push(<div>Hello</div>);
  }
  return items;
}

export default function DraftPage() {
  const { NumOfPlayer } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch("../api/player")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
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
      {createTable(NumOfPlayer)}

      {/* <Grid item xs={12} align="center"> */}
      <div className="table-div">
        {data && <PersonalList data={data} title="Player List" />}
      </div>
      {/* </Grid> */}
    </Grid>
  );
}
