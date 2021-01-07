import { Button, Modal, Space, Table } from "antd";
import * as React from "react"
import {UploadInfo} from "../../pages/upload";




export default class PulishPage extends React.Component<any, any>{

    constructor(props){
        super(props);
    
        this.state={
        visible:false,
          msglist:[]  //动态数据的表格内的数据
        }
    }

    componentDidMount() {
        this.resetData()
     }
 
    resetData() {
        fetch('http://localhost:8111/',{
            // post提交
            method:"get",
            headers:{
                "Content-type":"application/json"
            },
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)

            const data1 = data.map((data,index)=>{
                return {
                        ...data,
                        index:index+1
                }
            })
            this.setState({
                msglist : data1
            })
        })
    }

    hideModal = () => {
    this.setState({
        visible: false,
    });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
        };

    onCreate = values => {
        
        console.log('Received values of form: ', values);
        this.hideModal();
        fetch('http://localhost:8111/',{
            // post提交
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(values)//把提交的内容转字符串
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
        })
        };
    
    render() {

        const columns = [
            {
              title: '序号',
              dataIndex: 'index',
              width: 50,
            },
            {
              title: '内容',
              dataIndex: 'content',
              
            },
            {
              title: '价值',
              dataIndex: 'price',
              width: 200,
            },
            {
                title: '联系方式',
                dataIndex: 'contact',
                width: 200,
              },
            {
              title: '日期',
              dataIndex: 'date',
              width: 200,
            },
          ];

        return <>
        <Space style={{ margin: 16 }}>
                <Button style={{ color: 'red' }} onClick={this.showModal}>发布信息</Button>
        </Space>
        
        <Table
            columns={columns}
            dataSource={this.state.msglist}
            bordered
        />

        <Modal 
            title="发布信息" 
            visible={this.state.visible}  
            onCancel={this.hideModal} 
            okText="发布" 
            cancelText="取消"
            onOk={this.hideModal}
            >
        <UploadInfo 
            visible={this.state.visible}
            onCreate={this.onCreate}
            onCancel={this.hideModal}
        />
        </Modal>
        </>
    }
}
