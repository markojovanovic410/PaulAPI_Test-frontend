import { useEffect, useState } from "react";
import { NavDropdown, Row } from "react-bootstrap";
import "./header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import imgAvatar from "../../assets/imgs/avatar.png";
import { useCookie } from "../../states/cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const [logoUrl, setLogoUrl] = useState("");
  const {cookie , setCookie} = useCookie();

  useEffect(() => {
    fetch("https://paul.blueboxonline.com/api/v1/app/settings")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLogoUrl(data["logo"]);
      });
  }, []);

  const handleLogout = async (e) => {
    try {
      axios
        .post(`${process.env.REACT_APP_TEST_API}logout`, { cookie: cookie });
        setCookie(null);
        navigate("/signin");
    } catch(e){
      alert(e);
    }
  }

  const handleLogIn = async (e) => {
    navigate("/signin");
  }
  return (
    <Navbar bg="white" expand="lg" style={{ padding: "10px 10px" }}>
      <Navbar.Brand href="#home" className="col-md-6 col-sm-12 col-12">
        {<img className="App-logo" src={logoUrl} alt="Logo" />}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto justify-content-end">
          <Link to="/" className="App-link">
            Home
          </Link>
          <Link to="/report" className="App-link">
            Report
          </Link>

          <Link to="/report" className="App-link nav-mobile-signin">
            Sign Out
          </Link>

          <NavDropdown
            title={<img src={imgAvatar} alt="avatar"  />}
            id="basic-nav-dropdown"
            className="nav-avatar"
          >
            {!cookie ? (
              <NavDropdown.Item onClick={handleLogIn}>Sign In</NavDropdown.Item>
            ) : (
              <NavDropdown.Item onClick={handleLogout}> Sign Out</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
