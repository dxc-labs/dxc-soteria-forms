import {makeStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Paper,
  CssBaseline,
  TextField,
} from '@material-ui/core';

import React, {useEffect, useState, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {getForm} from 'services/api';
import {getUserId} from 'services/urlParser';

import Form from 'components/Form';
import Header from 'components/Header';
import Footer from 'components/Footer';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function Forms() {
  const classes = useStyles();
  const route = useLocation();
  const formDataRef = useRef();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getUserId(route).then((userId) =>
      getForm(userId).then((form) => {
        setForm(form.form);
      }),
    );
  }, []);

  const handleChange = (event) => {
    if (isJsonString(event.target.value)) {
      setForm(JSON.parse(event.target.value));
    }
  };

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          {form ? (
            <Form
              title={form.title}
              subtitle={form.subtitle}
              questions={form.questions}
            />
          ) : null}
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Debug/Edit
            </Typography>

            <TextField
              ref={formDataRef}
              id="form-data"
              label="Form Data"
              placeholder="Form Data"
              multiline
              fullWidth
              value={JSON.stringify(form, null, 4)}
              onChange={handleChange}
              variant="filled"
            />
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
}
