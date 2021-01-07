import { Table, Button, Space,Modal,Form,Input,Typography } from 'antd';
import * as React from "react";

const { Text, Link } = Typography;

interface Values {
    content: string;
    price: string;
    contact: string;
  }
  
  interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
  }
  
  export const UploadInfo: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="发布信息"
        okText="发布"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate({content:values.content,price:values.price,contact:values.contact});
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
          
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
        
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入有效的发布内容!' }]}
          >
            <Input.TextArea placeholder="请填写发布信息的内容" />
          </Form.Item>
          <Form.Item 
          name="price" 
          label="价格"
          rules={[{ required: true, message: '请输入价格!' }]}
          >
            <Input type="具体价格或者面议" />
          </Form.Item>
          <Form.Item 
          name="contact" 
          label="联系方式"
          rules={[{ required: true, message: '请输入联系方式，买家方便联系你!' }]}
          >
            <Input type="QQ、微信、手机号等常用联系方式" />
          </Form.Item>
        </Form>

        <Text type="danger">请确保信息准备无误的填写，否则可能会发布失败</Text>
      </Modal>
    );
  };


// export default class UploadInfo extends React.Component {

//     form = Form.useForm();

//     finished() {
//         console.log(this.form.values)
//     }

//     render() {

//         return  <>
//         <Form
//         name="basic"
//         initialValues={{ remember: true }}
//         // onFinish={ this.finished}
//         >

//             <Form.Item label="内容" name="content" rules={[
//                 {required: true, message: 'Please input your E-mail!'},
//             ]}>
//                 <Input.TextArea placeholder="请填写发布信息的内容"/>
//             </Form.Item>

//             <Form.Item label="价格" name="price" rules={[
//                 {required: true, message: '价格不能为空,具体价格或者面议!'},
//             ]}>
//                 <Input placeholder="数字或者面议" />
//             </Form.Item>

//             <Form.Item label="联系方式" name="address" rules={[
//                 {required: true, message: '联系方式不能为空,建议微信，手机号或者qq号!'},
//             ]}>
//                 <Input placeholder="必须要填写" />
//             </Form.Item>

//         </Form>
//         </>
//     }
// }