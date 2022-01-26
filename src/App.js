import logo from './logo.svg';
import './App.css';
import './firebase/config';
import './pages/Signup';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';
import { UserProvider} from './firebase/userProvider';
import Profile from './pages/Profile';
import Header from './pages/Header';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <div className="app">
        <Header></Header>
        <div className="ui grid container">
          <Switch>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/profile/:uid" component={Profile}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
