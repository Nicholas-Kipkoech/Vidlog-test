import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const fetchSumamary = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this text:\n\n:${text}`,
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    setSummary(response.data.choices[0].text);
  };

  return (
    <div className="App">
      <p className="title">
        Text summarizer VidLogs Test using text-summarizer model
      </p>

      <div className="summary-area">
        <div className="text-area-div">
          <p> Text will be entered here</p>

          <textarea
            className="text-area"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter texts to summarize"
          ></textarea>
        </div>
        <div className="text-area-div">
          <p>Summarized text will be displayed here</p>
          <div className="text-area2">{summary}</div>
        </div>
      </div>
      <button className="btn-summary" onClick={() => fetchSumamary()}>
        Summarize
      </button>
    </div>
  );
}

export default App;
