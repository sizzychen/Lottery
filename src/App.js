import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import VoteDetail from './pages/vote_detail'
import VoteResult from './pages/vote_result'
import HomePage from './pages/homepage'


import './App.css'


function App() {

  const vote = {
    title: 'what is your favorite food?',
    total: 0
  };

  const options = [
    { id: 1, title: 'Pizza', result: 0 },
    { id: 2, title: 'Hamberger', result: 0 },
    { id: 3, title: 'Tacos', result: 0 },
  ];

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/vote/:id"
          element={<VoteDetail vote={vote} options={options} />}
        />
        <Route
          path="/vote-result/:id"
          element={<VoteResult vote={vote} options={options} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
