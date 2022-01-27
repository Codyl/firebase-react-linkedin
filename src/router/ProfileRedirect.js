import { Route, Redirect } from "react-router-dom";
import { useSession } from "../firebase/userProvider";

const ProfileRedirect = ({ component: Component, ...rest }) => {
  const { user } = useSession();

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/profile/${user.uid}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default ProfileRedirect;
