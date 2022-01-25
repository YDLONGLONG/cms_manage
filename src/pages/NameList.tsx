import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message } from 'antd';
import {EditorApi,ChangeEditorApi} from 'request/api'

interface IColumns{
  title:string;
  dataIndex:string;
  key:string;
  width?:string|number;
  // render?:any;
}

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '角色',
    dataIndex: 'player',
    key: 'player',
  },
  {
    title: '编辑权限',
    dataIndex: 'editable',
    key: 'editable',
  },
  {
    title: '权限操作',
    key: 'btns',
    dataIndex: 'btns',
    width:'30%'
  },
];

const data = [
  {
    key:1,
    avatar: <img src="" alt="头像" />,
    username: 'lx',
    player: '编辑人员',
    editable: '1',
    btns:(
    <>
    <Button type='primary'>开通编辑权限</Button>
    <Button type='primary' danger>取消编辑权限</Button>
    </>
    )
  },
];

interface IArr{
  key:number;
  avatar:React.ReactNode;
  username:string;
  player:string;
  editable:string;
  btns:React.ReactNode;
}

 const NameList = ()=> {
   const [arr,setArr]=useState<IArr[]>();
   const [num,setNum]=useState(0);

   const openEditable = (id:number)=>{
    ChangeEditorApi({
      id,open:1
    }).then((res:any)=>{
      if(res.errCode===0){
        message.success(res.message)
        setNum(num+1)
      }else{
        message.error(res.message)
      }
    })
   }

   const closeEditable = (id:number)=>{
     ChangeEditorApi({
      id,open:2
    }).then((res:any)=>{
      if(res.errCode===0){
        message.success(res.message)
        setNum(num+1)
      }else{
        message.error(res.message)
      }
    })
  }

  useEffect(()=>{
    EditorApi().then((res:any)=>{
      if(res.errCode===0){
        message.success(res.message)
        let newArr:IArr[] = [];
        res.data.forEach((item:any)=>{
          let obj = {
            key:item.id,
            avatar: <img src={process.env.SERVER_PORT+'/'+item.avatar} alt="头像" width={40} height={40} style={{borderRadius:'50%'}}/>,
            username: item.username,
            player: item.player==='vip'?'管理员':'编辑人员',
            editable: item.editable===1?'已开通':'未开通',
            btns:(
            <>
            <Button type='primary' onClick={()=>openEditable(item.id)}>开通编辑权限</Button>
            <Button type='primary' danger onClick={()=>closeEditable(item.id)}>取消编辑权限</Button>
            </>
            )
          }
          newArr.push(obj);
        })
        setArr(newArr);
      }else{
        message.error(res.message)
      }
    })
  },[])
  
  return (
      <div>
          <Table columns={columns} dataSource={arr} pagination={false} />
      </div>
  )
}

export default NameList;