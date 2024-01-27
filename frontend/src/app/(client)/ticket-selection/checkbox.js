"use client"; // CheckBoxGroup.js
import React, { useReducer } from "react";
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

  return (
    <div className="slot-box  bg-theme-gray rounded-lg">
      <div className="slot-group">
        {data.map(({ id, label }) => (
          <div className="slot" key={id}>
            <input
              onClick={() => dispatch({ id })}
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
    </div>
  );
};

export default CheckBoxGroup;
