import { HttpStatusCode } from "@utils/HttpStatusCode";
import { BaseError } from "./baseError";

export class HTTP400Error extends BaseError{
  constructor(description = 'Bad Request'){
    super('Bad Request', HttpStatusCode.BAD_REQUEST, description, true)
  }
}