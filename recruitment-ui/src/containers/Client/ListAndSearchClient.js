import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import './client.css'

//import EditCandidate from './EditCandidate';
const limit = 10;

function ListAndSearchClient() {
    const dispatch = useDispatch();
    const nav = useNavigate()

    const [data, setData] = useState([])
    const [dataArray, setDataArray] = useState([])
    const [query, setQuery] = useState({})
    const [val, setVal] = useState(false)
    const [key, setKey] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        clientList();
        const sessiondata = sessionStorage.getItem("result");
        if (sessiondata) {
            setKey('success')
            setMessage(sessiondata)
            setVal(true)
            setTimeout(() => {
                sessionStorage.setItem("result",'');
                setVal(false)
            }, 2000);
        }


    }, [])

    const clientList = async (query) => {
        const client = await dispatch.ClientModel.ListClient(query)
        setData(client)
        setDataArray(_(client).slice(0).take(limit).value())
    }

    const total = data.length;
    const count = (Math.ceil(total / limit));

    const editClient = (value) => {
        nav(`edit/${value.id}`)
    }
    const handleChange = (e, page) => {
        const pageIndex = (page - 1) * limit;
        setDataArray(_(data).slice(pageIndex).take(limit).value());
    }
    const searchClient = async (event) => {
        const searchdata = event.target.value
        let newparams = new URLSearchParams({ searchdata: searchdata }).toString();
        clientList(newparams)
    }


    const addClient = () => {
        nav('add')
    }
    return (
        <div><Header />

            <div className="container ">
                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                    <div className="row ">

                        <div className="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form className="form-inline">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search Client"
                                        aria-label="Search"
                                        onChange={searchClient}
                                    />

                                </form>
                            </div>
                        </div>
                        <div className="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{ color: "red" }}><h2><b>Clients</b></h2></div>
                        <div className="col-sm-2 offset-sm-2  mt-5 mb-4 text-gred justify-content-end">
                            <Button variant="primary" onClick={addClient}>
                                Add New Client
                            </Button>
                        </div>
                        {val ? <Alert key={key} variant={key}>
                            {message}
                        </Alert> : ''}
                    </div>
                    <div className="row">
                        {data.length === 0 ?

                            <h4>No Clients to display</h4> :
                            (
                                <div className="table-responsive " >
                                    <table className="table table-striped table-hover ">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name </th>
                                                <th>Email </th>
                                                <th>Phone</th>
                                                <th>Address </th>
                                                <th>Vat </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataArray.map((value) => {
                                                return (
                                                    <tr key={value.id}>
                                                        <td>{value.id}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.phone_number}</td>
                                                        <td>{value.address}</td>
                                                        <td>{value.vat_status?'Enable':'Disable'}</td>
                                                        <td>
                                                            <EditIcon
                                                                sx={{ cursor: "pointer", justifyContent: "flex-end", color: "#10ab80" }}
                                                                onClick={() => { editClient(value) }} />
                                                        </td>
                                                    </tr>

                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                    </div>
                    <div className="pagination justify-content-center">
                        <Stack>
                            <Pagination count={count} shape="rounded" color="primary" onChange={handleChange} />

                        </Stack>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ListAndSearchClient