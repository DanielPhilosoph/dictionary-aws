import React from "react";
import "./App.css";
import DictionaryMain from "./components/DictionaryMain";
import { Provider, useSelector } from "react-redux";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import store from "./store/store";

function App() {
  // const state: StateType = useSelector((state: StateType) => state);
  // const routes = state.recentSearches.map((word) => {
  //   return (
  //     <Route
  //       path={`/${word.word}/${word.pos}`}
  //       element={<HotelsPage hotel={hotel} />}
  //     />
  //   );
  // });

  return (
    <div className="App">
      <NavBar />

      <Provider store={store}>
        <DictionaryMain />
      </Provider>
    </div>
  );
}

export default App;
