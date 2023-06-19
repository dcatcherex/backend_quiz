import mongoose from 'mongoose';
import { QuizSchema } from '../models/quizModel';

const Quiz = mongoose.model('Quiz', QuizSchema);

export const addNewQuiz = async (req, res) => {
    try {
      let newQuiz = new Quiz(req.body);
      const quiz = await newQuiz.save();
      res.json(quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  export const getQuiz = async (req, res) => {
    try {
      const quiz = await Quiz.find();
      res.json(quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  export const getQuizWithID = async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizId);
      res.json(quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  
  }

  export const updateQuiz = async (req, res) => {
    try {
      const quiz = await Quiz.findOneAndUpdate(
        { _id: req.params.quizId },
        req.body,
        { new: true }
      );
      res.json(quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  
  }

  export const deleteQuiz = async (req, res) => {
    try {
      const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
      res.json(quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  
  
  }