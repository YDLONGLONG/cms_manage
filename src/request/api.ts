import request from './request'

interface IRegisterParams {
    username: string | number;
    password: string | number;
}

// 注册
export const RegisterApi = (params: IRegisterParams) => request.post('/register', params)
// 登录
export const LoginApi = (params: IRegisterParams) => request.post('/login', params)
