import React, { Component } from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import NavBar from "../navbar/navbar";
import PendingAppointments from "./PendingAppointments";
import CreateAppointment from "./CreateAppointment";
import UpdateAppointment from "./UpdateAppointment";
import PastAppointments from "./PastAppointments";
import axios from "axios";
import dotenv from "dotenv";
import {

  DatePicker,

} from "antd";
import moment from 'moment'
dotenv.config();
const { TabPane } = Tabs;

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localDate: null
    };

  }


  render() {
    return (
      <>
        <NavBar />

        <div style={{ padding: "10px", justifyContent: 'center' }}>

          <div style={{ padding: "15px", textAlign: "center" }}>
            <h1>Appointments</h1>
            <div style={{ display: "flex" }}>
              <div style={{ width: "200px" }}> Real Current Time</div>
              <DatePicker
                disabled
                onChange={(date, dateString) => this.setState({ localDate: dateString })}
                defaultValue={moment(new Date(), "MM-DD-YYYY")}
              />
            </div>
          


          </div>
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Create Appointment" key="2">
                <CreateAppointment />
              </TabPane>
              <TabPane tab="Edit Appointment" key="1">
                <UpdateAppointment />
              </TabPane>
              <TabPane tab="Pending Appointments" key="3">
                <PendingAppointments />
              </TabPane>
              <TabPane tab="Past appointments" key="4">
                <PastAppointments />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}

export default Appointments;