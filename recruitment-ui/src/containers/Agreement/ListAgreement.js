import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import IconButton from '@mui/material/IconButton';
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import BasicDocument from './BasicDocument';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
// import EditCandidate from './EditCandidate';
import config from '../config/default.json';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const limit = config.limit


function ListAgreement() {
  const dispatch = useDispatch();
  const nav = useNavigate()

  const [data, setData] = useState([])
  const [data1, setData1] = useState({})
  const [dataArray, setDataArray] = useState([])
  //const [query, setQuery] = useState({})
  const [val, setVal] = useState(false)
  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    console.log(value);
    const salesPerson = config.persons.filter(x => x.id === value.sales_person)[0]
    console.log(salesPerson);
    //config.persons.filter(x=>x.id == value.sales_person)[0]
    value.salesPerson = salesPerson.name
    setShow(true);
    setData1(value)
  }
  //useState( _(data.data).slice(0).take(limit).value() )

  useEffect(() => {
    agreemantList();
    const sessiondata = sessionStorage.getItem("result");
    if (sessiondata) {
      setKey('success')
      setMessage(sessiondata)
      setVal(true)
      setTimeout(() => {
        sessionStorage.setItem("result", '');
        setVal(false)
      }, 2000);
    }
  }, [])

  const agreemantList = async (query) => {
    const agreement = await dispatch.AgreementModel.ListAgreements(query)
    setData(agreement.data)
    setDataArray(_(agreement.data).slice(0).take(limit).value())
  }

  const total = data.length;
  const count = (Math.ceil(total / limit));
  //const pages = _(data.data).slice(0).take(limit).vaue();

  const addAgreement = () => {
    nav('add')
  }
  const editAgreemant = (value) => {
    nav(`edit/${value.id}`)
  }
  const handleChange = (e, page) => {
    const pageIndex = (page - 1) * limit;
    setDataArray(_(data).slice(pageIndex).take(limit).value());
  }
  const searchAgreement = async (event) => {
    const searchdata = event.target.value
    let newparams = new URLSearchParams({ searchdata: searchdata }).toString();
    agreemantList(newparams)
  }

  const downloadAgreemnet = async (value) => {
    //console.log(data);
    const op = data.filter(x => x.ClientId === value.ClientId)
    const salesPerson = config.persons.filter(x => x.id == op[0].sales_person)[0]
    console.log(op[0]);
    const blob = await pdf(
      <BasicDocument func={op[0]} data={salesPerson} />
    ).toBlob();

    saveAs(blob, `${op[0].Client.name}_${op[0].ClientId}`);

  }

  return (
    <div> <Header />
      <div className="container ">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row ">

            <div className="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search Agreements"
                    aria-label="Search"
                    onChange={searchAgreement}
                  />

                </form>
              </div>
            </div>
            <div className="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{ color: "red" }}><h2><b>Agreements</b></h2></div>
            <div className="col-sm-2 offset-sm-2  mt-5 mb-4 text-gred justify-content-end">
              <Button variant="primary" onClick={addAgreement} >
                Add New Agreement
              </Button>
            </div>
          </div>
          {val ? <Alert key={key} variant={key}>
            {message}
          </Alert> : ''}
          <div className="row">
            {data.length === 0 ?

              <h4>No Agreements to display</h4> :
              (
                <div className="table-responsive " >
                  <table className="table table-striped table-hover ">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Client </th>
                        <th>Duration </th>
                        <th>Fee Structure</th>
                        <th>Payment</th>
                        <th>Status </th>
                        <th>Version </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataArray.map((value) => {
                        return (
                          <tr key={value.id}>
                            <td>{value.id}</td>
                            <td>{value.Client.name}</td>
                            <td>{value.duration}</td>
                            <td>{value.fees_structure ? value.fees_structure.charAt(0).toUpperCase() + value.fees_structure.slice(1) : ''}</td>
                            <td>{value.payment_schedule}</td>
                            <td>{value.status.charAt(0).toUpperCase() + value.status.slice(1)}</td>
                            <td>{value.version}</td>
                            <td>
                              {
                                value.status === 'confirmed' ?
                                  <IconButton disabled > <EditIcon className="me-3" /></IconButton> :
                                  <IconButton onClick={() => { editAgreemant(value) }}>
                                    <EditIcon
                                      sx={{ cursor: "pointer", color: "#10ab80" }}
                                      className="me-3"
                                    />
                                  </IconButton>
                              }
                              <DownloadIcon className="me-3"
                                sx={{ cursor: "pointer", justifyContent: "flex-end" }}
                                onClick={() => {
                                  downloadAgreemnet(value)
                                }} />

                              <VisibilityIcon onClick={() => handleShow(value)} />
                            </td>
                          </tr>

                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
          <div className="pagination justify-content-center">
            <Stack>
              <Pagination count={count} shape="rounded" color="primary" onChange={handleChange} />

            </Stack>
          </div>

        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#f37a27" }} className= "mb-2">View Agreement </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <section  > */}
          <Container>
            <Row className="justify-content-center align-items-center h-100">
              <Col>
                <div
                  className="mx-n5 px-5 py-4"
                  style={{ backgroundColor: "#f2f2f2" }}
                >
                  <Row>
                    <Col md="8" lg="9">
                      <p>Client</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.Client ? data1.Client.name : null}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8" lg="9">
                      <p>Duration</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.duration ? data1.duration : null}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="8" lg="9">
                      <p>Status</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.status ? data1.status.charAt(0).toUpperCase() + data1.status.slice(1) : null}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="8" lg="9">
                      <p>Payment Schedule</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.payment_schedule ? data1.payment_schedule : null}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="8" lg="9">
                      <p>Validity</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.referal_validity ? data1.referal_validity : null}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="8" lg="9">
                      <p>Fee Structure</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.fees_structure ? data1.fees_structure : null}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="8" lg="9">
                      <p>Sales Person</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.sales_person ? data1.salesPerson : null}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="8" lg="9">
                      <p>Additional Text</p>
                    </Col>
                    <Col md="4" lg="3">
                      <p>{data1.additional_data ? data1.additional_data : null}</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}
export default ListAgreement