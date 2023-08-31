import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useParams, useLocation } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import congigData from '../config/default.json'

//import fs from 'file-system';


function EditCandidate() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const params = useParams();
  // const location = useLocation();
  let [countries, setCountries] = useState([]);
  let [cities, setCities] = useState({});
  let [cityArray, setCityArray] = useState([])
  const [data, setData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    company_reg_no: null,
    commercial_reg_no: null,
    vat_status: true,
    sign_details: '',
    country: '',
    city: ''
  })
  const [val, setVal] = useState(false)
  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')

  // const status_options = [
  //   { name: 'enable' },
  //   { name: 'disable' }

  // ]
  //const [validated, setValidated] = useState(false);



  useEffect(() => {
    getClient()

  }, [])
  const handleChangeCountry = async (e) => {
    fetchCities(e.target.value)
  }

  const fetchCountries = async (con) => {
    let country = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    const countryList = congigData.countryList
    const results = country.data.data.filter(con => countryList.includes(con.country));
    setCountries(results);
    let dd = results.filter(xx => xx.country == con);
    let yy = dd.map(xx => xx.cities);
    setCityArray(yy[0])


  };
  const fetchCities = (country) => {
    const Cities = countries.find((c) => c.country === country);
    setCities(Cities);
    setCityArray(Cities.cities)
  };

  const getClient = async () => {
    const { id } = params
    const client = await dispatch.ClientModel.getClient(id)
    if (client) {
      const candDet = {
        name: client.name,
        email: client.email,
        phone_number: client.phone_number,
        address: client.address,
        vat_status: client.vat_status,
        company_reg_no: client.company_reg_no,
        commercial_reg_no: client.commercial_reg_no,
        sign_details: client.sign_details,
        country: client.country,
        city: client.city
      }
      setData(candDet)
    }
    fetchCountries(client.country)
  }
  const backToHome = () => {
    nav('/client')
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email("Enter a valid email").required('Required'),
    phone_number: Yup.number().required("Required"),
  });

  return (
    <div><Header></Header>

      <div className="container-small container">
        <div className="crud shadow-lg  mt-5  bg-body rounded col-xs-12">
          {/* <div className="  justify-content-center align-items-center mt-5 shadow-lg p-3"> */}

          <div className="row ">


            <div className="my-3 text-gred text-center" style={{ color: "red" }}><h2><b>Edit Client</b></h2></div>

          </div>
          {val ? <Alert key={key} variant={key}>
            {message}
          </Alert> : ''}

          <Formik enableReinitialize={true}
            const initialValues={{
              name: data.name ? data.name : '',
              email: data.email ? data.email : '',
              phone_number: data.phone_number ? data.phone_number : '',
              address: data.address ? data.address : '',
              vat_status: data.vat_status ? data.vat_status : false,
              company_reg_no: data.company_reg_no ? data.company_reg_no : '',
              commercial_reg_no: data.commercial_reg_no ? data.commercial_reg_no : '',
              sign_details: data.sign_details ? data.sign_details : '',
              country: data.country ? data.country : '',
              city: data.city ? data.city : ''

            }}

            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              const filterValues = Object.fromEntries(Object.entries(values).filter(([key, value]) => value != ''));
              const { id } = params
              const data = { value:filterValues, id }
              console.log(data);

              const result = await dispatch.ClientModel.updateClient(data)

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
            }}
            validateOnChange={true}
            validateOnBlur={false}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
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
                        setFieldValue("city", '')
                      }}
                      value={values.country}
                    >
                      {values.country ? <option>{values.country}</option> : <option>Select your Country</option>}

                      {countries.map((country) =>
                        country.country === values.country ? null :
                          <option key={country.country} value={country.country}>
                            {country.country}
                          </option>
                      )}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4 col-6" controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Select
                      name="city"
                      onChange={handleChange}
                      value={values.city}
                    >
                      {values.city ?
                        cities.country ?
                          <option>Select</option> : <option>{values.city}</option> :
                        <option>Select your country</option>}
                      {cityArray ? cityArray.map(xx => xx == values.city ? null : <option key={xx} value={xx}>{xx}</option>) : null}
                      {/* {cities.country ? <option>Select</option> : <option>{values.city}</option>} */}
                      {cities.cities ? cities.cities.map(xx => <option key={xx} value={xx}>{xx}</option>) : null}
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
                    // isInvalid={touched.company_reg_no && errors.company_reg_no}
                    // required 
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
                    // isInvalid={touched.commercial_reg_no && errors.commercial_reg_no}
                    // required 
                    />
                    {/* <Form.Control.Feedback type="invalid">
                                            {errors.commercial_reg_no}
                                        </Form.Control.Feedback> */}
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
                    // isInvalid={touched.sign_details && errors.sign_details}
                    // required
                    />
                    {/* <Form.Control.Feedback type="invalid">
                                            {errors.sign_details}
                                        </Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group className="mb-4 col-6" controlId="formBasicVat">
                    <Form.Label>Vat Status</Form.Label>
                    <Form.Check
                      type="switch"
                      name="vat_status"
                      onChange={handleChange}
                      // defaultChecked={values.vat_status}
                      value={values.vat_status}
                      checked={values.vat_status ? values.vat_status : false}
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
          <ToastContainer />
        </div>
      </div>
    </div >

  )
}


export default EditCandidate