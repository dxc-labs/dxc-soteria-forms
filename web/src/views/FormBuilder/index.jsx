import {makeStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Paper,
  CssBaseline,
  IconButton,
} from '@material-ui/core';

import React, {useEffect, useState, useMemo} from 'react';

import {getTest} from 'services/api';

import Form from 'components/Form';
import Header from 'components/Header';
import Footer from 'components/Footer';
import * as moment from 'moment';

import formData from './form.json';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function Quarantines() {
  const classes = useStyles();
  // const [quarantines, setQuarantines] = useState([]);

  // useEffect(() => {
  //   getQuarantines().then((quarantines) => {
  //     setQuarantines(quarantines);
  //   });
  // }, []);
  console.log(formData);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Form data={formData} />
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
}
