import React, { Component } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";
import Chart, { ReactApexChart } from "react-apexcharts";
import axios from "axios";
import NavBar from "../navbar/navbar";
class ClinicReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(),
            realCurrentTime: new Date(),
            series: [
                {
                    name: "Desktops",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 56, 55, 44, 55],
                },
                // {
                //   name: "Laptops",
                //   data: [10, 1, 5, 1, 9, 62, 69, 21, 138],
                // },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
            },
            stroke: {
                curve: "straight",
            },
            //   title: {
            //     text: "Product Trends by Month",
            //     align: "left",
            //   },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
            },
        };
    }

    onDateChange = (date, dateString) => {
        this.setState({ currentTime: dateString });
    };

    componentDidMount() {
        let str = "";
        let dt = [];


        var token = localStorage.getItem("accessToken")
        axios({
            method: 'get',
            url: process.env.REACT_APP_275_BACKEND_URL + 'appointment/getAllAppointments',
            withCredentials: true,
            crossdomain: true,
            headers: {
                'Authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '01' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '02' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '03' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '04' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '05' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '06' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '07' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '08' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '09' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '10' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '11' && !item.checkedIn).length)
                dt.push(response.data.filter((item) => item.appointmentDate.substr(3, 2) == '12' && !item.checkedIn).length)
                console.log(dt)
                this.setState({
                    series: [
                        {
                            name: "Desktops",
                            data: dt,
                        }]
                })
            })
            .catch((err) => {
                console.log(err);
            });



        // axios
        //     .get(process.env.REACT_APP_275_BACKEND_URL + "/" + str)
        //     .then((response) => {
        //         console.log(response);
        //         dt.Jan = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Feb = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Mar = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Apr = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.May = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Jun = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Jul = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Aug = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Sep = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Oct = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Nov = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //         dt.Dec = response.filter((item) => /(.)-01-(.)/.test(item.data));
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    render() {
        return (
            <>
                <NavBar />
                <div style={{ marginLeft: "20%", marginRight: "20%", padding: "10px" }}>
                    <div style={{ padding: "15px", textAlign: "center" }}>
                        <h1>Patient Report</h1>
                    </div>
                    <div style={{ margin: "20px", display: "flex" }}>
                        <div style={{ display: "flex" }}>
                            <label style={{ margin: "10px" }}>Current Time</label>
                            <DatePicker
                                defaultValue={moment(new Date(), "YYYY-MM-DD")}
                                onChange={this.onDateChange}
                            />
                        </div>
                        <div style={{ textAlign: "right", width: "65%" }}>
                            <label style={{ margin: "10px" }}>Real Current Time</label>
                            <DatePicker
                                defaultValue={moment(new Date(), "YYYY-MM-DD")}
                                disabled
                            />
                        </div>
                    </div>
                    <div id="chart" style={{ marginTop: "35px" }}>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            height={350}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default ClinicReport;