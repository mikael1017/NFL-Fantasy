import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DraftTable from "./DraftTable";
import Button from "@material-ui/core/Button";
import "./Draft.css";
import { Link, useParams } from "react-router-dom";
import DraftTeam from "./DraftTeam";
import RestoreIcon from "@material-ui/icons/Restore";

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
  function createTable(num) {
    console.log("making tables");
    const items = [];
    for (let i = 0; i < num; i++) {
      items.push(
        <DraftTeam teamNumber={i} id={i}>
          Drafted Team {i}
        </DraftTeam>
      );
    }
    return items;
  }

  function handleReset() {
    // delte request
    return;
  }

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        to="/draft"
        component={Link}
      >
        Leave
      </Button>

      <Button
        color="primary"
        onClick={handleReset}
        variant="contained"
        to={`/draft/${NumOfPlayer}`}
        component={Link}
        startIcon={<RestoreIcon />}
      >
        Reset
      </Button>
      <div item xs={12} align="center">
        <Typography className="title">Welcome to the Mock Draft!</Typography>
      </div>
      <Grid className="buttons" container spacing={3}>
        {createTable(NumOfPlayer)}
      </Grid>

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
