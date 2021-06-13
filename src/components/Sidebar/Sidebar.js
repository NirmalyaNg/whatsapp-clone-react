import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import { auth, db } from "../../firebase";
import { authContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const history = useHistory();
  const {
    state: { user },
  } = useContext(authContext);

  const logoutUser = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <Button onClick={logoutUser}>Logout</Button>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} name={room.data.name} id={room.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
