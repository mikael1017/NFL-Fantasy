import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DraftTable from "./DraftTable";
import Button from "@material-ui/core/Button";
import "./Draft.css";
import { Link, useParams } from "react-router-dom";

function createTable(num) {
  const items = [];
  for (let i = 0; i < num; i++) {
    items.push(<div id={i}>Drafted div {i}</div>);
  }
  return items;
}

export default function DraftPage() {
  const { NumOfPlayer } = useParams();
  const [data, setData] = useState();
  const { currentPick, setPick } = useState(0);

  function nextPick() {
    if (currentPick == NumOfPlayer - 1) {
      setPick(0);
    } else {
      setPick(currentPick + 1);
    }
  }

  useEffect(() => {
    fetch("../api/player")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <>
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
      </Grid>
      <div item xs={12} align="center">
        <Typography className="title">Welcome to the Mock Draft!</Typography>
      </div>
      {createTable(NumOfPlayer)}
      <div className="table-div">
        {data && (
          <DraftTable
            data={data}
            title="Player List"
            numPlayers={NumOfPlayer}
          />
        )}
      </div>
    </>
  );
}
