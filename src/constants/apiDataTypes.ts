// export interface IResponse {
//     statusCode: number;
//     message?: string;
//     errors?: string;
//     payload?: any;
// }
export interface IResponse {
    data?: any
    message?: string;
    error?: string;
}

export interface IRequest {
    body?: any;
}