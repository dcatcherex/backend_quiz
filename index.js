import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import routes from './src/routes/quizRoutes';
import cors from 'cors';

// Create app and server instances
const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173' // replace with your actual frontend's origin
  }));

const server = new Server(app);
const io = new SocketIOServer(server,
    {
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true // replace with your actual frontend's origin
        }
    });

// Define port
const PORT = process.env.PORT || 3000;

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/QuizDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Include to avoid DeprecationWarning in console
});

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes setup
routes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

io.on('connection', socket => {
    socket.on('submit-answer', data => {
        // Assuming 'questions' is an object where keys are question IDs and values are correct answers
        const isCorrect = questions[data.questionId] === data.selectedOption;

        // Emit feedback
        socket.emit('feedback', { questionId: data.questionId, isCorrect });
    });
});