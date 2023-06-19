import mongoose from "mongoose";
const {Schema} = mongoose;

export const QuizSchema = new Schema({
    question:{
        type: String,
        required: 'Enter a question'
    },
    option:{
        type: [String],
        required: 'Enter a option'
    },
    answer:{
        type: String,
        required: 'Enter a answer'
    },
    explain:{
        type: String,
    }

})