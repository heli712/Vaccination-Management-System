import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PastAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const style = {
    position: 'relative',
    width: 800,
    height: '90%',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    p: 4,
  };

  const getAppointments = async () => {
    let arr = []
    var now = moment(new Date());
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
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let appointmentDate = response.data[i].appointmentDate


          console.log("London", now)
          var end = moment(response.data[i].appointmentDate + " " + response.data[i].fromTime, "DD/MM/YYYY hh:mm a"); // another date

          var duration = moment.duration(now.diff(end));
          var days = duration.days();
          console.log("BCCCC", days)
          var hours = duration.hours();
          if (days > 0) {
            arr.push(response.data[i])
          }
          else if (days == 0) {
            console.log("London2", end)
            console.log("idi", hours)
            if (hours > 0) {
              arr.push(response.data[i])
            }
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
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={style}>
        <Grid container spacing={5}>
          {appointments.map((appointment) => (
            <Grid item xs={6}>
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {appointment.clinicId.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      <LocationOnIcon style={{ color: 'grey' }} />
                      {appointment.clinicId.city} -{appointment.clinicId.state}- {appointment.clinicId.zipcode}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {appointment.appointmentDate} -  {appointment.fromTime}
                    </Typography>

                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Box>
    </div>

  )
}


export default PastAppointments;
