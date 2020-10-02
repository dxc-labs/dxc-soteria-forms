import React from 'react';
import {
    Typography,
    Paper,
    Grid,
    TextField,
    makeStyles,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Slider,
    Radio,
    RadioGroup, Select, MenuItem, FormControl, InputLabel, Chip, ListItemText, Button, Container
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import logo from '../../assets/img/Loading_icon.gif';
import { getErrorMessage } from '../../services/errorMessages';
import * as HttpStatus from 'http-status-codes'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
    }
}));

export default function FormGenerator({ id, formGroup, register, formSubmit }) {
    const classes = useStyles();
    const [form, setForm] = useState(false);
    const [statusCode, setstatusCode] = useState(null);
    const [error, seterror] =  useState('');

    var multiSelectAttributes=[];

    const handleSubmit = async (event) => {
        event.preventDefault()

        let result = {};
        const formData = new FormData(event.target);
        for (var [key, value] of formData.entries()) {
            if(multiSelectAttributes.includes(key)){
                result[key]=value.split(",");
            } else {
                result[key]=value;
            }
        }
        formSubmit(result);
    }

    useEffect(() => {     
        async function fetchData() {
            try{
                let baseURL= `https://${process.env.REACT_APP_API_USER_DOMAIN}/forms`
                let response = await axios.get(`${baseURL}/${id}/${formGroup}`)
                setstatusCode(response.status)
                if( response.status === 200 ){
                    setForm(response.data.form)
                }
            } catch (error) {
                if (error.response == null){
                    seterror('Oops, Something Went Wrong')
                } else {
                    if(error.response.status === 404){
                        seterror(getErrorMessage(error.response.status))
                    } else {
                        seterror(getErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR))
                    }
                }
            }
        }
        fetchData();
    }, [surveyId, sk,statusCode]);

    const Checkboxes = ({ title, options }) => {
        const arrayList = [];
        const handleChange = (event) => {
           if(event.target.checked){
                arrayList.push({[event.target.name]: event.target.checked});
                alert(JSON.stringify(arrayList));
            }else{
                //arrayList.splice({[event.target.name]: event.target.checked}, 0);
                arrayList.splice(arrayList.indexOf({[event.target.name]: event.target.checked}), 1);
                alert(JSON.stringify(arrayList));
            }

        };
        return (
            <Paper className={classes.paper} variant="outlined">
                <Typography variant="h6" align="left">
                    {title}
                </Typography>
                <FormGroup>
                    {options.map((option, i) => {
                        return (
                            <FormControlLabel
                                control={<Checkbox name={option}  onChange={handleChange} />}
                                label={option}
                                inputRef={register}
                                key={option}
                                
                            />
                        );
                    })}
                </FormGroup>
            </Paper>
        );
    };

    const TextFields = ({ title }) => {
        return (
            <Grid className={classes.paper}>
                <TextField
                    name={title.name}
                    label={title.field}
                    type={title.type}
                    variant='outlined'
                    fullWidth
                    required={title.required}
                    inputRef={register} />
            </Grid>
        )
    }

    const DateTime = ({ title }) => {
        return (
            <Grid className={classes.paper}>
                <TextField
                    name={title.name}
                    label={title.field}
                    type={title.type}
                    variant='outlined'
                    fullWidth
                    required={title.required}
                    inputRef={register}
                    InputLabelProps={{
                        shrink: true,
                    }} />
            </Grid>
        )
    }

    const Typographys = ({ title }) => {
        return (
            <Grid className={classes.paper}>
                <Typography variant="h6" align="left">
                    {title.field}
                </Typography>
            </Grid>
        )
    }

    const IAgree = ({ title }) => {
        return (
            <Grid className={classes.paper}>
                <FormControlLabel
                    control={<Checkbox
                        name={title.name}
                        required={title.required}
                    />}
                    label={title.field}
                />
            </Grid>
        )
    }

    const RadioSelect = ({ title, radioOptions }) => {
        return (
            <Grid className={classes.paper}>
                <Typography variant="h6" align="left">
                    {title.field}
                </Typography>
                 <RadioGroup aria-label="gender" name={title.name}>
                   {radioOptions.map((radioOption, i) => {
                        return (
                        <FormControlLabel
                            control={<Radio
                                required={title.required}
                                inputRef={register}
                            />}
                            label={radioOption}
                            value={radioOption}
                            key={radioOption} />
                        );
                    })}
                </RadioGroup>
            </Grid>
        )
    }

    const LinearScale = ({title, min, max, step, marks}) => {
        const markList = [];
        const [value, setValue] = React.useState(36);
        for (let i = min; i < max; i = i + marks) {
          markList.push({value: i, label: i});
        }

        function valuetext(value) {
            console.log('valuetext ',value);
          return `${value}°C`;
        }

        const handleSliderChange = (event, newValue) => {
            console.log('newValue --- ',newValue);
            setValue(newValue);
        };

        const handleInputChange = (event) => {
            setValue(event.target.value === '' ? '' : Number(event.target.value));
          };

        return (
        <Grid className={classes.paper}>
         <Typography variant="h6" align="left" style={{ marginBottom:34 }}>
                {title.field}
            </Typography>
            <Slider style={{ marginLeft:8 }}
                min={min}
                max={max}
                defaultValue={min}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={step}
                marks={markList}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={typeof value === 'number' ? value : 0}
                />
            <TextField
                    name={title.name}
                    type={title.type}
                    onChange={handleInputChange}
                    required={title.required}
                    value={value}
                    variant='outlined'
                    inputProps={{
                        step: 0.1,
                        min: 36,
                        max: 40
                    }}
                    inputRef={register} />
         </Grid>
        );
      };

      const RequestReason = ({ title, selectOptions }) => {
        const theme = useTheme();
        const useStyles = makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 155,
              maxWidth: 300,
            },
            chips: {
              display: 'flex',
              flexWrap: 'wrap',
            },
            chip: {
              margin: 2,
            },
            noLabel: {
              marginTop: theme.spacing(3),
            }
          }));
          
          const ITEM_HEIGHT = 48;
          const ITEM_PADDING_TOP = 8;
          const MenuProps = {
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
          };



          function getStyles(selectOptions, selectVal, theme) {
            return {
                fontWeight:
                    selectVal.indexOf(selectOptions) === -1
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium,
                color:
                    selectVal.indexOf(selectOptions) === -1
                        ? '#000000'
                        : '#ffed00',
                backgroundColor:
                    selectVal.indexOf(selectOptions) === -1
                        ? '#FFFFFF'
                        : '#000000',
                marginBottom:
                    selectVal.indexOf(selectOptions) === -1
                            ? '2px'
                            : '1px',
                };
          }

          function getCheckBoxStyles(selectOptions, selectVal, theme) {
            return {
                color:
                    selectVal.indexOf(selectOptions) === -1
                        ? '#000000'
                        : '#ffed00',
                }
            }


        const classes = useStyles();
        const [selectVal, setSelectVal] = React.useState([]);

        const handleChange = (event) => {
            setSelectVal(event.target.value);
        };

        return (
            <Grid className={classes.paper}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">{title.field}</InputLabel>
                    <Select
                     labelId="demo-mutiple-chip-label"
                     id="demo-mutiple-chip"
                    multiple
                    value={selectVal}
                    onChange={handleChange}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} color="secondary"/>
                          ))}
                        </div>
                      )}
                    MenuProps={MenuProps}
                    name={title.name}
                    inputRef={register}
                    style={{minHeight:50}}
                    >
                    {selectOptions.map((selectOption) => (
                        <MenuItem key={selectOption} value={selectOption} style={getStyles(selectOption, selectVal, theme)}>
                            <Checkbox checked={selectVal.indexOf(selectOption) > -1} style={getCheckBoxStyles(selectOption, selectVal, theme)}/>
                            <ListItemText primary={selectOption} />
                       </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
        )
    };

    const SubmitButton = ({ title }) => {
        return (
            <Grid className={classes.paper}>
                <Button type={title.type} variant="contained" color="secondary">
                {title.field}
                </Button>
            </Grid>
        )
    }

    const SelectBox = ({ title, singleSelectOptions }) => {
        const useStyles = makeStyles((theme) => ({
            formControl: {
                marginLeft: theme.spacing(3),
                minWidth: 120
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));
        const classes = useStyles();
        const [value, setValue] = React.useState('');

        const handleChange = (event) => {
            setValue(event.target.value);
        };
        return (
            <Grid className={classes.paper}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">{title.field}</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    onChange={handleChange}
                    label={title.field}
                    name={title.name}
                    inputRef={register}
                    >
                    {singleSelectOptions.map((singleOption) => (
                        <MenuItem key={singleOption} value={singleOption}>{singleOption}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
        )
    };

    if (error) throw error;

    if (!form) return <Container maxWidth="xs"><img src={logo} alt="loading..."/></Container>;

    return (
        <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
                {form.title}
            </Typography>
            <Typography variant="subtitle1" align="left">
            {form.subtitle}
          </Typography>
            {form.questions.map((question, i) => {
                if (question.type === 'Checkboxes') {
                    return (
                        <Checkboxes
                            key={question.options}
                            title={question.title}
                            options={question.options}
                        />
                    );
                } else if (question.type === 'TextFields') {
                    return (
                        <TextFields
                            key={question.options.key}
                            title={question.options}
                        />
                    );
                } else if (question.type === 'DateTime') {
                    return (
                        <DateTime
                            key={question.options.key}
                            title={question.options}
                        />
                    );
                } else if (question.type === 'Typographys') {
                    return (
                        <Typographys
                            key={question.options.key}
                            title={question.options}
                        />
                    );
                } else if (question.type === 'IAgree') {
                    return (
                        <IAgree
                            key={question.options.key}
                            title={question.options}
                        />
                    );
                }else if (question.type === 'RadioSelect') {
                    return (
                        <RadioSelect
                            key={question.options.key}
                            title={question.options}
                            radioOptions={question.options.radioOption}
                        />
                    );
                }else if (question.type === 'LinearScale') {
                    return (
                      <LinearScale
                        key={question.options.key}
                        title={question.options}
                        min={question.options.min}
                        max={question.options.max}
                        step={question.options.step}
                        marks={question.options.marks}
                      />
                    );
                }else if (question.type === 'RequestReason') {
                    multiSelectAttributes.push(question.options.name)
                    return (
                      <RequestReason
                        key={question.options.key}
                        title={question.options}
                        selectOptions={question.options.selectOption}
                      />
                    );
                }else if (question.type === 'SubmitButton') {
                    return (
                        <SubmitButton
                            key={question.options.key}
                            title={question.options}
                        />
                    );
                }else if (question.type === 'SelectBox') {
                    return (
                      <SelectBox
                        key={question.options.key}
                        title={question.options}
                        singleSelectOptions={question.options.singleSelectOptions}
                      />
                    );
                }else {
                    return null;
                }
            })}
        </Paper>
        </form>
    );
}
