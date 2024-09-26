import { HttpStatusCode } from "@utils/HttpStatusCode";
import { BaseError } from "./baseError";

export class HTTP401Error extends BaseError{
  constructor(description: string){
    super('Unauthorized', HttpStatusCode.UNAUTHORIZED, description, true)
  }
}