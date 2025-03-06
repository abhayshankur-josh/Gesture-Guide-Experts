// export interface IResponse {
//     statusCode: number;
//     message?: string;
//     errors?: string;
//     payload?: any;
// }
export interface IResponse {
    token?: string
    data?: any
    message?: string;
    error?: string;
}

export interface IRequest {
    body?: any;
}