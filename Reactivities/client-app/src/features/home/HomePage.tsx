import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>Welcome to the home page</h1>
      <h3>
        Take me to the <Link to="/activities">activities</Link>
      </h3>
    </Container>
  );
}
