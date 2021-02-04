import React, { useState, Component, useEffect } from "react";
import "./PersonalList.css";
import DataTable from "./DataTable";

export default function PersonalList({ data, title }) {
  return (
    <>
      <DataTable data={data} title={title} />
    </>
  );
}
