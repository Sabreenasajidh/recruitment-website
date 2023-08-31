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


const today = new Date();

function AddRecruitmentModal(props) {
    const dispatch = useDispatch();
    const [agreementList, setAgreementList] = useState([])
    const [date, setDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [val, setVal] = useState(props.val)
    const [key, setKey] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        getAgreement()
    }, [])

    const getAgreement = async () => {
        const agreement = await dispatch.AgreementModel.ListAgreements()
        if(agreement.data){
           const filteredAgreement = agreement.data.filter(x=>x.status == 'confirmed')
           const data = filteredAgreement.map(x => {
               return {
                   agreementName: `${x.Client.name}_${x.id}`,
                   id: x.id
               }
           })
           setAgreementList(data)
        }
        console.log(agreement);
    }

    const [validated, setValidated] = useState(false);


    const schema = Yup.object().shape({
        name: Yup.string().required('Required'),
        jobTitle: Yup.string().required('Required'),
        jobDesc: Yup.string().required('Required'),
        // date: Yup.date().required('Required'),
    });
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={props.show} onHide={props.hide} centered>


                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#f37a27" }}>New Recruitment</Modal.Title>
                </Modal.Header>
                <Formik
                    const initialValues={{
                        name: '',
                        closingDate: today,
                        jobTitle: '',
                        jobDesc: ''
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, { resetForm }) => {
                        values.AgreementId = parseInt(values.name.split('_')[1])
                        const newData = await dispatch.RecruitmentModel.AddNewRecruitment(values)
                        if (newData.data) {
                            resetForm({ values: '' })
                            setKey('success')
                            setMessage(newData.data.data)
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
                                        <Form.Select
                                            name="name"
                                            onChange={handleChange}
                                            value={values.name}
                                            isInvalid={touched.name && errors.name}
                                        >
                                            <option value="" defaultValue> Select </option>
                                            {agreementList && agreementList.map(x =>
                                                <option key={x.id} value={x.agreementName}> {x.agreementName} </option>

                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select an agreement.
                                        </Form.Control.Feedback>
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
                                        <Form.Label>Closing Date</Form.Label>

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
            {/* {val ? props.test() : null} */}
        </div>
    )
}

export default AddRecruitmentModal