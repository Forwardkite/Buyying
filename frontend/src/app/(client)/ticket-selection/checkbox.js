import React, { useState, useReducer } from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CloseIcon from "@mui/icons-material/Close";

const reducer = (state, action) => {
  if (state.checkedIds.includes(action.id)) {
    return {
      ...state,
      checkedIds: state.checkedIds.filter((id) => id !== action.id),
    };
  }

  if (state.checkedIds.length >= 3) {
    console.log("Max 3 extras allowed.");
    return state;
  }

  return {
    ...state,
    checkedIds: [...state.checkedIds, action.id],
  };
};

const CheckBoxGroup = ({ data }) => {
  const initialState = { checkedIds: [] };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [continueVisible, setContinueVisible] = useState(false);

  const handleCheckboxClick = (id) => {
    let updatedCheckedIds;
  
    if (state.checkedIds.includes(id)) {
      updatedCheckedIds = state.checkedIds.filter((checkedId) => checkedId !== id);
    } else {
      updatedCheckedIds = [...state.checkedIds, id];
    }
  
    setSelectedNumbers(updatedCheckedIds); // Update selected numbers regardless of count
  
    if (updatedCheckedIds.length >= 3) {
      setContinueVisible(true); // Set the button visible if 3 or more checkboxes are selected
      sendSelectedNumbersToBackend(updatedCheckedIds); // Send the selected numbers to the backend
    } else {
      setContinueVisible(false);
    }
  
    dispatch({ id });
  };
  
  
  const sendSelectedNumbersToBackend = (numbers) => {
    fetch('http://localhost:5000/admin/slot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numbers }) // Wrap numbers in an object
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Response from backend:', data);
    })
    .catch(error => {
      console.error('Error sending data to the backend:', error);
    });
  };

  const handleProceedClick = () => {
    // Handle proceed action here
    console.log("Proceed clicked");
  };

  return (
    <div className="slot-box  bg-theme-gray rounded-lg">
      <div className="slot-group">
        {data.map(({ id, label }) => (
          <div className="slot" key={id}>
            <input
              onClick={() => handleCheckboxClick(id)}
              checked={state.checkedIds.includes(id)}
              type="checkbox"
              id={id}
              readOnly
            />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
      </div>
      <div className="actions">
        <input type="checkbox" name="" id="close" readOnly />
        <label className="action" htmlFor="close">
          <CloseIcon />
        </label>

        <input type="checkbox" name="" id="shuffle" readOnly />
        <label className="action" htmlFor="shuffle">
          <ShuffleIcon />
        </label>
      </div>
      {continueVisible && (
        <button className="btn-theme-dual font-bold text-white w-full rounded-full py-4 mt-12" onClick={handleProceedClick}>
        Continue
        </button>
      )}
    </div>
  );
};

export default CheckBoxGroup;