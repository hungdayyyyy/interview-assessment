import React, { useState } from "react";
// (Problem 2) Import useState so we can manage state inside the component

function UserList({ users }) {
  // (Problem 1)  Initialize state with null instead of leaving it undefined
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div
          key={user.id} // (Problem 3) Add a unique key for each mapped element
          onClick={() => setSelectedUser(user)} // (Problem 4) Store the full user object instead of just the id
          style={{ cursor: "pointer" }}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}

      {selectedUser && (
        <div>
          <h3>Selected: {selectedUser.name}</h3>
        </div>
      )}
    </div>
  );
}

export default UserList;
