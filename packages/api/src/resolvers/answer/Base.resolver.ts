import Answer from '@entities/Answer';
import { createResolver } from '@utils/files/createResolver';

// @bcg-resolver(query, paginateAnswers, answer)
// @bcg-resolver(query, getAnswer, answer)

export default createResolver('Answer', Answer);
