import { useEffect, useState } from 'react';
import { PageHeader, Button, message } from 'antd';
import E from 'wangeditor'
import {useLocation, useParams} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'
import moment from 'moment'
import MyModal from './MyModal';
import {GetArticleByIdApi,EditArticleApi,AddArticleApi} from 'request/api'

let editor = null
const Editor = () => {
  const {id} = useParams();
  const location = useLocation()
  const [content, setContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");
  //显示model隐藏
  const [showModal, setShowModal] = useState(Boolean);

  useEffect(() => {

    // 实例化
    editor = new E("#myeditor")
    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    }
    // 创建
    editor.create()
    
    //获取地址栏id
    if(id){
      GetArticleByIdApi(id).then(res=>{
        if(res.errCode===0){
          message.success(res.message)
          //设置富文本编辑器内容
          //setContent(res.data.content);
          editor.txt.html(res.data.content)
          //设置模态框标题
          setModalTitle(res.data.title)
          //设置模态框副标题
          setModalSubTitle(res.data.subTitle)
        }else{
          message.error(res.message)
        }
      })
    }else{

    }
 
    return () => {
      // 组件销毁时销毁编辑器
      editor.destroy()
    }
    // eslint-disable-next-line
  }, [])

  //模态框点击提交
  const submitArticleEdit = (values) =>{
    //有id调用编辑接口
    if(id){
      EditArticleApi({
        // title:values.title,
        // subTitle:values.subTitle,
        ...values,
        content,
        id,
      }).then(res=>{
        if(res.errCode===0){
          message.success(res.message)
          setShowModal(false)
        }
      })
      //无id调用添加接口
    }else{
      AddArticleApi({
        ...values,
        content,
      }).then(res=>{
        if(res.errCode===0){
          message.success(res.message)
          setShowModal(false)
        }
      })
    }
  }

  return (
    <div className="editor">
      <PageHeader
        style={{padding: 0, marginBottom: '20px'}}
        backIcon={location.pathname==='/edit' ?false:<ArrowLeftOutlined />}
        onBack={()=>null}
        ghost={false}
        title="文章编辑"
        subTitle={`当前日期：${moment().format('YYYY-MM-DD')}`}
        extra={[
          <Button key="3" type="primary" onClick={()=>setShowModal(true)}>提交文章</Button>,
        ]}
      ></PageHeader>
      <div id="myeditor"></div>
      <MyModal showModal={showModal} setShowModal={setShowModal}  title={modalTitle} subTitle={modalSubTitle} submitArticleEdit={submitArticleEdit} />
    </div>
  );
}

export default Editor;