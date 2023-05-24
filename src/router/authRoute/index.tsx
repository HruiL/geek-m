import React from "react";
import { useTypedSelector } from "@store/index";
import { tokenSelector } from "@slice/credential";
import { Navigate, Outlet, useLocation } from "react-router-dom";
interface Props {
  children?: React.ReactElement;
}
function AuthRoute({ children }: Props) {
  const token = useTypedSelector(tokenSelector);
  const { pathname, search, hash } = useLocation();
  if (!token)
    return (
      <Navigate
        to={"/login"}
        replace={true}
        state={{ from: pathname + search + hash }}
      />
    );
  if (typeof children !== "undefined") return children;
  return <Outlet />;
}

export default AuthRoute;
