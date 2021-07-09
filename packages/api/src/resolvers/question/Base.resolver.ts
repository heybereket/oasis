import Question from '@entities/Question';
import { createResolver } from '@utils/files/createResolver';

// @bcg-resolver(query, paginateQuestions, question)
// @bcg-resolver(query, getQuestion, question)

export default createResolver('Question', Question);
