import {makeStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Paper,
  CssBaseline,
  IconButton,
} from '@material-ui/core';

import React, {useEffect, useState, useMemo} from 'react';
import {Pageview} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {getForms} from 'services/api';

import Table from 'components/Table';
import Form from 'components/Form';
import Header from 'components/Header';
import Footer from 'components/Footer';
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function Forms() {
  const classes = useStyles();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    getForms().then((forms) => {
      setForms(forms);
    });
  }, []);

  const cellActions = (e) => {
    const row = e.row.original;
    return (
      <Link to={`/forms/${row.pk}`}>
        <IconButton aria-label="view" color="primary">
          <Pageview />
        </IconButton>
      </Link>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'PK',
        accessor: 'pk',
      },
      {
        Header: 'SK',
        accessor: 'sk',
      },
      {
        Header: 'Title',
        accessor: 'form.title',
      },
      {
        Header: 'Actions',
        accessor: '',
        Cell: cellActions,
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Table columns={columns} data={forms} />
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
}
