import React from "react";
import moment from 'moment'
import { Link } from "react-router-dom";

const ClinicCard = (props) => {
  const className =
    props.selecetdJobCard === props.card.cid
      ? "job-card-wrapper border border-dark border-2"
      : "job-card-wrapper";
  return (
    <div
      className="job-card-wrapper"
      // active={true}
      style={
        props.selecetdJobCard === props.card.cid
          ? { border: "1px solid #2557a7" }
          : {}
      }
      onClick={() => props.onClick(props?.card.cid)}
    >
      <div className="job-title">
        <div>
          <span>{props.card?.name}</span>
        </div>
      </div>

      <div className="job-card-company-details">
        <span>
          {/* <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/companyDetails/${props.card?.cid}`}
          >
            {props.card?.name}
          </Link>{" "} */}

        </span>
      </div>
      <div>
        <p>
          <span>
            {props.card?.street}, {props.card?.city}, {props.card?.state} {" "}
            {props.card?.zipCode}

          </span>
        </p>
      </div>
      <div className="job-card-salary">
        <span>Open Time- {props.card?.openingTime} </span>
      </div>
      <div className="job-card-salary">
        <span>Close Time- {props.card?.closingTime} </span>
      </div>
      <div
        style={{ marginBottom: "10px", height: "60px" }}
        className="job-card-role-summary overflow-hidden"
      >
        {props?.card?.description}
      </div>

      <div className="job-card-posted-ago">

        {/* 7 days ago */}
      </div>
    </div>
  );
};

export default ClinicCard;