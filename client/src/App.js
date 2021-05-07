import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home.page';
import Game from './pages/game/game.page';
import NotFoundPage from './pages/404/404.page';
import userPage from './pages/userPage/user.page';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={['/']} component={Home} />
        {/* <Route exact path={['/home']} component={Home} /> */}
        <Route exact path="/game/:id" component={Game} />
        <Route exact path="/profile" component={userPage} />
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
