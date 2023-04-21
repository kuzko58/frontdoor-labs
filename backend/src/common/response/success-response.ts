export class SuccessResponse {
  constructor(private message: string, private data?: object) {}

  toJSON() {
    const response = {
      success: true,
      message: this.message,
      data: this.data,
    };

    return response;
  }
}

export const successResponse = (message: string, data?: object): SuccessResponse => {
  return new SuccessResponse(message, data);
};
