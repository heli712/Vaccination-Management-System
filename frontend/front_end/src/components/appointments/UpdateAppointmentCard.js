import React from "react";
import moment from 'moment'
import { Link } from "react-router-dom";

const UpdateAppointmentCard = (props) => {
    console.log("OAAAA", props)
    return (
        <div
            className="job-card-wrapper"
            style={
                props.selectedAppointmentCard === props.card.aid
                    ? { border: "1px solid #2557a7" }
                    : {}
            }
            onClick={() => props.onClick(props?.card.aid)}
        >
            <div className="job-title">
                <div>
                    <span>Appointment scheduled on {props.card?.appointmentDate} - {props.card.fromTime}</span>
                </div>
            </div>

            <div className="job-card-company-details">
                <span>
                </span>
            </div>
            <div>
                <p>

                </p>
            </div>



            <div className="job-card-posted-ago">

                {/* 7 days ago */}
            </div>
        </div>
    );
};

export default UpdateAppointmentCard;