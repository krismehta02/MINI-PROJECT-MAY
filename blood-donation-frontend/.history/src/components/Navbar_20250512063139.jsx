import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: "#f8d7da",
        paddingTop: "0.8rem",
        paddingBottom: "0.8rem",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container fluid="md">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{ fontSize: "1.6rem", color: "#b30000" }}
        >
          Blood Bank
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/register", label: "Register" },
              { to: "/login", label: "Login" },
              { to: "/feedback", label: "Feedback" },
              { to: "/contact", label: "Contact Us" },
            ].map((item, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={item.to}
                className="btn btn-outline-danger"
                style={{
                  borderRadius: "30px",
                  padding: "6px 18px",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
