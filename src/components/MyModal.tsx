import React, { useState } from 'react';
import { Form, Input, Modal, Button } from 'antd';

interface IProps{
  showModal:boolean;
  setShowModal:(bool:boolean)=>void;
  title:string;
  subTitle:string;
  submitArticleEdit:(res:{title:string;subTitle:string;})=>void;
}

const MyModal = (props:IProps) => {
  const [form] = Form.useForm();

  //确认
  const handleOk = () => {
    form.validateFields().then(res=>{
      props.submitArticleEdit(res)
    }).catch(err=>{

    })
  };
  //取消
  const handleCancel = () => {
    props.setShowModal(false)
  };

  return (
    <Modal title="文章" visible={props.showModal} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消">
    <Form
      form={form}
      name="basic"
      initialValues={{ title:props.title,subTitle:props.subTitle }}
      autoComplete="off"
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="副标题"
        name="subTitle"
      >
        <Input />
      </Form.Item>
    </Form>

    </Modal>
  );
};

export default MyModal;