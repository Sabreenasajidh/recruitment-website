import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button, Form, ListGroup } from 'react-bootstrap'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DatePicker from "react-datepicker";
import * as Yup from 'yup';
import { Formik } from 'formik';
import config from '../config/default.json'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useDropzone } from "react-dropzone";
import AttachFileIcon from '@mui/icons-material/AttachFile';




const today = new Date();
console.log(today);



function Test(props) {
  const { data } = props
  const params = useParams();

  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = React.useState(false);
  const [info, setInfo] = useState({})

  const { id } = params

  const dispatch = useDispatch();
  useEffect(() => {
    getRecruitmentDetails();
  }, [])

  const getRecruitmentDetails = async () => {
    const condition = { RecruitmentId: id, CandidateId: data.id }
    const getData = await dispatch.RecruitmentModel.getRecruitmentCandidate(condition)
    console.log(getData.data);
    if (getData.data) setInfo(getData.data)
  }
  const handleDateChange = (e) => {
    console.log(e);
  }

  const schema = Yup.object().shape({
    noticePeriod: Yup.number(),
    offerLetter: Yup.mixed()
      .nullable()
      .notRequired()
      .when('offerLetter', {
        is: file => file,
        then: Yup.mixed().
          test('fileType', "Pdf only!", value => ['application/pdf'].includes(value.type)),
      })
  }, ['offerLetter', 'offerLetter']);

  return (
    <div>
      <Row >

        <Col>
          <div className="">
            <div className="pt-2 ps-4 border col-sm-6  text-gred  rounded-top-right-1 " style={{ color: 'red', backgroundColor: "#f2f2f2" }}>
              <h5><b>Candidate Details</b></h5>
            </div>

            <Col style={{ backgroundColor: "#f2f2f2" }} className="ps-4 rounded-bottom rounded-top-right-1 ">
              <Formik enableReinitialize={true}
                const initialValues={{
                  interviewDate: info.interviewDate ? new Date(info.interviewDate.split('T')[0]) : '',
                  noticePeriod: info.noticePeriod ? info.noticePeriod : '',
                  offerLetter: null,
                  recruitment_status: info.recruitment_status ? info.recruitment_status : config.recruitment_status[0].status,
                  cv_sentDate: info.cv_sentDate ? new Date(info.cv_sentDate.split('T')[0]) : ''
                }}
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                  const CandidateId = props.data.id
                  const filterValues = Object.fromEntries(Object.entries(values).filter(([key, value]) => value != ''));
                  if (Object.keys(filterValues).length !== 0) {
                    filterValues.CandidateId = CandidateId
                    const res = { filterValues, id }
                    console.log(res);
                    const op = await dispatch.RecruitmentModel.updateCanidate(res)
                    if (op) {
                      console.log("here");
                      setSuccess(true);
                      setKey('success')
                      setMessage('Updated Candidates')
                      setTimeout(() => {
                        setSuccess(false);
                      }, 2000);
                    }
                  }
                }}
              >
                {({ handleChange,
                  handleSubmit,
                  errors,
                  setFieldValue,
                  setFieldTouched,
                  values }) => (

                  <Form noValidate onSubmit={handleSubmit}>
                    <Row >
                      {success ? <Alert key={key} variant={key}>
                        {message}
                      </Alert> : ''}
                      <Col md={8} className="mt-4">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
                          <Form.Label column sm={5}>
                            Interview Date
                          </Form.Label>
                          <Col sm={5}>
                            <DatePicker
                              placeholderText="Pick a date!"
                              minDate={today}
                              selected={values.interviewDate}
                              // onSelect={handleDateSelect} //when day is clicked
                              onChange={(e) => {
                                setFieldValue('interviewDate', e);
                                setFieldTouched('interviewDate');
                              }
                              }
                              className="form-control"
                              customInput={
                                <Form.Control type="text"
                                  name="interviewDate"
                                  value={values.interviewDate}
                                  onChange={handleChange}
                                />
                              }
                            />

                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontaNoticePeriod">
                          <Form.Label column sm={5}>
                            Notice period
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control type="number"
                              placeholder="Enter Days"
                              name="noticePeriod"
                              value={values.noticePeriod}
                              isInvalid={!!errors.noticePeriod}
                              // isValid={touched.notice_period && !errors.notice_period}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalLetter">
                          <Form.Label column sm={5}>
                            Offer letter
                          </Form.Label>
                          <Col sm={5}>
                            <UploadComponent setFieldValue={setFieldValue} />
                            {values.offerLetter ? (<h6>{`File:${values.offerLetter.path}`}</h6>) :
                              info.offerLetter ? (<h6>{`File:${info.offerLetter}`}</h6>) : ''
                            }
                            <Form.Control.Feedback type="invalid">
                              {errors.offerLetter}
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalStatus">
                          <Form.Label column sm={5}>
                            Recruitment Status
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Select
                              name="recruitment_status"
                              onChange={handleChange}
                            >

                              <option value={values.recruitment_status} >{values.recruitment_status.charAt(0).toUpperCase() + values.recruitment_status.slice(1)}</option>

                              {config.recruitment_status.map((x) =>
                                x.status == values.recruitment_status ?
                                  null :
                                  <option key={x.id}>{x.status}</option>
                              )}

                            </Form.Select>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCVSentDate">
                          <Form.Label column sm={5}>
                            CV send Date
                          </Form.Label>
                          <Col sm={5}>
                            <DatePicker
                              // type="text"
                              // isClearable
                              placeholderText="Pick a date!"
                              minDate={today}
                              selected={values.cv_sentDate}
                              // onSelect={handleDateSelect} //when day is clicked
                              onChange={(e) => {
                                setFieldValue('cv_sentDate', e);
                                setFieldTouched('cv_sentDate');

                              }
                              }
                              className="form-control"
                              customInput={
                                <Form.Control type="text" placeholder="select a date"
                                  name="cv_sentDate"
                                  value={values.cv_sentDate}
                                  onChange={handleChange}
                                //     // placeholder="Select"
                                />
                              }
                            />

                          </Col>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="my-5 py-5">
                        <Button type="submit">Submit</Button>
                      </Col>
                    </Row>
                  </Form>

                )}
              </Formik>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  )
}
const UploadComponent = props => {
  const { setFieldValue } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
      // 'image/jpeg': [],
      // 'image/png': []
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      console.log(acceptedFiles[0], "888888888888");
      setFieldValue("offerLetter", acceptedFiles[0]);
    }
  });
  return (
    <div>
      { }
      <div {...getRootProps({ className: "dropzone form-control" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...<AttachFileIcon /> </p>
        ) : (
          <div style={{ color: '#636c72' }} ><AttachFileIcon />Upload file </div>
        )}
      </div>
    </div>
  );
}

export default Test
{/* <p>Interview Date: </p>
                    <p>Notice period: </p>
                    <p>Recruitment Status: </p>
                    <p>Offer letter: </p>
                    <p>CV Sent date</p>
                    </Col> */}

{/* </Row> */ }