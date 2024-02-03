import React from "react";
import "./card.css";

const Card = ({ id, key, thumbnail, name, time, onClick } )  =>{
  return (
    <div className="card" key={id} onClick={()=> onClick(id)}>
      <img className="card__thumbnail" src={thumbnail} />
      <div className="wrap-content">
        <div className="card__content flex card__content-time">
          <h2 className="card__name">{name}</h2>
          <p className="card__time">{id}</p>
        </div>
        <div className="card__content">
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
