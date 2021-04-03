import "./App.css";
import { auth } from "./firebase";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [email, setemail] = useState("");
  const [fieldOtp, setfieldOtp] = useState(false);
  const [user, setUser] = useState(null);
  const [otp, setotp] = useState("");
  const sendOTP = async (email) => {   //// send email to nodejs 
    try {
      const response = await axios.post("http://localhost:5000/sendemail", {
        emailID: email,
      });
      if (response.status === 400) {
        throw new Error(response.data.message);
      }
      const data = response.data;
      console.log(data);
      sessionStorage.setItem("otp", data.message);
      return setfieldOtp(true);
    } catch (error) {
      console.log(error.message);
      return alert(error.message);
    }
  };
  const verfiyOTPandSignIN = async (otp, email) => {  /// verfiy otp and again send email 
    //to get custom Token
    try {
      if (otp === sessionStorage.getItem("otp")) {
        const res = await axios.post("http://localhost:5000/getcred", {
          email: email,
        });
        console.log(res);
        if (res.status === 400) {
          throw new Error(res.data.message);
        }
        const data = res.data;
        
        auth
          .signInWithCustomToken(data.customToken)  // signing using custom token
          .then((user) => {
            console.log(user);
            alert("signed in");
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      }
    } catch (error) {
      console.log(error);
      return console.log(error.message);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      setUser(user);
    });
  });
  return (
    <div className="App">
      {console.log(fieldOtp)}
      <h1>{user === null ? "Login" : user.email}</h1>
      {user !== null ? (
        <h1>
          <button
            className="uk-button"
            onClick={(e) => {
              auth.signOut();
            }}
          >
            Log Out
          </button>
        </h1>
      ) : null}
      {fieldOtp === false ? (
        <div     /// email field
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            placeholder="email"
            className="uk-input"
            type="email"
            // default={email}
            defaultValue={email}
            style={{ width: "50%" }}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <button
            className="uk-button uk-button-primary"
            style={{ width: "50%" }}
            onClick={(e) => sendOTP(email)}
          >
            Send otp
          </button>
        </div>
      ) : (
        <div  /// OTP field
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            placeholder="6-digit otp"
            className="uk-input"
            type="text"
            defaultValue={otp}
            style={{ width: "50%" }}
            onChange={(e) => setotp(e.target.value)}
          />
          <br />
          <button
            className="uk-button uk-button-primary"
            style={{ width: "50%" }}
            onClick={(e) => verfiyOTPandSignIN(otp, email)}
          >
            Enter Otp
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
