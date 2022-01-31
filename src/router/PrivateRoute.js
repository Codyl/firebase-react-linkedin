import { Route, Redirect } from "react-router-dom";
import { useSession } from "../firebase/userProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isAdmin } = useSession();
  return (
    <Route
      {...rest}
      render={(props) =>
        !!user && (props.match.params.uid === user.uid || isAdmin) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: `/login` }} />
        )
      }
    />
  );
};
export default PrivateRoute;
