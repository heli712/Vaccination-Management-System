import React, { useEffect, useState } from "react";
import UpdateAppointmentCard from "./UpdateAppointmentCard";
import UpdateAppointmentDescriptionCard from "./UpdateAppointmentDescriptionCard";
import _ from "lodash";
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
    Typography,
} from "antd";

const Option = Select.Option;

const UpdateAppointment = () => {

    const [data, setData] = useState([]);
    const [appointments, setAppointments] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState([null]);
    const [cardId, setCardId] = useState(null);
    const [diseases, setDiseases] = useState(null);
    const [vaccines, setVaccines] = useState(null);
    const [selectedAppointmentCard, setSelectedAppointmentCard] = useState();

    const onCardClick = async (cardId) => {
        console.log("LOLOLOLOLLOLLO")
        var data = []
        var promises = []
        var token = localStorage.getItem("accessToken")
        console.log(process.env.REACT_APP_275_BACKEND_URL + "appointment/getAppointmentsByAppointmentId" + "?appointmentId=" + cardId)
        promises.push(

            axios({
                method: 'get',
                url: process.env.REACT_APP_275_BACKEND_URL + "appointment/getAppointmentsByAppointmentId" + "?appointmentId=" + cardId,
                withCredentials: true,
                crossdomain: true,
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    data = response.data
                    setAppointmentDetails(response.data)
                    console.log("Heliii123", response.data)
                })
                .catch((e) => {
                    console.log(e)
                }))
        console.log(data)
        Promise.all(promises).then(() => {
            console.log("Bravo", appointmentDetails)
            axios({
                method: 'get',
                url: process.env.REACT_APP_275_BACKEND_URL + "clinic/getClinicsById" + "?clinicId=" + appointmentDetails?.clinicId?.cid,
                withCredentials: true,
                crossdomain: true,
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    setVaccines(response.data.vaccineId)
                    console.log("Heliii2", response.data)
                })
                .catch((e) => {
                    console.log(e)
                })
            setCardId(cardId)
            setSelectedAppointmentCard(cardId);
        });
    };

    useEffect(() => {
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
                setDiseases(response.data)
                console.log("yeyeyey", response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    useEffect(() => {
        var token = localStorage.getItem("accessToken")
        axios({
            method: 'get',
            url: process.env.REACT_APP_275_BACKEND_URL + "appointment/getAllAppointments",
            withCredentials: true,
            crossdomain: true,
            headers: {
                'Authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })


            .then((response) => {
                console.log("All appointments", response.data)
                setAppointments(response.data)
                setData(response.data);
                if (response.data?.length > 0) {
                    setSelectedAppointmentCard(response.data[0].aid);
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    let card = null;
    if (appointmentDetails && vaccines && diseases) card = <UpdateAppointmentDescriptionCard vaccines={vaccines} diseases={diseases} appointmentDetails={appointmentDetails} details={cardId} />;

    return (
        <div className="container job-search-wrapper">
            <div className="cards-wrapper">
                {data?.map((card) => {
                    return (
                        <UpdateAppointmentCard
                            card={card}
                            onClick={onCardClick}
                            selectedAppointmentCard={selectedAppointmentCard}
                        />
                    );
                })}

            </div>
            {appointmentDetails && card}
        </div>
    );
};

export default UpdateAppointment;