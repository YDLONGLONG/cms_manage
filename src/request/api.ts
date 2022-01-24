import request from './request'

interface IRegisterParams {
    username: string;
    password: string;
}

// 注册
export const RegisterApi = (params: IRegisterParams) => request.post('/register', params)
// 登录
export const LoginApi = (params: IRegisterParams) => request.post('/login', params)
//获取用户信息
export const UserInfoApi = () => request.get('/info')

interface IChangUserInfo {
    username?: string;
    password?: string;
}

//修改用户信息
export const ChangeUserInfoApi = (params: IChangUserInfo) => request.post('/info', params)