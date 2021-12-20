import React, { Component } from "react";
import "antd/dist/antd.css";
import { Redirect } from "react-router";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import NavBar from "../navbar/navbar";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class CreateDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      redirectToHome: false,
    };
  }



  submit = () => {

    console.log(this.state.name);
    let str = `?name=${this.state.name}&description=${this.state.description}`
    var token = localStorage.getItem("accessToken")
    axios({
      method: 'post',
      url: process.env.REACT_APP_275_BACKEND_URL + "disease/createDisease" + str,
      withCredentials: true,
      crossdomain: true,
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      window.alert("Disease added sucessfully")
      console.log(response);

    })
      .catch((err) => {
        console.log(err);
      });


  };
  redirectToHome = () => {
    return this.setState({ redirectToHome: true });
  };

  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome)
      redirectToHome = <Redirect to="/appointments" />;
    return (
      <>
        <NavBar />
        {redirectToHome}
        <div style={{ padding: "20px" }}>
          <div style={{ paddingBottom: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Create Disease</h1>
          </div>

          <Form
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 6,
            }}
            layout="horizontal"
            initialValues={{
              size: "large",
            }}
            size="large"
          >
            <Form.Item label="Name">
              <Input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </Form.Item>

            {/* <Form.Item label="Vaccination">
              <Select>
                {this.state.vaccinations == [] ? (
                  <Select.Option value="None">None</Select.Option>
                ) : (
                  this. state.vaccinations.map((v) => {
                    return (
                      <>
                        <Select.Option value="v">v</Select.Option>
                      </>
                    );
                  })
                )}
              </Select>
            </Form.Item> */}

            <div style={{ textAlign: "center" }}>
              <Button type="primary" onClick={this.submit}>
                Create
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                onClick={this.redirectToHome}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </>
    );
  }
}

export default CreateDisease;