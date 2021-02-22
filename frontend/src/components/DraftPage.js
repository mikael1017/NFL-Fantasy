import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DraftTable from "./DraftTable";
import Button from "@material-ui/core/Button";
import "./Draft.css";
import { Link, useParams } from "react-router-dom";
import DraftTeam from "./DraftTeam";

export default function DraftPage() {
  const { NumOfPlayer } = useParams();
  const [data, setData] = useState();
  const { currentPick, setPick } = useState(0);
  const [draftList, setDraftList] = useState();
  const [team0, setTeam0] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [team3, setTeam3] = useState();
  const [team4, setTeam4] = useState();
  const [team5, setTeam5] = useState();
  const [team6, setTeam6] = useState();
  const [team7, setTeam7] = useState();
  var teamData = {};

  useEffect(() => {
    fetch("../api/player")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    getPlayers(0);
  }, []);

  async function getPlayers(teamNumber, setMethod) {
    return fetch(`/draftapi/draft/${teamNumber}/`).then((response) => {
      return response.json().then((data) => {
        setMethod(data);
      });
    });
  }

  function teamToSetMethod(team) {
    if (team == 0) {
      return setTeam0;
    }
    if (team == 1) {
      return setTeam1;
    }
    if (team == 2) {
      return setTeam2;
    }
    if (team == 3) {
      return setTeam3;
    }
    if (team == 4) {
      return setTeam4;
    }
    if (team == 5) {
      return setTeam5;
    }
    if (team == 6) {
      return setTeam6;
    }
    return setTeam7;
  }

  function numToTeam(team) {
    if (team == 0) {
      return team0;
    }
    if (team == 1) {
      return team1;
    }
    if (team == 2) {
      return team2;
    }
    if (team == 3) {
      return team3;
    }
    if (team == 4) {
      return team4;
    }
    if (team == 5) {
      return team5;
    }
    if (team == 6) {
      return team6;
    }
    return team7;
  }

  function createTable(num) {
    const items = [];
    for (let i = 0; i < num; i++) {
      getPlayers(i, teamToSetMethod(i));
      numToTeam(i) &&
        items.push(
          <Grid item xs={3} spacing={3}>
            <DraftTeam data={team0} teamNumber={i} id={i}>
              Drafted Team {i}
            </DraftTeam>
          </Grid>
        );
    }
    return items;
  }
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
        {createTable(NumOfPlayer)}
      </Grid>
      <div item xs={12} align="center">
        <Typography className="title">Welcome to the Mock Draft!</Typography>
      </div>
      {/* <div className="table-div">
        {data && (
          <DraftTable
            data={data}
            title="Player List"
            numPlayers={NumOfPlayer}
          />
        )}
      </div> */}
    </>
  );
}
