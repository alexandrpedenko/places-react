import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UiElements/Avatar";
import Card from "../../shared/components/UiElements/Card";
import "./UserItem.css";

const UserItem = (props) => {
  const { image, id, name, places } = props.user;

  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${id}/places`}>
          <div className='user-item__image'>
            <Avatar image={`http://localhost:5000/${image}`} alt={name} />
          </div>
          <div className='user-item__info'>
            <h2>{name}</h2>
            <h3>
              {places.length} {places.length === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
