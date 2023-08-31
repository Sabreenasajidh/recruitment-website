import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import configData from '../config/default.json'

function AddClient() {
    // const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const [val, setVal] = useState(false)
    const [key, setKey] = useState('')
    const [message, setMessage] = useState('')
    const [countries, setCountries] = useState([]);
    const [Cities, setCities] = useState([]);
    // const [concity, setConcity] = useState({
    //     country: '',
    //     city: ''
    // })

    const nav = useNavigate();

    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        let country = await axios.get(
            "https://countriesnow.space/api/v0.1/countries"
        );
        const countryList = configData.countryList
        const results = country.data.data.filter(con => countryList.includes(con.country));
        setCountries(results);
    };
    const handleChangeCountry = async (e) => {
        fetchCities(e.target.value)
    }
    const fetchCities = (country) => {
        const Cities = countries.find((c) => c.country === country);
        setCities(Cities.cities);
    };

    const backToHome = () => {
        nav('/client')
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email("Enter a valid email").required('Required'),
        phone_number: Yup.number().required("Required"),
        // address: Yup.string().required('Enter Address'),
        company_reg_no: Yup.string(),
        commercial_reg_no: Yup.string(),
        // sign_details:Yup.string().required('Required')



    });

    return (
        <div>
            <Header />

            <div className="container-small container">
                <div className="crud shadow-lg  mt-5  bg-body rounded col-xs-12">
                    <div className="row ">
                        <div className="my-3 text-gred text-center" style={{ color: "red" }}><h2><b>Add Client</b></h2></div>
                    </div>

                    {val ? <Alert key={key} variant={key}>
                        {message}
                    </Alert> : ''}
                    <Formik
                        const initialValues={{
                            name: '',
                            address: '',
                            phone_number: '',
                            email: '',
                            vat_status: true,
                            commercial_reg_no: '',
                            company_reg_no: '',
                            sign_details: '',
                            country: '',
                            city: ''
                        }}
                        validationSchema={schema}

                        onSubmit={async (values, { resetForm }) => {
                            const filterValues = Object.fromEntries(Object.entries(values).filter(([key, value]) => value != ''));
                            const result = await dispatch.ClientModel.addClient(filterValues)

                            if (result.data) {
                                resetForm({ values: '' })
                                sessionStorage.setItem("result", result.data);
                                nav('/client')

                            } else {
                                setMessage(result.error)
                                setKey('danger')
                                setVal(true)
                                setTimeout(() => {
                                    setVal(false)
                                }, 2000);
                            }

                        }
                        }
                        validateOnChange={true}
                        validateOnBlur={false}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched
                        }) => (
                            <Form className="p-5" noValidate onSubmit={handleSubmit}>
                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Client Name"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={touched.name && errors.name}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4 col-6" controlId="formBasicAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Client Address"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                        // isInvalid={touched.address && errors.address}
                                        // required 
                                        />
                                        {/* <Form.Control.Feedback type="invalid">
                                            {errors.address}
                                        </Form.Control.Feedback> */}
                                    </Form.Group>
                                </div>

                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicCountry">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select
                                            name="country"
                                            onChange={(e) => {
                                                // eslint-disable-next-line no-unused-expressions
                                                handleChangeCountry(e);
                                                handleChange(e);
                                            }}
                                            value={values.country}
                                        >
                                            <option
                                                value=""
                                                disabled={'Select your country'}
                                            >
                                                Select your country
                                            </option>
                                            {countries.map((country) => (
                                                <option key={country.country} value={country.country}>
                                                    {country.country}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-4 col-6" controlId="formBasicCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Select
                                            name="city"
                                            onChange={handleChange}
                                            value={values.city}
                                        >
                                            <option
                                                value=""
                                                disabled={'Select your City'}
                                            >
                                                Select your City
                                            </option>
                                            {Cities.map((city) => (
                                                <option key={city} value={city.city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </Form.Select>

                                    </Form.Group>

                                </div>

                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicPhone">
                                        <Form.Label>Phone no.</Form.Label>
                                        <Form.Control
                                            name="phone_number"
                                            value={values.phone_number}
                                            onChange={handleChange}
                                            isInvalid={touched.phone_number && errors.phone_number}
                                            type="number"
                                            placeholder="Enter Phone number"
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone_number}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4 col-6" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && errors.email}
                                            type="email"
                                            placeholder="Enter email"
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </div>

                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicRegNo">
                                        <Form.Label>Company Reg no</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder="Enter Company Reg no."
                                            value={values.company_reg_no}
                                            name="company_reg_no"
                                            onChange={handleChange}
                                        />
                                        {/* <Form.Control.Feedback type="invalid">
                                            {errors.company_reg_no}
                                        </Form.Control.Feedback> */}
                                    </Form.Group>

                                    <Form.Group className="mb-4 col-6" controlId="formBasicCommercial">
                                        <Form.Label>Commercial Reg no</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder="Enter commercial Reg no"
                                            value={values.commercial_reg_no}
                                            name="commercial_reg_no"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                </div>

                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicSign">
                                        <Form.Label>Authorised Sign Details</Form.Label>
                                        <Form.Control
                                            name="sign_details"
                                            value={values.sign_details}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter name and designation"
                                        />
                                    </Form.Group>


                                    <Form.Group className="mb-4 col-6" controlId="formBasicVat">
                                        <Form.Label>Vat Status</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            name="vat_status"
                                            onChange={handleChange}
                                            defaultChecked={values.vat_status}
                                            value={values.vat_status}

                                        />
                                    </Form.Group>


                                </div>

                                <div className="text-center mt-5 mb-5">
                                    <Button variant="secondary" onClick={backToHome} >
                                        BACK
                                    </Button>{' '}
                                    <Button variant="primary" type="submit" >
                                        SUBMIT
                                    </Button>

                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddClient