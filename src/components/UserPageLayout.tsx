import { Fragment } from "react";
import UserHeader from "./UserHeader";
import { Outlet } from "react-router-dom";

const UserPageLayout = (): JSX.Element => {
  return (
    <Fragment>
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default UserPageLayout;
