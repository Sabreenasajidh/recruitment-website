import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Container, Row, Col, Modal, Button, Form, Nav } from 'react-bootstrap'
import config from '../config/default.json'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Multiselect from 'multiselect-react-dropdown';
import Alert from 'react-bootstrap/Alert';
import DatePicker from "react-datepicker";
import Tab from 'react-bootstrap/Tab';
import Sonnet from './test'
import EditRecruitmentModal from './EditRecruitmentModal'
import RecruitmentStepper from './RecruitmentStepper';

function ViewRecruitment() {
  const params = useParams();
  const dispatch = useDispatch();

  const [recruitmentData, setRecruitmentData] = useState({})
  const [salesPerson, setSalesPerson] = useState({})
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false)
  const [candidates, setCandidates] = useState([])
  const [errors, setErrors] = useState(false)
  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = React.useState(false);
  const [selectedValues, setSelectedValues] = useState([])
  const [test, setTest] = useState([])
  const [view, setView] = useState(false)
  const [selectedCandidates, setSelectedCandidates] = useState([])
  const [flag, setFlag] = useState(0)
  const [status,setStatus] = useState([])

  //const []

  const { id } = params

  useEffect(() => {
    getRecruitmentDetails();
    getCandidatesList();
  }, [])

  const getRecruitmentDetails = async () => {
    setFlag(0)
    const getData = await dispatch.RecruitmentModel.getRecruitment(id)
    console.log(getData.data);
    setRecruitmentData(getData.data)
    setSalesPerson(config.persons.filter(x => x.id == getData.data.Agreement.sales_person)[0])
  }
  const getCandidatesList = async () => {
    // const data = await dispatch.CandidateModel.ListCandidate();
    const e1 = await dispatch.RecruitmentModel.getCandidates(id);
    console.log(e1);
    if (e1.existingCandidates.length) {
      setCandidates(e1.existingCandidates)
      const getSelected = e1.existingCandidates
      setSelectedCandidates(getSelected.filter(x => x))
      setSelectedValues(getSelected.filter(x => x))

    }
    if (e1.filteredCandidate.length) {
      setCandidates(...candidates, e1.filteredCandidate)

    }

  }
  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
    setEditShow(false)
  }

  const handleSubmit = async (event) => {
    console.log(selectedValues);
    event.preventDefault();
    if (!selectedValues.length) setErrors(true)
    else {
      setErrors(false)

      const data = selectedValues.map(x => {
        return { CandidateId: x.id, RecruitmentId: id }
      }
      )
      const op = { data: data, id: id }
      // data.id = id
      const value = await dispatch.RecruitmentModel.createRecruitmentCandidate(op)
      if (value) {
        setCandidates(selectedValues)
        setSelectedCandidates(selectedValues)
        setSuccess(true);
        setKey('success')
        setMessage('Add Candidates')
        setTimeout(() => {
          setSuccess(false);
          setShow(false);
        }, 2000);
      }
    }
  };
  const handleEditRecruitment = () => {
    setEditShow(true)
  }
  // const getCandidate = (id) => {
  //   setView(true)
  // }
  // const alertClicked = () => {
  //   alert('You clicked the third ListGroupItem');
  // };
  const test1 = (data) => {
    setFlag(data)
    handleClose()
  }
  if (flag) getRecruitmentDetails()
  return (
    <div>
      <Header />
      <Container className="">
        {
          recruitmentData.Agreement ?
            <EditRecruitmentModal show={editShow} hide={handleClose} data={recruitmentData} handleCallback={test1} /> :
            null
        }
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <Row className="mb-4">
            <Col md={6}>
              <div className="mt-3 mb-4 text-gred" style={{ color: "red" }}><h2>
                <b>Recruitment {recruitmentData.Agreement ?
                  `${recruitmentData.Agreement.Client.name.charAt(0).toUpperCase() + recruitmentData.Agreement.Client.name.slice(1)}_${recruitmentData.AgreementId}` :
                  null}</b>
                <IconButton onClick={handleEditRecruitment}>
                  <EditIcon
                    sx={{ cursor: "pointer", color: "#10ab80" }}

                  // className="me-3"
                  />
                </IconButton>
              </h2>
              </div>
            </Col>

            <Col ms={6}>
              <RecruitmentStepper candidates={candidates}/>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <p><strong>Name: </strong> {recruitmentData.name}</p>
              <p><strong>Job Title: </strong> {recruitmentData.jobTitle}</p>
              <p><strong>Job Description: </strong> {recruitmentData.jobDesc}</p>
              <p><strong>Closing Date: </strong> {recruitmentData.closingDate ? recruitmentData.closingDate.split('T')[0] : null}</p>
            </Col>
            <Col md={6}>
              <p><strong>Client: </strong> {recruitmentData.Agreement ? recruitmentData.Agreement.Client.name : null}</p>
              <p><strong>Email: </strong> {recruitmentData.Agreement ? recruitmentData.Agreement.Client.email : null}</p>
              <p><strong>Sales Person: </strong> {salesPerson.name}</p>
            </Col>


          </Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={4} style={{ backgroundColor: "#f2f2f2" }} className="rounded ">
                <p className="mt-3">
                  <strong>Candidates</strong>
                  <PersonAddAlt1Icon
                    className="float-end"
                    onClick={() => handleShow()}
                    style={{ cursor: 'pointer' }}>

                  </PersonAddAlt1Icon>
                </p>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item >
                    {selectedCandidates.length ?
                      <Nav.Link
                        eventKey="first"
                        //{`#${selectedCandidates[0].name}`} 
                        className="text-dark"
                        key={selectedCandidates[0].id}
                      >{selectedCandidates[0].name}</Nav.Link>
                      : null
                    }
                    {selectedCandidates.length ? selectedCandidates.slice(1).map(x =>
                      <Nav.Link eventKey={`#${x.name}`} className="text-dark" key={x.id}>{x.name}</Nav.Link>
                    ) : null
                    }
                  </Nav.Item>

                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {selectedCandidates.length ?
                    <Tab.Pane eventKey="first" key={selectedCandidates[0].id}>
                      <Sonnet data={selectedCandidates[0]} />
                    </Tab.Pane>
                    : null}

                  {selectedCandidates.length ? selectedCandidates.slice(1).map(x =>
                    <Tab.Pane eventKey={`#${x.name}`} key={x.id}>
                      <Sonnet data={x} />
                    </Tab.Pane>
                  ) : null}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

        </div >
      </Container >
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#f37a27" }} className="mb-2">Select Candidate </Modal.Title>
        </Modal.Header>
        <div className="">
          <Modal.Body>
            {success ? <Alert key={key} variant={key}>
              {message}
            </Alert> : ''}

            <Form onSubmit={handleSubmit}>
              <Row>

                <Col sm={8}>
                  <Multiselect
                    displayValue="name"
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={(event) => {
                      setSelectedValues(event)
                      if (!event.length) setErrors(true)
                      else setErrors(false)
                    }}
                    onSearch={function noRefCheck() { }}
                    onSelect={(event) => {
                      setSelectedValues(event)
                      if (!event.length) setErrors(true)
                      else setErrors(false)
                    }}
                    options={candidates}
                    showCheckbox
                    selectedValues={selectedCandidates}
                  // style={{
                  //   searchBox: {
                  //    border:" 1px solid #dc3545"
                  //   }
                  // }}
                  />
                  {errors ? <p style={{ color: 'red', fontSize: '14px' }}>Select atleast one</p> : null}

                </Col>

                <Col sm={4}>
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </div >
  )
}

export default ViewRecruitment




