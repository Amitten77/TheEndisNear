// import React from 'react'

// const endGame = () => {
//   return (
//     <div>endGame</div>
//   )
// }

// export default endGame;

"use client";

import React, { useState } from 'react';

const leaderboardData = [
  { name: 'Player 1', score: 100 },
  { name: 'Player 2', score: 80 },
  { name: 'Player 3', score: 60 },
];

const endGame = () => {
  const [score, setScore] = useState(0);

  const handleRestart = () => {
    // Replace this with your restart game logic
    // For demonstration purposes, we're just resetting the score to 0
    setScore(0);
  };

  return (
    <div>
      <div className="endgame-container">
        <h1>Game Over!</h1>
        <p>Your Score: {score}</p>
        <a href="game">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-6'>Restart Game</button>
        </a>
        <a href="leaderboard">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Check out Leaderboard</button>
        </a>
      </div>

      {/* <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <ol>
          {leaderboardData.map((entry, index) => (
            <li key={index}>{`${entry.name}: ${entry.score}`}</li>
          ))}
        </ol>
      </div> */}
    </div>
  );
};

export default endGame;