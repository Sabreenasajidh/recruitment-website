import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import candidateRoute from './routes/Candidate.js'
import clientRoute from './routes/Client.js'
import agreementRoute from './routes/Agreement.js'
import recruitmantRoute from './routes/Recruitment.js'
import RecruitmentCandidateRoute from './routes/RecruitmentCandidateRoute.js';

const PORT = process.env.PORT || 9000;

var app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/api/candidate', candidateRoute)
app.use('/api/client',clientRoute)
app.use('/api/agreement',agreementRoute)
app.use('/api/recruitment-candidates',RecruitmentCandidateRoute)
app.use('/api/recruitment',recruitmantRoute)
app.use('/public/uploads', express.static('public/uploads'))
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})
