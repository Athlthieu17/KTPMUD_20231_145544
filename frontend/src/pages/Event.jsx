import React from "react";
import "../assets/styles/event.css";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useSelector } from "react-redux";
import ModalDetailEvent from "../components/modals/ModalDetailEvent";
import ModalCreateEvent from "../components/modals/ModalCreateEvent";

function Event() {
  const [item, setItem] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const events = useSelector((state) => state.event.evens);

  console.log(item);

  const handleOpenDetailEvent = (id) => {
    if (id) {
      setIsOpen(true);
      setItem(events.filter((item) => item.id === id)[0]);
    }
  };

  return (
    <div className="event-container">
      <div className="event-filter flex">
        <Button
          title={"Thêm mới"}
          styles={{ color: "#fff", fontWeight: "bold", marginRight: "10px" }}
          color={"blue"}
          type={"button"}
          onClick={() => setIsOpenCreate(true)}
        />
        <Button
          title={"Ngày diễn ra ↓"}
          styles={{ color: "#fff", fontWeight: "bold" }}
          color={"blue"}
          type={"button"}
          onClick={() => console.log("ok")}
        />
      </div>
      <div className="list-event">
        {events?.map((item, index) => {
          return (
            <Card
              id={item.id}
              key={item.id}
              thumbnail={item.thumbnail}
              name={item.name}
              time={`${item.dateStart} - ${item.dateEnd}`}
              onClick={(id) => handleOpenDetailEvent(id)}
            />
          );
        })}

        {isOpen && item && (
          <ModalDetailEvent
            {...item}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
        {isOpenCreate && (
          <ModalCreateEvent isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} />
        )}
      </div>
    </div>
  );
}

export default Event;
