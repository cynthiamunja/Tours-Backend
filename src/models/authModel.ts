//import { Request } from 'express';

export interface User{
    UserID:string,
    UserName:string,
    Email:string,
    UserPassword:string,
    isDeleted:number,
    isEmailSent:number
}

export interface Payload{
    UserID:string,
    Email:string,
    UserName:string

}
// export interface extendedRequest1 extends Request{
//     info?:Payload
// }
// export interface usersRequest extends Request {
//     body: {
//     UserName:string,
//     Email:string,
//     UserPassword:string
//     };
// }