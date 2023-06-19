import express from 'express'
import mongoose  from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/quizRoutes'


const app = express();
const PORT = 3000;

//mongoose connection
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://127.0.0.1:27017/QuizDB', {   
    useNewUrlParser: true,
});

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})