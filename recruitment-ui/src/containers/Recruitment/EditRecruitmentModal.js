import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';



function EditRecruitmentModal(props) {
    const today = new Date();

    const dispatch = useDispatch();
    const [date, setDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [val, setVal] = useState(props.val)
    const [key, setKey] = useState('')
    const [info,setInfo] = useState(props.data)
    const [message, setMessage] = useState('')
    const params = useParams();
    const { id } = params
  

    const [validated, setValidated] = useState(false);


    const schema = Yup.object().shape({
        name: Yup.string().required('Required'),
        jobTitle: Yup.string().required('Required'),
        jobDesc: Yup.string().required('Required'),
        // closingDate: Yup.date().required('Required'),
    });
    return (
        <div>
            <Modal show={props.show} onHide={props.hide} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#f37a27" }}>Edit Recruitment</Modal.Title>
                </Modal.Header>
                <Formik
                    const initialValues={{
                        name: info.Agreement.Client.name,
                        closingDate: info?new Date(info.closingDate):today,
                        jobTitle: info?info.jobTitle:'',
                        jobDesc: info?info.jobDesc:''

                    }}
                    validationSchema={schema}
                    onSubmit={async (values, { resetForm }) => {
                        const op = {values,id}
                        // values.AgreementId = parseInt(values.name.split('_')[1])
                        const newData = await dispatch.RecruitmentModel.UpdateRecruitment(op)
                        if (newData.data) {
                            resetForm({ values: '' })
                            setKey('success')
                            setMessage(newData.data)
                            setVal(true)
                            setTimeout(() => {
                                setVal(false)
                                return (
                                    props.handleCallback(1)
                                )
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
                        setFieldTouched,
                        values,
                        errors,
                        touched
                    }) => (
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Row className="mb-3">
                                    {val ? <Alert key={key} variant={key}>
                                        {message}
                                    </Alert> : ''}
                                    <Form.Group as={Col} md="10" controlId="validationCustom03" className="mx-5 mb-3">
                                        <Form.Label>Agreement</Form.Label>
                                        <Form.Control
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            //isInvalid={touched.duration && errors.duration}
                                            type="text"
                                            disabled
                                        // placeholder="Enter Duration of Agreemnet"
                                        //required 
                                        />
                                     </Form.Group>   

                                    <Form.Group as={Col} md="10" controlId="validationCustom03" className="mx-5 mb-3">
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Job Title"
                                            name="jobTitle"
                                            value={values.jobTitle}
                                            onChange={handleChange}
                                            isInvalid={touched.jobTitle && errors.jobTitle} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.jobTitle}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="10" controlId="validationCustom03" className="mx-5 mb-3">
                                        <Form.Label>Job Description</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Job desc"
                                            name="jobDesc"
                                            value={values.jobDesc}
                                            onChange={handleChange}
                                            isInvalid={touched.jobDesc && errors.jobDesc} />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.jobDesc}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="10" controlId="validationCustom03" className="mx-5 mb-3">
                                        <Form.Label>Date</Form.Label>

                                        <DatePicker
                                            selected={values.closingDate}
                                            placeholder="Select"
                                            onChange={(e) => {
                                                setFieldValue('closingDate', e);
                                                setFieldTouched('closingDate');
                                            }}
                                            className="form-control"
                                            minDate={today}
                                            customInput={
                                                <Form.Control type="text" placeholder="select a date"
                                                    name="closingDate"
                                                    value={values.closingDate}
                                                    onChange={handleChange}
                                                // isInvalid={touched.date && errors.date} 
                                                />
                                            }
                                        />
                                        {/* <Form.Control.Feedback type="invalid"> */}
                                        {/* <p style={{ color: '#dc3545', fontSize: '.87rem' }}>{touched.date && !!errors.date && errors.date}</p> */}
                                        {/* </Form.Control.Feedback> */}
                                    </Form.Group>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit">Submit</Button>
                                <Button variant="secondary" onClick={props.hide}>Close</Button>
                            </Modal.Footer>

                        </Form>

                    )}
                </Formik>
            </Modal>
        </div>
    )
}

export default EditRecruitmentModal