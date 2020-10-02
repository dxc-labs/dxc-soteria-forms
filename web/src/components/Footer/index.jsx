import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'relative',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.footer}
    >
      V {process.env.REACT_APP_VERSION}
    </Typography>
  );
}
