import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import jwt from 'jwt-decode';
import axios from 'axios';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      role: null
    };
  }
  logout = () => {
    localStorage.clear()
    this.setState({
      redirectToLogin: true,
    });

  };
  componentDidMount() {
    this.setState({ role: jwt(localStorage.getItem("accessToken")).aud })
    console.log("hhhhh", localStorage.getItem("accessToken"))
  }

  render() {
    let redirectToLogin = null;
    if (this.state.redirectToLogin) redirectToLogin = <Redirect to="/login" />;

    return (
      <div>
        {redirectToLogin}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              minHeight: "80px",
              background: "black",
              paddingTop: "5px",
            }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/appointments"
                >
                  VMS
                </Link>
                {this.state.role == "user" &&
                  <div>
                    <Button
                      style={{
                        color: "white",
                        marginLeft: "100px",
                      }}
                    >
                      <Link
                        style={{
                          color: "white",
                        }}
                        to="/appointments"
                      >
                        Home
                      </Link>
                    </Button>

                    <Button
                      style={{
                        color: "white",
                      }}
                    >
                      <Link
                        style={{
                          color: "white",
                        }}
                        to="/creport"
                      >
                        View Report
                      </Link>
                    </Button>
                  </div>}
                {this.state.role == "admin" &&
                  <div>
                    <Button>
                      <Link
                        style={{
                          color: "white",
                        }}
                        to="/createdisease"
                      >
                        Create Disease
                      </Link>
                    </Button>

                    <Button
                      style={{
                        color: "white",
                      }}
                    >
                      <Link
                        style={{
                          color: "white",
                        }}
                        to="/createvaccination"
                      >
                        Create Vaccination
                      </Link>
                    </Button>


                    <Button
                      style={{
                        color: "white",
                      }}
                    >
                      <Link
                        style={{
                          color: "white",
                        }}
                        to="/addclinic"
                      >
                        Add Clinic
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        style={{
                          color: "white",
                        }}
                        to="/areport"
                      >
                        See Report
                      </Link>
                    </Button>
                  </div>
                }
              </Typography>
              {/* ***********************  Login signup buttons *********************************** */}
              {/* <Button style={{ color: "white" }}>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </Button> */}
              {/* <Button style={{ color: "white" }}>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/signup"
                >
                  Sign up
                </Link>
              </Button> */}

              <Button style={{ color: "white" }} onClick={() => this.logout()}>
                <Link
                  style={{
                    color: "white",
                  }}

                >
                  Logout
                </Link>
              </Button>

            </Toolbar>
          </AppBar>
        </Box>
      </div>
    )
  };
}

export default NavBar;
