import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AddCndidate.css'
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Alert from 'react-bootstrap/Alert';
import configData from '../config/default.json';

function AddCandidate() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const params = useParams();
  const [data, setData] = useState({
    name: '',
    email: '',
    phone_number: '',
    role: '',
    file: null
  })
  const [val, setVal] = useState(false)
  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')

  const status_options = configData.candidateStatus
  const [validated, setValidated] = useState(false);



  useEffect(() => {
    getCandidate()
  }, [])

  const getCandidate = async () => {
    const { id } = params
    const candidate = await dispatch.CandidateModel.getCandidate(id)
    const resume = candidate.resume ? candidate.resume.split('/uploads/')[1] : null
    if (candidate) {
      const candDet = {
        name: candidate.name,
        email: candidate.email,
        phone_number: candidate.phone_number,
        role: candidate.role,
        file: resume,
        status: candidate.status
      }
      setData(candDet)
    }

  }
  const backToHome = () => {
    nav('/candidate')
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email("Enter a valid email").required('Required'),
    phone_number: Yup.number().required("Required"),
    // file: Yup.mixed()
    //   .nullable()
    //   .notRequired()
    //   .when('file', {
    //     is: file => file,
    //     then: Yup.mixed().
    //       test('fileType', "Pdf only!", value => ['application/pdf'].includes(value.type)),

    //   })
  }, ['file', 'file']);

  return (
    <div><Header></Header>

      <div className="container-small container">
        <div className="crud shadow-lg  mt-5  bg-body rounded col-xs-12">
          {/* <div className="  justify-content-center align-items-center mt-5 shadow-lg p-3"> */}

          <div className="row ">


            <div className="my-3 text-gred text-center" style={{ color: "red" }}><h2><b>Edit Candidate</b></h2></div>

          </div>
          {val ? <Alert key={key} variant={key}>
            {message}
          </Alert> : ''}

          <Formik enableReinitialize={true}
            const initialValues={{
              name: data.name ? data.name : '',
              email: data.email ? data.email : '',
              phone_number: data.phone_number ? data.phone_number : '',
              role: data.role ? data.role : '',
              status: data.status ? data.status : '',
              file: null
            }}

            validationSchema={schema}
            onSubmit={async (value, { resetForm }) => {
              const { id } = params
              const data = { value, id }
              const result = await dispatch.CandidateModel.updateCandidate(data)
              console.log(result);
              if (result.data) {
                resetForm({ values: '' })
                sessionStorage.setItem("result", result.data);
                setVal(true)
                nav('/candidate')

                setKey('success')
                setMessage(result.data)
                setVal(true)
                setTimeout(() => {
                  setVal(false)
                  nav('/candidate')
                }, 2000);


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
              <Form className="p-5" noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="row">
                  <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && errors.name}
                      type="text"
                      placeholder="Enter Candidate Name"
                      required />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} className="mb-4 col-6" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
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
                  <Form.Group className="mb-4 col-6" controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Role"
                      value={values.role}
                      name="role"
                      onChange={handleChange} />
                  </Form.Group>

                </div>
                <div className="row">
                  <Form.Group className="mb-4 col-6" controlId="formBasicFile">
                    <Form.Label>Resume</Form.Label>
                    <UploadComponent setFieldValue={setFieldValue} />
                    {values.file ? (<h6>{`File:${values.file.path}`}</h6>) :
                      data.file ? (<h6>{`File:${data.file}`}</h6>) : ''
                    }

                    <Form.Control.Feedback type="invalid">
                      {errors.file}
                    </Form.Control.Feedback>
                    {/* ({data.file ? (<h6>{`File:${data.file}`}</h6>) : ''}) */}
                  </Form.Group>
                  <Form.Group className="mb-4 col-6" controlId="formBasicStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      onChange={handleChange}
                    >
                      <option value={values.status} >{values.status.charAt(0).toUpperCase() + values.status.slice(1)}</option>
                      {status_options.map((item, index) =>
                        item.charAt(0).toUpperCase() + item.slice(1) == values.status.charAt(0).toUpperCase() + values.status.slice(1) ?
                          null :
                          <option key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
                      )}
                    </Form.Select>
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
    </div >

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
      setFieldValue("file", acceptedFiles[0]);
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

export default AddCandidate