import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css";
import Card from "../../shared/components/UiElements/Card";

const UsersList = props => {
  if (props.users.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users found...</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className='users-list'>
      {props.users.map(user => (
        <UserItem user={user} key={user.id} />
      ))}
    </ul>
  );
};

export default UsersList;
