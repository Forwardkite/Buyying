import React, { useState, useReducer } from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CloseIcon from "@mui/icons-material/Close";

const CheckBoxGroup = ({ data, handleButtonVisibility }) => {
  //__________________________________________________API_ENV__________________________________________//

  //_____________________________________________________________________________________________________________//

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
      <div className="message">{message}</div>
    </div>
  );
};

export default CheckBoxGroup;
