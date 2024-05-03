import React from "react";
import CheckboxGroup from "./checkboxgroup"; // Adjust the path as needed

const TicketSelection = () => {
  return (
    <div>
      <h1>Checkbox Groups</h1>
      <CheckboxGroup numGroups={10} /> {/* Customize the number of groups */}
    </div>
  );
};

export default TicketSelection;
