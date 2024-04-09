import { Container } from "semantic-ui-react";
import { Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { NavBar } from "./NavBar";
import HomePage from "../../features/home/HomePage";

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
};

export default observer(App);
