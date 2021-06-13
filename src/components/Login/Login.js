import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth } from "../../firebase";
import { useState } from "react";

function Login() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [choice, setChoice] = useState("login");

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authObj) => {
        authObj.user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            setEmail("");
            setPassword("");
            setDisplayName("");
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <p>
            Sign In{" "}
            <input
              type="radio"
              name="choice"
              value="login"
              selected
              onChange={(e) => setChoice(e.target.value)}
            />{" "}
            Sign Up{" "}
            <input
              type="radio"
              name="choice"
              value="signup"
              onChange={(e) => setChoice(e.target.value)}
            />
          </p>
        </div>
        <form className="login__form">
          {choice === "signup" && (
            <input
              type="text"
              placeholder="Enter Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {choice === "signup" && <Button onClick={signUp}>Sign Up</Button>}
          {choice === "login" && <Button onClick={signIn}>Sign In</Button>}
        </form>
      </div>
    </div>
  );
}

export default Login;
