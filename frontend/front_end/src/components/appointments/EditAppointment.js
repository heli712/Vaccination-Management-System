import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EditAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showMe, setShowMe] = useState(true);

  const style = {
    position: 'relative',
    width: 800,
    height: '90%',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    p: 4,
  };

  const EditInfo = () => {
    setShowMe(!showMe);
  };

  const getAppointments = async () => {
    let arr = [];
    var CurrentDate = new Date();
    var token = localStorage.getItem("accessToken")
    axios({
      method: 'post',
      url: process.env.REACT_APP_275_BACKEND_URL + 'appointments/getAppointments',
      withCredentials: true,
      crossdomain: true,
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let appointmentDate = new Date();
          if (appointmentDate < CurrentDate) {
            arr.push(response.data[i]);
          }
        }
        setAppointments(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: "flex", marginTop: "20px" }}>
      
      <Box sx={style}>
        {showMe ? (
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Clinic name
                  <EditIcon
                    style={{ marginLeft: '500px' }}
                    onClick={EditInfo}
                  />
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <LocationOnIcon style={{ color: 'grey' }} />
                  location
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Date time
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  List of vaccines
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ) : (
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Clinic name
                  <EditIcon
                    style={{ marginLeft: '530px' }}
                    onClick={EditInfo}
                  />
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <LocationOnIcon style={{ color: 'grey' }} />
                  location
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Date time
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  List of vaccines
                </Typography>

                <button
                  className="reviewSubmitButton"
                  type="submit"
                  style={{
                    marginTop: '25px',
                    borderRadius: '6.25rem',
                    width: '70px',
                    height: '40px',
                    fontWeight: 'bold',
                    fontColor: 'white',
                    backgroundColor: '#085ff7',
                    border: '#085ff7',
                    cursor: 'pointer',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    textAlign: 'center',
                  }}
                  onClick={() => { }}
                >
                  Save
                </button>
              </CardContent>
            </Box>
          </Card>
        )}

        <br />
      </Box>
    </div>
  );
};

export default EditAppointment;
