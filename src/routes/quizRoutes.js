import { addNewQuiz, getQuiz, getQuizWithID, updateQuiz, deleteQuiz } from "../controllers/quizController";

const routes = (app) => {
  app
    .route("/quiz")
    //get all quizzes
    .get((req, res, next) => {
      //middleware
      console.log(`Request form: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getQuiz)
    //post a new quiz
    .post(addNewQuiz);

  app
    .route("/quiz/:quizId")
    //get specific quiz
    .get(getQuizWithID)

    //update specific quiz
    .put(updateQuiz)

    .delete(deleteQuiz);
};

export default routes;
