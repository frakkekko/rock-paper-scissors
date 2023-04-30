function leaderboard(state) {
  const getList = (el, key) => {
    return (
      <li key={key} className="list-item">
        <div>{key + 1}</div>
        <div className="username">{el.name}</div>
        <div className="score">{el.score}</div>
      </li>
    );
  };
  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leader Board</h1>
      <div className="list-container-wrapper">
        <div className="list-container">
          {state.leaderboard.games.map(getList)}
        </div>
      </div>
    </div>
  );
}

export default leaderboard;
