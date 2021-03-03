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
    handleReset();
  }, []);

  function createTable(num) {
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
    const requestOptions = {
      method: "DELETE",
    };
    fetch("/draftapi/clear/", requestOptions)
      .then((response) => {
        if (response.ok) {
          alert("Draft reset successful");
        } else {
          alert("Error !");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function scrollToBot() {
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
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
        id="reset-btn"
      >
        Reset
      </Button>
      <Button
        color="default"
        onClick={scrollToBot}
        variant="contained"
        id="draft-table-btn"
      >
        Go to Draft Table
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
            title="Draft Table"
            numPlayers={NumOfPlayer}
          />
        )}
      </div>
    </>
  );
}
