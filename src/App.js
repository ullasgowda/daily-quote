import React, { useState } from "react";
import Typewriter from "typewriter-effect";

import "./App.css";

const Categories = [
  "happiness",
  "success",
  "money",
  "life",
  "leadership",
  "knowledge",
  "inspirational",
  "hope",
  "great",
  "freedom",
];

const App = () => {
  const [quote, setQuote] = useState({
    author: "",
    category: "",
    value: "Hello 👋",
  });

  const handleQuote = (quote) => {
    setQuote({
      author: quote.author,
      category: quote.category,
      value: quote.quote,
    });
  };

  const getQuote = async () => {
    const category = Categories[Math.floor(Math.random() * Categories.length)];
    const response = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    const quote = await response.json();

    if (quote.length > 0) {
      handleQuote(quote[0]);
      return;
    }

    alert("Please try again");
    return handleQuote({ value: "Hello" });
  };

  const handleClick = async () => {
    handleQuote({ value: "..." });
    return await getQuote();
  };

  return (
    <div className="App">
      <div
        style={{
          minHeight: "60vh",
          fontSize: "50px",
          color: "#5F8670",
          wordBreak: "break-word",
        }}
      >
        <Typewriter
          options={{
            strings: [quote.value],
            autoStart: true,
            loop: true,
            pauseFor: quote.value.length > 10 ? 5000 : 500,
          }}
        />
        <p style={{ color: "#FF9800", marginTop: "100px" }}>{quote.author}</p>
      </div>

      <br />

      <button
        type="button"
        style={{
          minWidth: "300px",
          padding: "8px",
          background: "#002011",
          color: "white",
          border: "0px solid red",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "30px",
        }}
        onClick={handleClick}
      >
        Next
      </button>
    </div>
  );
};

export default App;
