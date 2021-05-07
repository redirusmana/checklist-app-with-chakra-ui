import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import RouteGuard from "./Tools/RouteGuard";
import RoutePrivate from "./Tools/RoutePrivate";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import Dashboard from "./Components/Dashboard";
import Checklist from "./Components/Checklist";
import ChecklistItem from "./Components/ChecklistItem";
// import DetailItem from "./Components/DetailItem";

// import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Switch>
            <RouteGuard exact path="/login" component={LoginPage} />
            <RouteGuard exact path="/register" component={RegisterPage} />

            <RoutePrivate path="/dashboard" component={Dashboard} />
            <RoutePrivate exact path="/checklist" component={Checklist} />
            <RoutePrivate path="/checklist/:id" component={ChecklistItem} />
            {/* <RoutePrivate
              path="/checklist/:id/item/itemId:"
              component={DetailItem}
            /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
