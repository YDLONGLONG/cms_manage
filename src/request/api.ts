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

interface IGetArticleListApi{
    current:number;
    counts:number;
}

//获取文章列表
export const GetArticleListApi = (params:IGetArticleListApi) => request.post('/article/list',params)
//根据id获取文章
export const GetArticleByIdApi = (params: {id:number}) => request.get(`/article/info/${params}`)

interface IEditArticle{
    title:string;
    subTitle?:string;
    content:string;
    id?:number;
}

//文章编辑
export const EditArticleApi = (params: IEditArticle) => request.post('/article/edit', params)
//文章删除
export const DeleteArticleApi = (params: {id:number}) => request.post('/article/delete', params)
//文章添加
export const AddArticleApi = (params: IEditArticle) => request.post('/article/add', params)
//获取小编名单
export const EditorApi = () => request.get('/namelist')

interface IChangeEditor{
    id:number;
    open:number;
}

//修改小编名权限
export const ChangeEditorApi = (params: IChangeEditor) => request.post('/namelist', params)