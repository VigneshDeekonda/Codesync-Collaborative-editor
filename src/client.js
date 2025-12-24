import React from "react";

const Client = ({ username }) => {
  const initials = username.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <div className="client">
      <div className="avatar">
        {initials}
      </div>
      <span className="userName">{username}</span>
    </div>
  );
};

export default Client;
