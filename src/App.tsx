import { useState } from "react";
import "./App.css";

function App() {
  const [selectionLocation, setSelectedLocation] = useState(0);

  return (
    <>
      <h1>Order a pizza</h1>
      <hr />
      {/* select location */}
      <div>
        <h4>Select a location</h4>
      </div>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
    </>
  );
}

export default App;
