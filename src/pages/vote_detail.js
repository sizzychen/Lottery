import './vote_detail.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function VoteDetail({ vote, options }) {

  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    // Find the selected option and increment its result
    const selectedOption = options.find((option) => option.id === selectedOptionId);
    if (selectedOption) {
      selectedOption.result += 1;
    }

    // Navigate to the vote result page
    navigate(`/vote-result/${vote.id}`);
    
  };

  return (
    <div className="vote_body">
      <div className="container">
        <h1 className="question">{vote.title}</h1>

        <form action="vote-result" method="post" onSubmit={handleSubmit}>
          {options.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                className="options"
                name="option_id"
                value={option.id}
                required
                onChange={() => setSelectedOptionId(option.id)}
              />
              <span>{option.title}</span>
            </div>
          ))}
          <button type="submit">submit</button>
        </form>
      </div>
    </div>

    
    
  );
}

export default VoteDetail