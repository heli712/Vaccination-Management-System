import React, { Component } from "react";
import { Redirect } from "react-router";
import "./createClinic.css";
import "antd/dist/antd.css";
import moment from "moment";
import axios from "axios";
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
  TimePicker,
} from "antd";
import dotenv from "dotenv";
import NavBar from "../navbar/navbar";
dotenv.config();
const Option = Select.Option;
class CreateClinic extends Component {


  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      name: "",
      address: "",
      street: '',
      city: '',
      state: '',
      zipcode: '',
      description: "",
      openTime: moment("06:00:00", "HH:mm:ss"),
      closeTime: moment("18:00:00", "HH:mm:ss"),
      physicians: "",
      timeFormat: "HH:mm:ss",
      children: [],
      vaccines: []
    };
  }
  componentDidMount() {
    console.log(this.state.openTime)
    var token = localStorage.getItem("accessToken")
    axios({
      method: 'get',
      url: process.env.REACT_APP_275_BACKEND_URL + "vaccine/getAllVaccines",
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
          arr.push(<Option key={response.data[i].vid}>{response.data[i].name}</Option>);

        }
        this.setState({ children: arr })

      })
      .catch((err) => {
        console.log(err);
      });

  }
  submit = () => {

    console.log(this.state.name);
    console.log(this.state.address);
    console.log(this.state.description);
    console.log(this.state.openTime);
    console.log(this.state.closeTime);
    console.log(this.state.physicians);
    console.log((this.state.closeTime - this.state.openTime));

    var diff = this.state.openTime.diff(this.state.closeTime);
    var time3 = moment(diff);
    if ((this.state.closeTime - this.state.openTime) / 3600000 < 8) {
      window.alert("Clinic working hours less than 8 hours not allowed ")
    }
    else {
      let strVaccines = '';
      for (let i = 0; i < this.state.vaccines.length; i++) {
        strVaccines += this.state.vaccines[i] + ',';

      }
      let str = `?name=${this.state.name}&street=${this.state.street}&city=${this.state.city}&state=${this.state.state}&zipcode=${this.state.zipcode}&openingTime=${this.state.openTime._i}&closingTime=${this.state.closeTime._i}&vaccineNumbers=${strVaccines}&numberOfPhysicians=${this.state.physicians}`;
      console.log(
        process.env.REACT_APP_275_BACKEND_URL + "clinic/createClinic" + str
      );
      var token = localStorage.getItem("accessToken")
      axios({
        method: 'post',
        url: process.env.REACT_APP_275_BACKEND_URL + "clinic/createClinic" + str,
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
          window.alert("Clinic added sucessfully");
        })
        .catch((err) => {
          console.log(err);
          window.alert("Similar clinic name already exists")
        });
    }

  };

  redirectToHome = () => {
    return this.setState({ redirectToHome: true });
  };

  render() {
    let redirectToHome = null;
    if (this.state.redirectToHome)
      redirectToHome = <Redirect to="/appointments" />;
    function onChange(time, timeString) {
      this.setState({ opentime: timeString })
    }
    return (
      <>
        <NavBar />
        {redirectToHome}
        <div style={{ padding: "20px" }}>
          <div style={{ paddingBottom: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Add Clinic</h1>
          </div>

          <Form
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 5,
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

            <Form.Item label="Street and number (optional)">
              <Input
                value={this.state.street}
                onChange={(e) => this.setState({ street: e.target.value })}
              />
            </Form.Item>

            <Form.Item label="City">
              <Input
                value={this.state.city}
                onChange={(e) => this.setState({ city: e.target.value })}
              />
            </Form.Item>

            <Form.Item label="State">
              <Input
                value={this.state.state}
                onChange={(e) => this.setState({ state: e.target.value })}
              />
            </Form.Item>

            <Form.Item label="Zipcode">
              <Input
                value={this.state.zipcode}
                onChange={(e) => this.setState({ zipcode: e.target.value })}
              />
            </Form.Item>

            <Form.Item label="Open Time">
              <TimePicker

                value={this.state.openTime}
                onChange={(time, timeString) => this.setState({ openTime: moment(timeString, "HH:mm:ss") })}
                format={this.state.timeFormat}
              />
              {/* <input
                value={this.state.openTime}
                onChange={(e) => this.setState({ openTime: e.target.value })}
                type="time"
              ></input> */}
            </Form.Item>
            <Form.Item label="Close Time">
              <TimePicker

                value={this.state.closeTime}
                onChange={(time, timeString) => this.setState({ closeTime: moment(timeString, "HH:mm:ss") })}
                format={this.state.timeFormat}
              />
            </Form.Item>
            <Form.Item label="Vaccines">

              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(e) => this.setState({ vaccines: e })}
              >
                {this.state.children}
              </Select>
            </Form.Item>

            <Form.Item label="No of Physicians">
              <InputNumber onChange={(e) => this.setState({ physicians: e })} />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </Form.Item>
            <div style={{ textAlign: "center" }}>
              <Button type="primary" onClick={this.submit}>
                Add Clinic
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

export default CreateClinic;