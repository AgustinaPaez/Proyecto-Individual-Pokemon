import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import CreateForm from "./components/CreateForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/pokemons/:id" component={Detail} />
          <Route exact path="/pokemon" component={CreateForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
