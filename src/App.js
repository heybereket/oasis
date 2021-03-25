import Home from "./pages/Home";
import New from "./pages/New";
import InvalidPage from "./components/InvalidPage";
import Project from "./components/Project";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new" component={New} />
            <Route exact path={`/:owner/:name`} component={Project} />
            <Route path="*" component={InvalidPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
