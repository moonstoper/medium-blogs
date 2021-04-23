import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// const win = () => {
//   return <>HI</>;
// };
function App() {
  return (
    <>
      <div className="typewriter">
        <h1>Hi there, I'm Suraj.</h1>

        <p id="line-1">An independent web developer, in India.</p>
        <p id="line-2">Send me a message to discuss your project.</p>
        <a
          href="mailto:sjkachhap@outlook.com"
          style={{ textDecoration: "none",fontSize:"2.5rem" }}
        >
          📧
        </a>
      </div>
      <a
        style={{ float: "right",position: "absolute",bottom: 0,textDecoration: "none" }}
        href="https://codepen.io/dianalis"
      >
        animation by Diana
      </a>
    </>
  );
}

export default App;
