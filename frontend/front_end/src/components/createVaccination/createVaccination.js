import React, { Component } from "react";
import "antd/dist/antd.css";
import { Redirect } from "react-router";
import NavBar from "../navbar/navbar";

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
  Typography,
} from "antd";
import jwt from 'jwt-decode';
import "./createVaccination.css";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const Option = Select.Option;

class CreateVaccination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      diseases: [],
      children: [],
      manufacturer: "",
      shots: 0,
      shotInterval: 0,
      duration: -1,
      redirectToHome: false,
      numberOfVaccines: 1,
      description: ''
    };
  }

  componentDidMount() {
    console.log("hhhhh", jwt(localStorage.getItem("accessToken")))
    var token = localStorage.getItem("accessToken")
    axios({
      method: 'get',
      url: process.env.REACT_APP_275_BACKEND_URL + "disease/getAllDiseases",
      withCredentials: true,
      crossdomain: true,
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log("HAHA");
        console.log(response);

        let arr = []
        for (let i = 0; i < response.data.length; i++) {
          arr.push(<Option key={response.data[i].did}>{response.data[i].name}</Option>);

        }
        this.setState({ children: arr })

      })
      .catch((err) => {
        console.log(err);
      });

  }
  redirectToHome = () => {
    return this.setState({ redirectToHome: true });
  };

  submit = () => {
    console.log(this.state.name);
    let strDisease = '';
    for (let i = 0; i < this.state.diseases.length; i++) {
      strDisease += this.state.diseases[i] + ',';

    }
    let str = `?name=${this.state.name}&diseaseNumbers=${strDisease}&manufacturer=${this.state.manufacturer}&numberOfShots=${parseInt(this.state.shots)}&shotIntervalValue=${parseInt(this.state.shotInterval)}&duration=${parseInt(this.state.duration)}`;

    var token = localStorage.getItem("accessToken")
    axios({
      method: 'post',
      url: process.env.REACT_APP_275_BACKEND_URL + "vaccine/createVaccine" + str,
      withCredentials: true,
      crossdomain: true,
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log("HAHA");
        console.log(response);
        window.alert("Vaccine added succesfully")
      })
      .catch((err) => {
        console.log(err);
        window.alert('Enter different vaccine name or select other diseases')
      });
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
            <h1 style={{ textAlign: "center" }}>Create vaccination</h1>
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
            <Form.Item label="Diseases (if multiple enter comma seperated">

              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(e) => this.setState({ diseases: e })}
              >
                {this.state.children}
              </Select>
            </Form.Item>
            <Form.Item label="Manufacturer">
              <Input
                value={this.state.manufacturer}
                onChange={(e) => this.setState({ manufacturer: e.target.value })} />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })} />
            </Form.Item>
            <Form.Item label="Number of Shots">
              <Input
                value={this.state.shots}
                onChange={(e) => this.setState({ shots: e.target.value })} />
            </Form.Item>
            <Form.Item label="Shots interval (enter if number of shots is greater than one)">
              <Input
                value={this.state.shotInterval}
                onChange={(e) => this.setState({ shotInterval: e.target.value })} />
            </Form.Item>
            <Form.Item label="Duration for which the vaccine works in days">
              <Typography> Leave blank if it works for lifetime</Typography>
              <Input

                value={this.state.duration}
                onChange={(e) => this.setState({ duration: e.target.value })} />
            </Form.Item>
            <Form.Item label="Number of vaccines">
              <Input
                value={this.state.numberOfVaccines}
                onChange={(e) => this.setState({ numberOfVaccines: e.target.value })} />
            </Form.Item>
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

export default CreateVaccination;