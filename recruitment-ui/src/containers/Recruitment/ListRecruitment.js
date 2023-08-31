import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Button from 'react-bootstrap/Button';
import AddRecruitmentModal from './AddRecruitmentModal';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import config from '../config/default.json';
import Alert from 'react-bootstrap/Alert';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';




function ListRecruitment() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(0)
    const [data1, setData1] = useState({})
    const [dataArray, setDataArray] = useState([])
    const [val, setVal] = useState(false)
    const [key, setKey] = useState('')
    const [message, setMessage] = useState('')
    const [flag, setFlag] = useState(0)

    const limit = config.limit


    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        recruitmentList();
    }, [])

    const recruitmentList = async (query) => {
        setFlag(0)
        const recruitmentList = await dispatch.RecruitmentModel.ListRecruitments(query)
        setData(recruitmentList.data)
        setDataArray(_(recruitmentList.data).slice(0).take(limit).value())
    }
    const total = data.length;
    const count = (Math.ceil(total / limit));

    const handleChange = (e, page) => {
        const pageIndex = (page - 1) * limit;
        setDataArray(_(data).slice(pageIndex).take(limit).value());
    }
    const searchRecruitment = async (event) => {
        const searchdata = event.target.value
        let newparams = new URLSearchParams({ searchdata: searchdata }).toString();
        recruitmentList(newparams)
    }
    const test = (data) => {
        setFlag(data)
        setShow(false);
    }
    if (flag) recruitmentList()
    const getRecruitmentDetails = (id) => {
        nav(`view/${id}`)
    }
    return (
        <div>
            <Header />
            <div className="container ">
                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                    <div className="row ">
                        <div className="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form className="form-inline">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search Recruitment"
                                        aria-label="Search"
                                        onChange={searchRecruitment}
                                    />

                                </form>
                            </div>
                        </div>
                        <div className="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{ color: "red" }}><h2><b>Recruitment</b></h2></div>
                        <div className="col-sm-2 offset-sm-2  mt-5 mb-4 text-gred justify-content-end">
                            <Button variant="primary" onClick={handleShow} >
                                Add New Rercruitment
                            </Button>
                        </div>
                        <div className="row">
                            {data.length === 0 ?

                                <h4>No Recruitments to display</h4> :
                                (
                                    <div className="table-responsive " >
                                        <table className="table table-striped table-hover ">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name </th>
                                                    <th>Job Title</th>
                                                    <th>Job Description</th>
                                                    <th>Closing Date </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataArray.map((value) => {
                                                    return (
                                                        <tr key={value.id}>
                                                            <td>{value.id}</td>
                                                            <td
                                                             style={{cursor: "pointer",color: "#10ab80" }} onClick={() => { getRecruitmentDetails(value.id) }}>{value.name}
                                                            </td>
                                                            <td>{value.jobTitle}</td>
                                                            <td>{value.jobDesc}</td>
                                                            <td>{value.closingDate.split('T')[0].split("-").reverse().join("-")}</td>

                                                            {/* <td>
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
                                                            </td> */}
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
                        <AddRecruitmentModal show={show} hide={handleClose} handleCallback={test} />
                        {/* {val? test :null} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListRecruitment