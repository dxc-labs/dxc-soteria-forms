import React, { useState, useEffect }  from 'react';
import {
    Paper,
    Container,
    Button,
    makeStyles,
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core';
//import formData from './form.json';
import { useForm } from 'react-hook-form'
import FormGenerator from 'components/FormGenerator';
import Header from 'components/Header';
import Footer from 'components/Footer';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
}));
const colorTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#00000",
            main: "#000000",
            dark: "#00000",
            contrastText: "#ffed00"
        },
        secondary: {
            light: '#d9d9d9',
            main: '#000000',
            contrastText: '#ffed00',
        }
    }
});

export default function SampleForm() {
    const classes = useStyles();
    const { register } = useForm();
    const [data, setdata] = useState(null);

    useEffect(() => {
        if(!data) {
            console.log('No Data found')
        }
    })


    /*function onSubmit(data) {
        console.log(JSON.stringify(data))
        setdata(JSON.stringify(data));
    }*/

    function handleSubmit (event) {
        event.preventDefault()

        let result = {};
        var symptoms_array = [];
        const formData = new FormData(event.target);
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
             if(key == "symptoms"){
                symptoms_array = value.split(",");
                result[key] = symptoms_array;
             }else{
                result[key] = value;
             }
        }
        console.log("result ---> ", result);
    }

    return (
        <div>
        <Header />
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <ThemeProvider theme={colorTheme}>
                        <FormGenerator
                            // E.g: formId is 068bd99c-763c-4b01-8853-7e527ef12000
                            //formId="068bd99c-763c-4b01-8853-7e527ef12000"
                            name="sampleFormRegister"
                            location="singapore"
                            register={register}
                        />
                        <Button className={classes.button} type="submit" color="secondary" variant="contained" >
                            Submit
                        </Button>
                    </ThemeProvider>
                </form>
                <div>{data}</div>
            </Paper>
        </Container>
        <Footer />
        </div>
    );
}
