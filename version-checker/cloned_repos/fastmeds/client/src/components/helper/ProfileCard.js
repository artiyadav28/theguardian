import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {FaPhone,FaEnvelope,FaMapMarkerAlt} from 'react-icons/fa';
export default function MultiActionAreaCard({user}) {
  return (
   user &&  <Card sx={{ maxWidth: 700 }} style={{margin:"auto"}}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
        //   image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h3" component="div" sx={{mt:1}}>
            {user.name} <small>{user.userType}</small>
          </Typography>
          <Typography variant="h5" color="text.secondary"sx={{mt:1}}>
           <FaPhone /> {user.contact}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{mt:1}}>
          <FaEnvelope /> {user.email}
          </Typography>
          <Typography variant="h5" color="text.secondary"sx={{mt:1}}>
          <FaMapMarkerAlt /> {user.address}
          </Typography>
          <Typography variant="h5" color="text.secondary"sx={{mt:1}}>
          Latitude: {user.latitude}
          </Typography>
          <Typography variant="h5" color="text.secondary"sx={{mt:1}}>
          Longitude: {user.longitude}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
