import React from 'react';
import { Table, Button } from 'antd';

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

const TitleComp = () => (
  <>
    <div><a href="!#">123123</a></div>
    <p style={{color:'#999'}}>456456</p>
  </>
)

const ActionBtn = () => (
  <>
    <Button type='primary' style={{ marginRight: '20px' }}>编辑</Button>
    <Button type='primary' danger>删除</Button>
  </>
)

const data: IData[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    title: <TitleComp />,
    time: '1111',
    action: <ActionBtn />,
  });
}

export default function List() {
  return (
    <Table showHeader={false} columns={columns} dataSource={data} />
  )
}
