import React from 'react';
import { Link } from 'react-router-dom';

const VoteResult = ({ vote, options }) => {
  const totalVotes = options.reduce((sum, option) => sum + option.result, 0);
  const percentage = options.map((option) => (option.result / totalVotes) * 100);

  return (
    <div className="container">
      <h1 className="align-center">{vote.title}</h1>

      <table className="table align-center">
        <thead>
          <tr>
            <th>Option</th>
            <th>Votes</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => (
            <tr key={option.id}>
              <td>{option.title}</td>
              <td>{option.result}</td>
              <td>{percentage[index].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>总票数</td>
            <td>{totalVotes}</td>
            <td>100</td>
          </tr>
        </tfoot>
      </table>
      <br />
      <Link className="btn" to="/vote/1">
        Back to Vote
      </Link>
    </div>
  );
};

export default VoteResult;
