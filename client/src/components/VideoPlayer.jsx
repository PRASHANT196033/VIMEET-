import React, { useContext } from 'react';
import { Grid, Typography, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../Context';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '700px',
   [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    flexWrap:'nowrap',
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  function muteMic(targetStream) {
    console.log(targetStream);
    targetStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  }
  
  function muteCam(targetStream) {
    targetStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    console.log(targetStream);
  }

  return (
    <Grid container className={classes.gridContainer}>
      {
      stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            {/* <button onClick={()=>muteMic(stream)}>Mute Mic</button>
            <button onClick={()=>muteCam(stream)}>Mute Video</button> */}
            <IconButton color='primary' onClick={()=>muteMic(stream)}><VolumeOffIcon/></IconButton>
            <IconButton color='primary' onClick={()=>muteCam(stream)}><VideocamOffIcon/></IconButton>
         
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
            {/* <button onClick={()=>muteMic(userVideo)}>Mute Mic</button>
            <button onClick={()=>muteCam(userVideo)}>Mute Video</button> */}
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
