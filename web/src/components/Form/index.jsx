import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {
  Typography,
  Paper,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function Form({title, subtitle, questions}) {
  const classes = useStyles();

  const LinearScale = ({title, min, max, step, marks}) => {
    const markList = [];
    for (let i = min; i < max; i = i + marks) {
      markList.push({value: i, label: i});
    }

    function valuetext(value) {
      return `${value}°C`;
    }

    return (
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <Slider
          min={min}
          max={max}
          defaultValue={min}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={step}
          marks={markList}
          valueLabelDisplay="on"
        />
      </Paper>
    );
  };

  const Checkboxes = ({title, options}) => {
    return (
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <FormGroup>
          {options.map((option, i) => {
            return (
              <FormControlLabel
                control={<Checkbox name={option} />}
                label={option}
              />
            );
          })}
        </FormGroup>
      </Paper>
    );
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="left">
            {title}
          </Typography>
          <Typography variant="subtitle1" align="left">
            {subtitle}
          </Typography>

          {questions.map((question, i) => {
            if (question.type === 'Checkboxes') {
              return (
                <Checkboxes title={question.title} options={question.options} />
              );
            } else if (question.type === 'LinearScale') {
              return (
                <LinearScale
                  title={question.title}
                  min={question.min}
                  max={question.max}
                  step={question.step}
                  marks={question.marks}
                />
              );
            }
          })}
        </Paper>
      </Grid>
    </Grid>
  );
}
