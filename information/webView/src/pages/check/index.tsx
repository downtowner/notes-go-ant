import { Button, Table } from "antd";
import * as React from "react"
import "./index.less"


export default class CheckPage extends React.Component<any,any> {

    constructor(props){
        super(props);
    
        this.state={
          msglist:[]  //动态数据的表格内的数据
        }
    }
    
    componentDidMount() {
       this.resetData()
    }

    resetData() {
        
        const params = window.location.href.split('?')[1]
        const url1 = "http://localhost:8111/check"
        const url2 =  url1 + "?" + params
        console.log(url2)

        fetch(url2,{
            // get提交
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

    putData(type,msgid) {
        console.log("putdata:",type,msgid)
        //请求的url
        const url="http://localhost:8111/check";
        //请求的参数
        const param={
            msgid:msgid,
            status:type
        };
        //调用fetch
        fetch(url,{
            //请求方式
            method:'put',
            //将请求的参数转成json
            body:JSON.stringify(param) ,
            //请求头
            headers: {
                'content-type': 'application/json'
            }
        // 请求的返回值
        }).then(function (response) {
            if(response.status===200){
                response.json().then(function (data) {
                    //获取请求的返回字段
                    console.log(data);
                    location.reload(true) 
                })
            }else {
                alert("出现一个问题");
            }

        })
    }

    onPass(values){
        this.putData(1,values)
    }

    onReject(values) {
        this.putData(2,values)
    }

    render() {

        const index = 1

        const columns = [
            {
              title: '序号',
              dataIndex: 'index',
            },
            {
              title: '内容',
              dataIndex: 'content',
            },
            {
              title: '价格',
              dataIndex: 'price',
            },
            {
                title: '联系方式',
                dataIndex: 'contact',
              },
            {
              title: '发布日期',
              dataIndex: 'date',
            },
            {
                title: 'Action',
                dataIndex: 'msgid',
                render: (value,record) => <>
                <Button type="primary" danger onClick={this.onReject.bind(this,value)}>
                驳回
                </Button>
                <Button type="primary" className="item-layout" onClick={this.onPass.bind(this,value)}>
                通过
                </Button></>,
                
            },
          ];

        return <Table
            columns={columns}
            dataSource={this.state.msglist}
            bordered
        />
    }
}