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
  }, []);

  function getPlayers(teamNumber, setMethod) {
    return fetch(`/draftapi/draft/${teamNumber}/`).then((response) => {
      return response.json().then((data) => {
        teamToSetMethod(teamNumber, data);
      });
    });
  }

  function teamToSetMethod(team, data) {
    if (team == 0) {
      return setTeam0(data);
    }
    if (team == 1) {
      return setTeam1(data);
    }
    if (team == 2) {
      return setTeam2(data);
    }
    if (team == 3) {
      return setTeam3(data);
    }
    if (team == 4) {
      return setTeam4(data);
    }
    if (team == 5) {
      return setTeam5(data);
    }
    if (team == 6) {
      return setTeam6(data);
    }
    return setTeam7(data);
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
      console.log(i);
      getPlayers(i);
      let tempData = numToTeam(i);
      tempData &&
        items.push(
          <Grid className="draft-team" item xs={3} sm={3} spacing={3}>
            <DraftTeam data={tempData} teamNumber={i} id={i}>
              Drafted Team {i}
            </DraftTeam>
          </Grid>
        );
    }
    return items;
  }
  return (
    <>
      <Grid className="buttons" container spacing={3}>
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
