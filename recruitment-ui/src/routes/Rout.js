import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import About from '../containers/About/About'
//import MainPage from '../containers/MainPage/MainPage';
import Candidate from '../containers/Candidates/ListCandidate';
import Client from '../containers/Client/ListAndSearchClient';
import AddCandidate from '../containers/Candidates/AddCandidate';
import EditCandidate from '../containers/Candidates/EditCandidate';
import AddClient from '../containers/Client/AddClient';
import EditClient from '../containers/Client/EditClient'

import NewAgreement from '../containers/Agreement/NewAgreement'
import ListAgreement from '../containers/Agreement/ListAgreement'
import EditAgreement from '../containers/Agreement/EditAgreement'

import BasicDocument from '../containers/Agreement/BasicDocument';

import ListRecruitment from '../containers/Recruitment/ListRecruitment';
import ViewRecruitment from '../containers/Recruitment/ViewRecruitment';
import Test from '../containers/Agreement/Test';


function Rout() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<Test />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/candidate/add" element={<AddCandidate />} />
          <Route path="/candidate/edit/:id" element={<EditCandidate />} />
          
          <Route path="/client" element={<Client />} />
          <Route path="/client/add" element={<AddClient />} />
          <Route path="/client/edit/:id" element={<EditClient />} />

          <Route path="/agreement" element={<ListAgreement />} />
          <Route path="/agreement/add" element={<NewAgreement />} />
          <Route path="/agreement/edit/:id" element={<EditAgreement />} />
          <Route path="/agreement/edit/:id" element={<BasicDocument />} />
         
         <Route path="/recruitment" element={<ListRecruitment />} />
         <Route path="/recruitment/view/:id" element={<ViewRecruitment />} />
         {/* <Route path="/recruitment/view:id" element={<ViewRecruitment />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Rout