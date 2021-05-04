import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home.page';
import Game from './pages/game/game.page';
import NotFoundPage from './pages/404/404.page';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path="/game" component={Game} />
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
