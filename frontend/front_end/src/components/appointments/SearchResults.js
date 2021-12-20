import React, { useEffect, useState } from "react";
import ClinicCard from "./ClinicCard";
import ClinicDescriptionCard from "./ClinicDescriptionCard";
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

const SearchResults = (props) => {

  const [data, setData] = useState([]);
  const [vaccines, setVaccines] = useState(null);
  const [diseases, setDiseases] = useState([null]);
  const [cardId, setCardId] = useState(null);
  const [selectedClinicCard, setSelectedClinicCard] = useState();

  const onCardClick = async (cardId) => {
    console.log(process.env.REACT_APP_275_BACKEND_URL + "clinic/getClinicsById" + "?clinicId=" + cardId)
    var token = localStorage.getItem("accessToken")
    axios({
      method: 'get',
      url: process.env.REACT_APP_275_BACKEND_URL + "clinic/getClinicsById" + "?clinicId=" + cardId,
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
        console.log("Heliii", response.data)
      })
      .catch((e) => {
        console.log(e)
      })
    setCardId(cardId)



    //const cardDesc = _.find(props.searchResults, { cid: cardId });
    setSelectedClinicCard(cardId);
    // setCardDetails(cardDesc);
  };

  // const setFirst = async () => {
  //   console.log("here");
  //   if (props.searchResults?.length > 0 && !cardDetails) {
  //     setCardDetails(props.searchResults[0]);
  //     setSelectedClinicCard(props.searchResults[0].cid); 
  //   }
  // };


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
    const data = props.searchResults;
    console.log("propssss", data)
    setData(data);
    if (data?.length > 0) {
      setSelectedClinicCard(data[0].cid);
    }
  }, [props.searchResults]);

  let card = null;
  if (vaccines && cardId && diseases) card = <ClinicDescriptionCard vaccines={vaccines} diseases={diseases} details={cardId} />;

  return (
    <div className="container job-search-wrapper">
      <div className="cards-wrapper">
        {data?.map((card) => {
          return (
            <ClinicCard
              card={card}
              onClick={onCardClick}
              selectedClinicCard={selectedClinicCard}
            />
          );
        })}

      </div>
      {props.searchResults?.length > 0 && card}
    </div>
  );
};

export default SearchResults;