import React, { useState } from "react";

import Main from "./Main";
import TopNav from "./TopNav";
import { DURATIONS } from "../constants";


export default function App() {
  const [focusDuration, setFocusDuration] = useState(DURATIONS.FOCUS);
  const [restDuration, setRestDuration] = useState(DURATIONS.REST);

  return (
    <div className="App">
      {/* <TopNav handleFocusDrtChange={setFocusDuration} handleRestDrtChange={setRestDuration}/> */}
      <TopNav handleFocusDrtChange={setFocusDuration} handleRestDrtChange={setRestDuration}/>
      <Main focusDuration={focusDuration} restDuration={restDuration} />
    </div>
  );
}
