import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/organisms/Navigation";
import Start from "./pages/Start";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Start />
        </Route>
        <Route></Route>
      </Switch>
    </div>
  );
};

export default App;
