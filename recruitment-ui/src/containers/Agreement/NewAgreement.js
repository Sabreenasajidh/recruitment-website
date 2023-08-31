import React, { useState } from 'react'
import Header from '../Header/Header'
import { Button, Form, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../config/default.json';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';




function NewAgreement() {
    const [client, setClient] = useState([])
    const [structure, setStructure] = useState([])
    const [status, setStatus] = useState([])
    const [val, setVal] = useState(false)
    const [key, setKey] = useState('')
    const [message, setMessage] = useState('')

    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getClientsNames()
    }, [])

    const backToHome = () => {
        nav('/agreement')
    }

    const schema = Yup.object().shape({
        ClientId: Yup.string().required('Required'),
        duration: Yup.number().required('Required'),
        payment_schedule: Yup.number().required('Required'),
        referal_validity: Yup.number().required('Required'),
        sales_person: Yup.string().required('Required')
    });

    const getClientsNames = async () => {
        const getNames = await dispatch.AgreementModel.getClientsNames()
        if (getNames.data) {
            setClient(getNames.data)
            setStructure(config.structure)
            setStatus(config.agreement_status)
        }
    }
    return (
        <div>
            <Header />

            <div className="container-small container">
                <div className="crud shadow-lg  mt-5  bg-body rounded col-xs-12">
                    <div className="row ">
                        <div className="my-3 text-gred text-center"
                            style={{ color: "red" }}
                        ><h2><b>Add Agreement</b></h2>
                        </div>
                    </div>
                    {val ? <Alert key={key} variant={key}>
                        {message}
                    </Alert> : ''}
                    <Formik
                        const initialValues={{
                            ClientId: '',
                            duration: '',
                            fees_structure: 'basic',
                            payment_schedule: '',
                            status: 'drafted',
                            referal_validity: 2,
                            additional_data: '',
                            sales_person: ''
                        }}
                        validationSchema={schema}
                        onSubmit={async (values, { resetForm }) => {
                            console.log(values);
                            const filterValues = Object.fromEntries(Object.entries(values).filter(([key, value]) => value != ''));
                            const result = await dispatch.AgreementModel.createAgreemant(filterValues)
                            if (result.data) {
                                resetForm({ values: '' })
                                sessionStorage.setItem("result", result.data);
                                nav('/agreement')
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
                                    <Form.Group className="mb-4 col-6" controlId="formBasicClient">
                                        <Form.Label>Client</Form.Label>
                                        <Form.Select
                                            name="ClientId"
                                            onChange={handleChange}
                                            value={values.ClientId}
                                            isInvalid={touched.ClientId && errors.ClientId}

                                        >
                                            <option value="" disabled={'Select'}> Select </option>
                                            {client.map((xx) => (
                                                <option key={xx.name} value={xx.id}>
                                                    {xx.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ClientId}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicAgreement">
                                        <Form.Label>Duration of the Agreement</Form.Label>
                                        <Form.Control
                                            name="duration"
                                            value={values.duration}
                                            onChange={handleChange}
                                            isInvalid={touched.duration && errors.duration}
                                            type="number"
                                            placeholder="Enter Duration of Agreemnet"
                                        //required 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.duration}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicFees">
                                        <Form.Label>Fess Structure</Form.Label>
                                        <Form.Select
                                            name="fees_structure"
                                            onChange={handleChange}
                                            value={values.fees_structure}
                                        >
                                            <option value="" disabled={'Select'}> Select </option>
                                            {structure && structure.map((xx) => (
                                                <option key={xx} value={xx}>
                                                    {xx.charAt(0).toUpperCase() + xx.slice(1)}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicPayment">
                                        <Form.Label>Payment Schedule</Form.Label>
                                        <Form.Control
                                            name="payment_schedule"
                                            value={values.payment_schedule}
                                            onChange={handleChange}
                                            isInvalid={touched.payment_schedule && errors.payment_schedule}
                                            type="number"
                                            placeholder="Enter payment Schedule"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.payment_schedule}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicStatus">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            name="status"
                                            onChange={handleChange}
                                            value={values.status}
                                        >

                                            {status.map((xx) => (
                                                xx == 'drafted' ? <option key={xx} value={xx}>{xx.charAt(0).toUpperCase() + xx.slice(1)} </option> :
                                                    <option key={xx} value={xx} disabled> {xx.charAt(0).toUpperCase() + xx.slice(1)} </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicSalesPerson">
                                        <Form.Label>Sales Person</Form.Label>
                                        <Form.Select
                                            name="sales_person"
                                            onChange={handleChange}
                                            value={values.sales_person}
                                            isInvalid={touched.sales_person && errors.sales_person}
                                        >
                                            <option value="" disabled={'Select'}> Select </option>
                                            {config.persons.map(person =>
                                                <option key={person.id} value={person.id}>{person.name}</option>
                                            )}
                                        </Form.Select>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.sales_person}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicReferal">
                                        <Form.Label>Referal Validity</Form.Label>
                                        <Form.Select
                                            name="referal_validity"
                                            onChange={handleChange}
                                            value={values.referal_validity}
                                            isInvalid={touched.referal_validity && errors.referal_validity}
                                        >
                                            <option value="" disabled={'Select'}> Select </option>
                                            {config.referal_validity.map(validity =>
                                                // validity == 2? <option key={validity} value={validity} defaultValue>{validity}</option>:
                                                <option key={validity} value={validity}>{validity}</option>
                                            )}
                                        </Form.Select>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.referal_validity}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4 col-6" controlId="additionaldata">
                                        <Form.Label>Additional data</Form.Label>
                                        <Form.Control as="textarea" rows={3}
                                            placeholder="Additional terms and conditions"
                                            onChange={handleChange}
                                            value={values.additional_data}
                                            name="additional_data"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="text-center mt-5 mb-5">
                                    <Button variant="secondary" onClick={backToHome}>
                                        BACK
                                    </Button>{' '}
                                    <Button variant="primary" type="submit" >
                                        SUBMIT
                                    </Button>

                                </div>
                            </Form>
                        )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default NewAgreement