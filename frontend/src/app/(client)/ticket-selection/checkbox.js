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
  const [message, setMessage] = useState("Please select any 3 numbers");

//__________________________________________________API_ENV__________________________________________//


  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

 //__________________________________________________________________________________________________// 

  const handleCheckboxClick = (id) => {
    let updatedCheckedIds;

    if (state.checkedIds.includes(id)) {
      updatedCheckedIds = state.checkedIds.filter((checkedId) => checkedId !== id);
    } else {
      updatedCheckedIds = [...state.checkedIds, id];
    }

    setSelectedNumbers(updatedCheckedIds); // Update selected numbers regardless of count

    if (updatedCheckedIds.length >= 3) {
      validateNumberCombination(updatedCheckedIds); // Validate the selected numbers
      // setContinueVisible(true); // Set the button visible if 3 or more checkboxes are selected

    } else {
      setMessage("Please select any 3 numbers");
      setContinueVisible(false);
    }

    dispatch({ id });
  };


  //______________________________________________SLOT_VALIDATION_____________________________________________________//

  const validateNumberCombination = async (selectedNumbers) => {
    const combinedNumbers = selectedNumbers.join('');

    const requestBody = {
      numbers: combinedNumbers
    };
    try {
      // Make a POST request to the backend route that handles validation
      const response = await fetch(`${apiUrl}/admin/slot/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();

        // Check if the combination exists
        if (data.exists) {
          // Combination exists, hide the button
          console.log('Combination exists');
          setMessage("Oops! This combination already exists");
          setContinueVisible(false);
        } else {
          // Combination does not exist, show the button
          console.log('Combination does not exist');
          setMessage("Valid combination. Proceed!");
          setContinueVisible(true);
        }
      } else {
        // If the response is not successful, throw an error
        throw new Error('Error validating number combination');
      }
    } catch (error) {
      // If an error occurs during the request, log the error
      console.error('Error validating number combination:', error);
      // Show your error message to the user
    }
  };



  //__________________________________________SLOT_SAVING_FUNCTION_____________________________________________________//

  const sendSelectedNumbersToBackend = (numbers) => {
    // Combine numbers into a string
    const combinedNumbers = numbers.join('');

    // Wrap the combined numbers in an object with a key named "numbers"
    const requestBody = {
      numbers: combinedNumbers
    };

    // Send a POST request to the backend server
    fetch(`${apiUrl}/admin/slot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
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

  //_____________________________________________________________________________________________________________//

  const handleProceedClick = () => {
    // Handle proceed action here
    console.log("Proceed clicked");
    sendSelectedNumbersToBackend(selectedNumbers);
  };

  //_____________________________________________________________________________________________________________//

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

      <div className="message">{message}</div>
    </div>
  );
};

export default CheckBoxGroup;