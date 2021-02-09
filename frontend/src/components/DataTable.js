import React, { useMemo, useEffect, useState } from "react";

import "./DataTable.css";

import PrintTable from "./PrintTable";
export default function DataTable({ data, title }) {
  const [savedData, setSavedData] = useState();

  useEffect(() => {
    localStorage.getItem(title) == null
      ? setSavedData(data)
      : setSavedData(JSON.parse(localStorage.getItem(title)));
  }, []);

  return (
    <div>
      {savedData && (
        <PrintTable originalData={data} data={savedData} title={title} />
      )}
    </div>
  );
}
