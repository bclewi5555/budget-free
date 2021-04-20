import React, { useState } from 'react';
import TopAppBar from './TopAppBar';
import Budget from './Budget';

export default function Home() {
  // TODO: Load initial budget state dynamically
  const [budget, setBudget] = useState({
    "id": "b95573be-8f56-4d29-b7a4-fba07c60a859",
    "label": "Home",
    "createdAt": "2021-04-19T17:40:49.847Z",
    "updatedAt": "2021-04-19T17:40:49.847Z"
  })

  return(
    <div>
      <TopAppBar budget={budget} setBudget={setBudget}  />
      <Budget budget={budget} />
    </div>
  );

}