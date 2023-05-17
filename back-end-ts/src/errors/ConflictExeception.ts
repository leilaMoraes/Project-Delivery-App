import HttpException from './HttpException';
import StatusCodes from '../utils/statusCode';

export default class ConflictException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, message);
  }
}
