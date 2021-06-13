import { Avatar } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import "./SidebarChat.css";

function SidebarChat({ addNewChat, name, id }) {
  const [roomMessages, setRoomMessages] = useState([]);

  const createChat = function () {
    const roomName = prompt("Please Enter Chat Name");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapShot) => {
          setRoomMessages(snapShot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  const output = !addNewChat ? (
    <Link to={`/${id}`} className="link">
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${Math.random()}.svg`}
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>
            {roomMessages.length !== 0
              ? roomMessages[0].message
              : "No Messages"}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );

  return output;
}

export default SidebarChat;
