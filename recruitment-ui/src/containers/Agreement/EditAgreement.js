import React, { useState } from 'react'
import Header from '../Header/Header'
import { Formik } from 'formik';
import { Button, Form, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config/default.json';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import BasicDocument from './BasicDocument';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import _ from 'lodash';

function EditAgreement() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const params = useParams();


    const [val, setVal] = useState(false)
    const [key, setKey] = useState('')
    const [message, setMessage] = useState('')
    const [structure, setStructure] = useState([])
    const [status, setStatus] = useState([])
    const [referalValidity, setReferalvalidity] = useState([])
    const [salesPerson, setSalesPerson] = useState([])
    const [test, setTest] = useState('')
    const [buttonState, setButtonState] = useState(false)
    const [downloadPdf, setDownloadPdf] = useState(false)
    const { id } = params

    const [data, setData] = useState({
        name: '',
        duration: '',
        fees_structure: '',
        status: '',
    })

    const schema = Yup.object().shape({
        //ClientId: Yup.string().required('Required'),
    });

    useEffect(() => {
        getAgreement()
        setStructure(config.structure)
        setStatus(config.agreement_status)
        setReferalvalidity(config.referal_validity)
        console.log(config.persons);
        setSalesPerson(config.persons)
    }, [])

    const getAgreement = async () => {
        const agreement = await dispatch.AgreementModel.getAgreement(id)
        console.log(agreement);

        if (agreement.data) {
            const AgreemantDet = {
                client: agreement.data.Client.name,
                // cliendId: agreement.ClientId,
                duration: agreement.data.duration,
                fees_structure: agreement.data.fees_structure,
                status: agreement.data.status,
                payment_schedule: agreement.data.payment_schedule,
                created_date: agreement.data.createdAt,
                referal_validity: agreement.data.referal_validity,
                version: agreement.data.version,
                sales_person: agreement.data.sales_person,
                additional_data: agreement.data.additional_data
            }
            setData(AgreemantDet)
        }

    }
    const backToHome = () => {
        nav('/agreement')
    }
    // const generateAgreement = async () => {
    //     const data1 = { id, status: 'generated' }
    //     await dispatch.AgreementModel.editAgreement(data1)
    //     setButtonState(true)
    //     setData({ ...data, status: 'generated' })
    // }

    // const downloadAgreement = async (values) => {
    //     setDownloadPdf(true)
    //     // values.id = id
    //     // const filterValues = Object.fromEntries(Object.entries(values).filter(([key, value]) => value != ''));
    //     // await dispatch.AgreementModel.editAgreement(filterValues)

    //     const blob = await pdf(
    //         <BasicDocument func={values} />
    //     ).toBlob();

    //     saveAs(blob, 'Agreement.pdf');

    // }

    return (
        <div><Header></Header>
            <div className="container-small container">
                <div className="crud shadow-lg  mt-5  bg-body rounded col-xs-12">
                    <div className="row ">
                        <div className="my-3 text-gred text-center"
                            style={{ color: "red" }}
                        ><h2><b>Edit Agreement</b></h2>
                        </div>
                    </div>

                    {val ? <Alert key={key} variant={key}>
                        {message}
                    </Alert> : ''}
                    <Formik enableReinitialize={true}
                        const initialValues={{
                            client: data.client ? data.client : '',
                            // clientId: data.ClientId ? data.ClientId : '',
                            duration: data.duration ? parseInt(data.duration) : '',
                            fees_structure: data.fees_structure ? data.fees_structure : '',
                            payment_schedule: data.payment_schedule ? data.payment_schedule : '',
                            status: data.status ? data.status : '',
                            created_date: data.created_date,
                            referal_validity: data.referal_validity ? data.referal_validity : '',
                            sales_person: data.sales_person ? data.sales_person : '',
                            additional_data: data.additional_data ? data.additional_data : ''
                        }}
                        validationSchema={schema}
                        onSubmit={async (values, { resetForm }) => {
                            values.id = id
                            console.log(values);
                            const filterValues = Object.fromEntries(Object.entries(values).filter(([key, value]) => value != ''));
                            const result = await dispatch.AgreementModel.editAgreement(filterValues)

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
                                <div className="row ">
                                    <div className="d-flex justify-content-end pb-5">
                                        <h5 className="px-2">Version: {data.version}</h5>
                                        {/* {
                                            data && Object.values(data).every(value => !!value) ?
                                                data.status == 'drafted' ?
                                                    <Button variant="success" className="px-2 " onClick={generateAgreement}>Generate Agreement</Button> :
                                                    data.status == 'generated' ?
                                                        <Button variant="success" className="px-2" onClick={() => downloadAgreement(values)}>Download Agreement</Button> :
                                                        <Button disabeld variant="success" className="px-2" onClick={() => downloadAgreement(values)}>Download Agreement</Button>
                                                :
                                                <Button disabled variant="success" className="px-2 " onClick={generateAgreement}>Generate Agreement</Button>

                                        } */}

                                    </div>
                                </div>
                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicClient">
                                        <Form.Label>Client</Form.Label>
                                        <Form.Control
                                            name="client"
                                            value={values.client}
                                            onChange={handleChange}
                                            //isInvalid={touched.duration && errors.duration}
                                            type="text"
                                            disabled
                                        // placeholder="Enter Duration of Agreemnet"
                                        //required 
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicDuration">
                                        <Form.Label>Duration of the Agreement</Form.Label>
                                        <Form.Control
                                            name="duration"
                                            value={values.duration}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="Enter Duration of Agreemnet"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="row">
                                    <Form.Group className="mb-4 col-6" controlId="formBasicFees">
                                        <Form.Label>Fess Structure</Form.Label>
                                        <Form.Select
                                            name="fees_structure"
                                            onChange={handleChange}
                                            value={values.structure}
                                        >
                                            <option value={values.fees_structure} >{values.fees_structure.charAt(0).toUpperCase() + values.fees_structure.slice(1)}</option>
                                            {structure && structure.map((xx) =>
                                                xx === values.fees_structure ? null : <option key={xx} value={xx} >{xx.charAt(0).toUpperCase() + xx.slice(1)}</option>)
                                            }

                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicPayment">
                                        <Form.Label>Payment Schedule</Form.Label>
                                        <Form.Control
                                            name="payment_schedule"
                                            value={values.payment_schedule}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="Enter payment Schedule"
                                        />
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

                                            {setStatus && status.map(xx =>
                                                xx === values.status ?
                                                    <option key={xx} value={xx} selected>{xx.charAt(0).toUpperCase() + xx.slice(1)}</option> :
                                                    <option key={xx} value={xx} >{xx.charAt(0).toUpperCase() + xx.slice(1)}</option>
                                            )}

                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicReferal">
                                        <Form.Label>Referal Validity</Form.Label>
                                        <Form.Select
                                            name="referal_validity"
                                            onChange={handleChange}
                                            value={values.referal_validity}
                                            isInvalid={touched.referal_validity && errors.referal_validity}
                                        >
                                            <option value="" disabled={'Years'}> Years </option>
                                            {setReferalvalidity && referalValidity.map(validity =>
                                                validity == values.referal_validity ?
                                                    <option key={validity} value={validity} selected>{validity}</option> :
                                                    <option key={validity} value={validity}>{validity}</option>
                                            )}
                                        </Form.Select>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.referal_validity}
                                        </Form.Control.Feedback>
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
                                            {salesPerson && salesPerson.map(person =>
                                                person.id === values.sales_person ?
                                                    <option key={person.id} value={person.id} selected>{person.name}</option> :
                                                    <option key={person.id} value={person.id} >{person.name}</option>
                                            )}
                                        </Form.Select>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.sales_person}
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
        </div >

    )

}


export default EditAgreement