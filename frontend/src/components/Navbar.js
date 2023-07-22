
import {Link} from "react-router-dom";
import {Container, Navbar} from "react-bootstrap"

const navbar = () => {
    return (
      <Link to="/" className="link">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">User Authentication</Navbar.Brand>
        </Container>
      </Navbar>
      </Link>
      );
}
 
export default navbar;