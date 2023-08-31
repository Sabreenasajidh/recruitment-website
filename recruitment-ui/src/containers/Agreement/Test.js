
import React from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
// import style from '../styles/Contact.module.css';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';


const dropdown = [
    {
        key: "Select an option",
        value: ""
    },
    {
        key: "Option 1",
        value: "option1"
    },
    {
        key: "Option 2",
        value: "option2"
    },
    {
        key: "Option 3",
        value: "option3"
    }
]




// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Schema for yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "*Names must have at least 2 characters")
        .max(30, "*Names can't be longer than 30 characters")
        .required("*Name is required"),
    email: Yup.string()
        .email("*Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    phone: Yup.string()
        .min(10, "*Names can't be longer than 10 numbers")
        .matches(phoneRegExp, "*Phone number is not valid")
        .required("*Phone number required"),

    msg: Yup.string()
        .min(2, "*Messages must have at least 2 characters")
        .max(250, "*Messages can't be longer than 250 characters")
        .required("*Messages is required"),

    selectionOption: Yup.string()
        // .of(Yup.string())
        // .min(1)
        .required('Required'),
});

const Test = () => {

    return (
        <>

            <Formik
                initialValues={{ name: "", email: "", phone: "", msg: "", selectionOption: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    console.log(values)
                    setSubmitting(true);

                    // Simulate submitting to database, shows us values submitted, resets form
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        resetForm();
                        setSubmitting(false);
                    }, 500);
                }}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (

                    <Form className="form" onSubmit={handleSubmit} autoComplete="off" name="contact" method="POST" >
                        <Row className="mb-5">
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group controlId="formName">
                                    <Form.Label className="form_label" >FullName</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        className={touched.name && errors.name ? "has-error" : null}
                                    />
                                    {touched.name && errors.name ? (
                                        <div className="error-message">{errors.name}</div>
                                    ) : null}
                                </Form.Group>
                            </Col>


                            <Col lg={6} md={6} sm={12}>
                                <Form.Group>
                                    <Form.Label className="form_label" >Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        className={touched.phone && errors.phone ? "has-error" : null}
                                    />
                                    {touched.phone && errors.phone ? (
                                        <div className="error-message">{errors.phone}</div>
                                    ) : null}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className="mb-5">
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group>
                                    <Form.Label className="form_label" >Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={touched.email && errors.email ? "has-error" : null}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="error-message">{errors.email}</div>
                                    ) : null}
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                {/* <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select> */}
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Example select</Form.Label>
                                    <Form.Control as="select" name="selectionOption" onChange={handleChange}
                                        onBlur={handleBlur} value={values.selectionOption}
                                        className={touched.selectionOption && errors.selectionOption ? "has-error" : null}
                                    >
                                        {
                                            dropdown.map(drop => {
                                                return (
                                                    <option key={drop.value} value={drop.value}>
                                                        {drop.key}

                                                    </option>
                                                )
                                            }
                                            )
                                        }
                                    </Form.Control>
                                    {/* <ErrorMessage name="selectionOption"></ErrorMessage> */}

                                    {touched.selectionOption && errors.selectionOption ? (
                                        <div className="error-message">{errors.selectionOption}</div>
                                    ) : null}

                                    {/* <Form.Label>Example select</Form.Label>
                    <Field as="select" name ="selectionOption" onChange={handleChange}
                                        onBlur={handleBlur}  value={values.selectionOption}
                                        style={{ display: "block" }}
                                        // isValid={touched.selectionOption && !errors.selectionOption}
                                        // isInvalid={!errors.selectionOption}

                                        className={touched.selectionOption && errors.selectionOption ? "has-error" : null}
                                    
                                        
                                    
                                        
                                        >
                        
                        <option className='text-muted'>---</option>
      <option value="ortho">ortho</option>
      <option value="pedri">pedri</option>
      <option value="crown">crown</option>
                     
      </Field>
      {touched.selectionOption && errors.selectionOption ? (
                                        <div className="error-message">{errors.selectionOption}</div>
                                    ) : null} */}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={12} md={12} sm={12}>
                                <Form.Group controlId="formmsg">
                                    <Form.Label>Messages :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="msg"
                                        as="textarea" rows={4}
                                        placeholder="Query / Feedback"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.msg}
                                        className={touched.msg && errors.msg ? "has-error" : null}
                                    />
                                    {touched.msg && errors.msg ? (
                                        <div className="error-message">{errors.msg}</div>
                                    ) : null}
                                </Form.Group>
                            </Col>

                        </Row>

                        <Button type="submit"  name="contact" id="contact" disabled={isSubmitting}>
                            <Image src="img/send.png"  />
                            <span >Submit</span>
                        </Button>
                    </Form>
                )}

            </Formik>

        </>
    )
}
export default Test;