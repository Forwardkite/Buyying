"use client";
import React, { useState } from "react";

const CheckboxGroup = ({ numGroups }) => {
  const [checkedStates, setCheckedStates] = useState(
    Array.from({ length: numGroups }, () => Array(49).fill(false))
  );

  const handleCheckboxChange = (groupIndex, checkboxIndex) => {
    const updatedCheckedStates = checkedStates.map((group, i) =>
      i === groupIndex
        ? group.map((item, j) => (j === checkboxIndex ? !item : item))
        : group
    );

    // setCheckedStates(updatedCheckedStates);
    const selectedCount = updatedCheckedStates.filter((item) => item).length;
    if (selectedCount <= 2) {
      setCheckedStates(updatedCheckedStates);
    }
  };

  return (
    <div>
      {checkedStates.map((group, groupIndex) => (
        <div key={groupIndex} className="border">
          {group.map((isChecked, checkboxIndex) => (
            <label key={checkboxIndex}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(groupIndex, checkboxIndex)}
              />
              Group {groupIndex + 1} Checkbox {checkboxIndex + 1}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
