export class CreateRequestDto {
  requestData: { transferRequests: any[]; parameterData: any };
  userPassword: any;

  constructor(requestData: { transferRequests: any[]; parameterData: any }, userPassword: any) {
    this.requestData = requestData;
    this.userPassword = userPassword;
  }
}
