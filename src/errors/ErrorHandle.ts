import { BaseError } from "./baseError"

class ErrorHandle {
  public async handleError(error: Error): Promise<void> {
    console.log('Error message from the centralized error-handling component', error)
  }

  public isTrustedError(error: Error){
    if(error instanceof BaseError){
      return error.isOperational
    }

    return false;
  }
}

export const errorHandle = new ErrorHandle();