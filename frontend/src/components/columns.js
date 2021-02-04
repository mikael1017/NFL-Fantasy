import { ColumnFilter } from "./ColumnFilter.js";

export const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    sticky: "left",
    Filter: ColumnFilter,
  },
  {
    Header: "Overall Rank",
    accessor: "id",
    Filter: ColumnFilter,
  },
  {
    Header: "Position",
    accessor: "position",
    Filter: ColumnFilter,
  },
  {
    Header: "Age",
    accessor: "age",
    Filter: ColumnFilter,
  },
  {
    Header: "PosRank",
    accessor: "posRank",
    Filter: ColumnFilter,
  },
  {
    Header: "Team",
    accessor: "team",
    Filter: ColumnFilter,
  },
  {
    Header: "ThrowAtt",
    accessor: "throwAtt",
    Filter: ColumnFilter,
  },
  {
    Header: "ThorwYd",
    accessor: "throwYd",
    Filter: ColumnFilter,
  },
  {
    Header: "ThrowTD",
    accessor: "throwTD",
    Filter: ColumnFilter,
  },
  {
    Header: "Interception",
    accessor: "interception",
    Filter: ColumnFilter,
  },
  {
    Header: "RushAtt",
    accessor: "rushAtt",
    Filter: ColumnFilter,
  },
  {
    Header: "RushYd",
    accessor: "rushYd",
    Filter: ColumnFilter,
  },
  {
    Header: "RushTD",
    accessor: "rushTD",
    Filter: ColumnFilter,
  },
  {
    Header: "RushAvgYd",
    accessor: "rushAvgYd",
    Filter: ColumnFilter,
  },
  {
    Header: "Target",
    accessor: "target",
    Filter: ColumnFilter,
  },
  {
    Header: "Rec",
    accessor: "rec",
    Filter: ColumnFilter,
  },
  {
    Header: "RecYd",
    accessor: "recYd",
    Filter: ColumnFilter,
  },
  {
    Header: "RecAvgYd",
    accessor: "recAvgYd",
    Filter: ColumnFilter,
  },
  {
    Header: "RecTD",
    accessor: "recTD",
    Filter: ColumnFilter,
  },
  {
    Header: "TotalTD",
    accessor: "totalTD",
    Filter: ColumnFilter,
  },
  {
    Header: "Fumble",
    accessor: "fumble",
    Filter: ColumnFilter,
  },
  {
    Header: "Fpts",
    accessor: "fpts",
    Filter: ColumnFilter,
  },
  {
    Header: "PPR",
    accessor: "ppr",
    Filter: ColumnFilter,
  },
  {
    Header: "TotalGames",
    accessor: "totGames",
    Filter: ColumnFilter,
  },
];
