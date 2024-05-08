import React from "react";

export const metadata = {
  title: "Buyyinn",
  description: "Buyyinn - Buy n Win",
};

export default function Login({ children }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-gray-100 ">{children}</div>
    </div>
  );
}
