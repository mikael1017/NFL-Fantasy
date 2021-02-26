import React, { useEffect, useRef, useMemo, useState } from "react";
import "./table.css";
import DraftTeamTable from "./DraftTeamTable";

import Grid from "@material-ui/core/Grid";
export default function DraftTeam({ teamNumber }) {
  const [data, setData] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayers(teamNumber);
    }, 3000);
  }, []);

  function getPlayers(teamNumber) {
    return fetch(`/draftapi/draft/${teamNumber}/`).then((response) => {
      return response.json().then((data) => {
        setData(data);
      });
    });
  }

  return (
    <Grid className="draft-team" item xs>
      {data && <DraftTeamTable data={data} teamNumber={teamNumber} />}
    </Grid>
  );
}
