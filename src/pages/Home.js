import React, { useState } from "react";
import "./home.css";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new Room");
  };

  const joinRoom = () => {
      console.log("JOIN CLICKED", roomId, username);
    if (!roomId || !username) {
      toast.error("Room-ID & Username is required");
      return;
    }

    navigate("/editor", {
      state: { roomId, username },
      replace: true,
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <>
      <div className="layout">
        <div className="left">
          <img src="templatereal.png" alt="logo" className="leftLogo" />
        </div>

        <div className="center">
          <h1 className="heroTitle">Build, Edit, and Collaborate</h1>
          <p className="heroSub">
            Code together effortlessly
            <br />
            in real time all inside
            <br />
            one powerful editor designed to
            <br />
            help teams code together effortlessly.
          </p>
        </div>

        <div className="right">
          <div className="formwrapper">
            <h4 className="mainlabel">Paste Invitation Room ID</h4>

            <div className="inputgroup">
              <input
                type="text"
                placeholder="ROOM ID"
                className="inputbox"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyUp={handleInputEnter}
              />

              <input
                type="text"
                placeholder="USERNAME"
                className="inputbox"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={handleInputEnter}
              />

              <button className="btn joinbtn" onClick={joinRoom}>
                Join
              </button>

              <span>Don't have a Room ID?</span>

              <span className="createInfo">
                Create your own Room ID:&nbsp;
                <a
                  href="/"
                  className="createNewBtn"
                  onClick={createNewRoom}
                >
                  New Room
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <h4>
          Created by
          <a
            href="https://github.com/VigneshDeekonda"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;Vignesh Deekonda
          </a>
        </h4>
      </footer>
    </>
  );
};

export default Home;
