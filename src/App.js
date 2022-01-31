import "./App.css";
import "./firebase/config";
import "./pages/Signup";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Signup from "./pages/Signup";
import { UserProvider } from "./firebase/userProvider";
import Profile from "./pages/Profile";
import Header from "./pages/Header";
import Login from "./pages/Login";
import ProfileRedirect from "./router/ProfileRedirect";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import Users from "./pages/Users";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app">
          <Header></Header>
          <div className="ui grid container">
            <Switch>
              <ProfileRedirect exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/profile/:uid" component={Profile} />
              <ProfileRedirect exact path="/login" component={Login} />
              <AdminRoute exact path='/users' component={Users} />
              <Route exact path="/">
                <Redirect to="login" />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
