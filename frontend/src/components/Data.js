import React, { useState, useEffect } from "react";
import PersonalList from "./PersonalList";
import "./Data.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
export default function Data() {
  const [QBs, setQBs] = useState();
  const [WRs, setWRs] = useState();
  const [TEs, setTEs] = useState();
  const [RBs, setRBs] = useState();

  function fetchByPos(pos, setMethod) {
    fetch("api/player/pos/" + pos)
      .then((response) => response.json())
      .then((data) => {
        setMethod(data);
      });
  }

  useEffect(() => {
    fetchByPos("qb", setQBs);
    fetchByPos("rb", setRBs);
    fetchByPos("te", setTEs);
    fetchByPos("wr", setWRs);
  }, []);

  return (
    <>
      <Grid item xs={12} align="left">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Home
        </Button>
      </Grid>
      <div>
        <div className="table-div">
          {QBs && <PersonalList data={QBs} title="Quarterback" />}
        </div>
        {/* <div className="table-div">
          {RBs && <PersonalList data={RBs} title="Runningback" />}
        </div>
        <div className="table-div">
          {WRs && <PersonalList data={WRs} title="Wide Receiver" />}
        </div>
        <div className="table-div">
          {TEs && <PersonalList data={TEs} title="Tight End" />}
        </div> */}
      </div>
    </>
  );
}
