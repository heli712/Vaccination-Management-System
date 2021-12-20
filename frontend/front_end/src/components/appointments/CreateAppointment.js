import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import {
  Form,
  Button,
  Radio,
  Select
} from "antd";
const Option = Select.Option;
function CreateAppointment() {
  const [showResults, setResults] = useState(false);
  const [diseases, setDiseases] = useState([]);
  const [diseaseSearch, setDiseasesSearch] = useState([]);
  const [clinics, setClinics] = useState();
  const [filteredClinics, setFilteredClinics] = useState();
  const [vaccines, setVaccines] = useState();
  const [diseaseOptions, setDiseaseOptions] = useState();
  const onSubmit = () => {
    let i;
    var resultDisease = []
    console.log("Gunjall", diseaseSearch)
    for (i = 0; i < diseases.length; i++) {
      if (diseaseSearch.includes(diseases[i].did)) {
        resultDisease.push(diseases[i].did);
      }
    }

    var resultVaccine = []
    var propsVaccines = []
    for (i = 0; i < vaccines.length; i++) {
      for (let j = 0; j < vaccines[i].diseaseId.length; j++) {
        if (diseaseSearch.includes(vaccines[i].diseaseId[j].did)) {
          resultVaccine.push(vaccines[i].vid);
          propsVaccines.push(vaccines[i])
          break
        }
      }
    }
    console.log("resultVaccine", resultVaccine)
    var resultClinic = []
    for (i = 0; i < clinics.length; i++) {
      for (let j = 0; j < resultVaccine.length; j++) {
        var resultArr = []
        for (let k = 0; k < clinics[i].vaccineId.length; k++) {
          if (clinics[i].vaccineId[k].vid == resultVaccine[j]) {
            resultArr.push(clinics[i].vaccineId[k].vid)
            break
          }
        }

        if (resultArr.length === resultVaccine.length) {
          resultClinic.push(clinics[i])
        }
      }
    }
    console.log("resultClinic", resultClinic)
    setFilteredClinics(resultClinic)
    setResults(true)
  }

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
        console.log("HAHA");
        console.log(response);
        let arr = []
        for (let i = 0; i < response.data.length; i++) {
          arr.push(<Option key={response.data[i].did}>{response.data[i].name}</Option>);

        }
        setDiseases(response.data);
        setDiseaseOptions(arr)
      })
    axios({
      method: 'get',
      url: process.env.REACT_APP_275_BACKEND_URL + "clinic/getAllClinics",
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
        setClinics(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setVaccines(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])



  return (
    <div>
      <Form>
        <Form.Item label="Dieases for vaccines">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select from the following"
            onChange={(e) => setDiseasesSearch(e)}
          >
            {diseaseOptions}
          </Select>
        </Form.Item>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={onSubmit}
        >
          Search
        </Button>
      </Form>
      <div>
        {showResults === true ? (
          <SearchResults searchResults={filteredClinics} />
        ) : (
          ""
        )}
      </div>

    </div>
  )
}

export default CreateAppointment;