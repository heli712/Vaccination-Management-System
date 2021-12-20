import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Modal, Button as BT } from 'react-bootstrap'
import moment from 'moment'
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
    Checkbox,
} from "antd";
import axios from "axios";
import jwt from 'jwt-decode';
const Option = Select.Option;


const UpdateAppointmentDescriptionCard = (props) => {
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [isWithinTime, setisWithinTime] = useState(false)
    const [show, setShow] = useState(false)
    const [fromTime, setFromTime] = useState([])
    const [date, setDate] = useState()
    const [children, setChildren] = useState([])
    const [editDate, setEditDate] = useState(moment(new Date(), "DD/MM/YYYY"))
    const [selectedDiseases, setSelectedDiseases] = useState([])
    const [appointments, setAppointments] = useState([])
    const [selectedApointment, setSelectedAppointment] = useState([])
    const [clinicData, setClinicData] = useState([])
    const countOccurrences = (arr, val) => {
        let c = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                c = c + 1
            }
        }
        return c

    }

    const handleSubmit = () => {
        console.log(selectedApointment)
        console.log(selectedDiseases)
        var s = ""
        for (let i = 0; i < selectedDiseases.length; i++) {
            s = s + selectedDiseases[i] + ","
        }

        let str = `?fromTime=${selectedApointment}&isCheckedIn=${isCheckedIn}&appointmentDate=${date?.format("DD/MM/YYYY")}&appointmentId=${props.details}&email=${jwt(localStorage.getItem("accessToken")).iss}`;
        console.log(process.env.REACT_APP_275_BACKEND_URL + "appointment/updateAppointment" + str)
        var token = localStorage.getItem("accessToken")
        axios({
            method: 'put',
            url: process.env.REACT_APP_275_BACKEND_URL + "appointment/updateAppointment" + str,
            withCredentials: true,
            crossdomain: true,
            headers: {
                'Authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                window.alert("Appointment Booked. See you soon!!")
                window.location.reload();
            }).catch((err) => {
                window.alert("Vaccine already booked or taken ")
            })
    }


    function intervals(startString, endString) {
        var start = moment(startString, 'hh:mm a');
        var end = moment(endString, 'hh:mm a');
        // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
        // note that 59 will round up to 60, and moment.js handles that correctly
        start.minutes(Math.ceil(start.minutes() / 15) * 15);

        var result = [];

        var current = moment(start);

        while (current <= end) {
            result.push(current.format('HH:mm'));
            current.add(15, 'minutes');
        }
        return result;
    }

    useEffect(() => {
        var token = localStorage.getItem("accessToken")
        console.log("Chuth", moment(props.appointmentDetails.appointmentDate, "DD/MM/YYYY")._i)
        var now = moment(editDate) //todays date

        console.log("London", now)
        var end = moment(props.appointmentDetails.appointmentDate + " " + props.appointmentDetails.fromTime, "DD/MM/YYYY hh:mm a"); // another date
        console.log("London2", end)
        var duration = moment.duration(now.diff(end));
        var days = duration.days();
        var hours = duration.hours();
        console.log("london3", days)
        console.log("london3", hours)
        if (days === 0) {
            setisWithinTime(true)
        }
        else {
            setisWithinTime(false)
        }
        console.log("propose", props)
        setChildren([])
        setAppointments([])
        console.log("f111", date)
        var promises = []
        var arr = []
        console.log("mawa", props)
        for (let i = 0; i < props.vaccines?.length; i++) {
            promises.push(
                axios({
                    method: 'get',
                    url: process.env.REACT_APP_275_BACKEND_URL + "vaccine/getDiseasesByVaccineId" + "?vaccineId=" + props.vaccines[i].vid,
                    withCredentials: true,
                    crossdomain: true,
                    headers: {
                        'Authorization': "Bearer " + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then((response) => {
                        for (let j = 0; j < response.data.diseaseId.length; j++) {
                            console.log("gunjal insideeeee", response.data)
                            arr.push(<Option key={props.vaccines[i].vid}>{props.vaccines[i].name + "-" + response.data.diseaseId[j].name}</Option>);
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    }))
        }


        Promise.all(promises).then(() => setChildren(arr));
        var arr2 = []
        var result = []
        var physicians = []
        var promises2 = []
        console.log(process.env.REACT_APP_275_BACKEND_URL + "clinic/getClinicsById" + "?clinicId=" + props.appointmentDetails?.clinicId?.cid)
        promises2.push(
            axios({
                method: 'get',
                url: process.env.REACT_APP_275_BACKEND_URL + "clinic/getClinicsById" + "?clinicId=" + props.appointmentDetails?.clinicId?.cid,
                withCredentials: true,
                crossdomain: true,
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    console.log("Honey", response.data)
                    setClinicData(response.data)
                    result = intervals(response.data.openingTime, response.data.closingTime)
                    // creates an array of empty objects
                    physicians = Array(result.length).fill(response.data.numberOfPhysicians)
                    console.log("Lebron", physicians)
                })
                .catch((e) => {
                    console.log(e)
                })
        )
        var fromTime = []
        promises2.push(
            axios({
                method: 'get',
                url: process.env.REACT_APP_275_BACKEND_URL + "appointment/getAppointmentsByClinicId" + "?clinicId=" + props.appointmentDetails?.clinicId?.cid,
                withCredentials: true,
                crossdomain: true,
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    for (let j = 0; j < response.data.length; j++) {
                        if (response.data[j].appointmentDate == date?.format("DD/MM/YYYY")) {
                            fromTime.push(response.data[j].fromTime)
                        }
                    }

                    setFromTime(fromTime)
                }))

        Promise.all(promises2).then(() => {
            for (let j = 0; j < fromTime.length; j++) {
                if (countOccurrences(fromTime, result[j]) <= physicians[j]) {

                    physicians[j] -= countOccurrences(fromTime, result[j])
                    console.log("Shady", physicians[j])
                }
                else {
                    physicians[j] = 0
                }
            }
            console.log("Kobe Bryant", physicians)
            for (let j = 0; j < result.length - 1; j++) {
                if (physicians[j] > 0) {
                    arr2.push(<Option key={result[j]}>{result[j] + "-" + result[j + 1] + "-(" + physicians[j] + ")"}</Option>);
                }
            }
            setAppointments(arr2)
        });

        setShow(true)
    }, [props, date, editDate]);



    return (
        <div className="job-description-card-wrapper">
            <div className="job-description-header">
                <span>Originally scheduled on {props.appointmentDetails.appointmentDate} at  {props.appointmentDetails.fromTime} </span>
                <br />
                <span>Vaccines being taken are :  {props.appointmentDetails.vaccineId.map((id) => id.name + " ,  ")} at  {props.appointmentDetails.fromTime} </span>

                <div className="job-title">
                    <div>

                        <span>{clinicData.name} </span>

                        <span>{clinicData.openingTime} - {clinicData.closingTime} </span>

                    </div>
                </div>
                <br />
                <div className="job-card-company-details">

                    <Form style={{ width: '100%' }}
                    >


                        <Form.Item label="Select Date">
                            <DatePicker
                                value={date}
                                onChange={(date, dateString) => setDate(date)}
                                format="DD/MM/YYYY"
                            />

                        </Form.Item>
                        <Form.Item label="Available Appointment Timings">
                            <Select
                                mode="single"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={(e) => setSelectedAppointment(e)}
                            >
                                {appointments}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Current Date Time">
                            <DatePicker
                                value={editDate}
                                onChange={(date, dateString) => setEditDate(date)}
                                format="DD/MM/YYYY"
                            />



                        </Form.Item>

                        <Form.Item >
                            <Checkbox disabled={!isWithinTime} onChange={() => setIsCheckedIn(!isCheckedIn)}>Check In</Checkbox>
                        </Form.Item>
                        <div style={{ textAlign: "center" }}>
                            <Button type="primary" onClick={handleSubmit}>
                                Update Appointment
                            </Button>
                        </div>

                    </Form>
                </div>

                <div className="buttons-in-a-line-wrapper">

                </div></div></div >)
};

export default UpdateAppointmentDescriptionCard;
