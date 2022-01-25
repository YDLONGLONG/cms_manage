import React,{useEffect, useState} from 'react';
import { Table, Button, message, Pagination  } from 'antd';
import {GetArticleListApi,DeleteArticleApi} from 'request/api'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { format } from 'path/posix';

const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    width: '65%'
  },
  {
    title: '发布时间',
    dataIndex: 'time',
    width: '20%'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '15%'
  },
];

interface IData {
  key: number;
  title: React.ReactNode;
  time: string;
  action: React.ReactNode;
}

const TitleComp = (props:{title:string;subTitle?:string;}) => (
  <>
    <div><a href="!#">{props.title}</a></div>
    <p style={{color:'#999'}}>{props.title||""}</p>
  </>
)

const ActionBtn = (props:{current:number;id:number;getListFn:(page:number,pageSize:number)=>void}) => {
  const navigate = useNavigate()
  const goToEdit = () =>{
    navigate('/edit/1')
  }

  const deleteFn = ()=>{
    DeleteArticleApi({id:props.id}).then((res:any)=>{
      if(res.errCode===0){
        message.success(res.message);
        props.getListFn(props.current,10);
      }else{
        message.error(res.message);
      }
    })
  }

  return (
  <>
    <Button type='primary' style={{ marginRight: '20px' }} onClick={goToEdit}>编辑</Button>
    <Button type='primary' danger onClick={deleteFn}>删除</Button>
  </>
  )
  }

export default function List() {
  const [data, setData] = useState<IData[]>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)

  const getListFn = (page:number,pageSize:number)=>{
    GetArticleListApi({
      current:page,
      counts:pageSize
    }).then((res:any)=>{
      if(res.errCode===0){
        message.success(res.message)
      }

      let newarr:IData[] = [];

      interface IItem{
        title:string;
        subTitle:string;
        date:string;
        id:number;
      }

      setTotal(res.data.total);
      setCurrent(res.data.current);
      res.data.arr.map((item:IItem)=>{
        let obj = {
          key:item.id,
          title:<TitleComp title={item.title} subTitle={item.subTitle} />,
          time:moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
          action: <ActionBtn current={current} getListFn={getListFn} id={item.id} />
        }
        newarr.push(obj)
      })
      setData(newarr)
    })
  }

  useEffect(()=>{
    getListFn(1,10);
  },[])

  const  onPageChange = (page:number, pageSize:number) => {
    console.log(page, pageSize);
    getListFn(page,pageSize);
  }

  return (
    <div>
    <Table showHeader={false} columns={columns} dataSource={data} pagination={false} />
    <Pagination
      onChange={onPageChange}
      defaultCurrent={1}
      total={total}
    />
    </div>
  )
}
