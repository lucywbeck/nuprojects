import React from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signOut } from "../../utilities/firebase";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";

export default function NavbarApp() {
  const navigate = useNavigate();
  const { user, setUserFromDatabase } = useAuth();

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    await setUserFromDatabase(user.uid);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  // const activation = ({ isActive }) => (isActive ? "active" : "inactive");

  return (
    <div>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">NUProjects</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav>
              {!user ? (
                <Nav.Link onClick={handleSignIn}>Sign in</Nav.Link>
              ) : (
                <NavDropdown
                  className="nav-dropdown"
                  title={
                    <Image
                      roundedCircle
                      src={user.profilePic}
                      width={30}
                      referrerPolicy="no-referrer"
                    />
                  }
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/saved">Saved</NavDropdown.Item>
                  <NavDropdown.Item href="/applied">Applied</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
