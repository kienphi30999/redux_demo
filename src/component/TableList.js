import React, { Component } from 'react';
import {Table, Space, Popconfirm, Form, Input, Button, Modal, message} from 'antd';
import {EditOutlined, QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';

import {FetchUserRequest, DeleteUserRequest, EditUserRequest, UpdateUserRequest} from '../actions/actions';

const {Column} = Table;
class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            age: '',
            address: '',
            visible: false,
            loading: false
        }
    }
    componentDidMount() {
        this.props.fetchAllUsers();
    }
    componentWillUpdate(nextProps) {
        console.log("Will Update next props: ", nextProps);
    }
    componentDidUpdate(prevProps) {
        if(this.props.editusers !== prevProps.editusers) {
            this.setState({
                id: this.props.editusers.id,
                firstname: this.props.editusers.firstname,
                lastname: this.props.editusers.lastname,
                age: this.props.editusers.age,
                address: this.props.editusers.address,
            })
        }
    }
    onConfirm = (id) => {
        this.props.onDeleteUser(id);
        setTimeout(() => {
            message.success("DELETE SUCCESSFULLY");
        }, 500);
    }
    showModal = (id) => {
        this.setState({
            id: id,
            visible: true
        })
        this.props.onEditUser(id);
    }
    handleOK = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          message.success("UPDATE SUCCESSFULLY");
        }, 1500);
        const {id, firstname, lastname, age, address} = this.state;
        const edituser = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            age: age,
            address: address
        } 
        this.props.onUpdateUser(edituser);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    onChange = (e) => {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value,
        })
    }
    render() {
        const {users} = this.props;   
        const {firstname, lastname, age, address, visible, loading} = this.state;
        const column = [
            {
                title: 'First Name',
                dataIndex: 'firstname',
                key: 'firstname'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastname',
                key: 'lastname'
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Action',
                render: record => (
                    <Space size={20}>
                        <EditOutlined style={{ color: 'blue' }} onClick={() => this.showModal(record.id)}/>
                        <Popconfirm 
                            title="Do you want to delete this？" 
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => this.onConfirm(record.id)}
                        >
                            <DeleteOutlined style={{color: 'red'}}/>
                        </Popconfirm>
                    </Space>
                )
            }
        ];
        console.log("User render: ", users);
        return (
            <>
                <Table dataSource={users} columns={column}/>
                <Modal 
                    visible={visible}
                    title="EDIT USER"
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                        Cancel
                      </Button>,
                      <Button key="submit" type="primary" loading={loading} onClick={this.handleOK}>
                        Save
                      </Button>,
                    ]}
                >
                    <Form
                    name="dynamic_form_nest_item"
                    layout="vertical"
                    onFinish={this.onFinish} autoComplete="off"
                    >
                        <Form.Item
                            label="First Name"
                        >
                            <Input placeholder="First Name" name="firstname" value={firstname} onChange={this.onChange}/>
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                        >
                            <Input placeholder="Last Name" name="lastname" value={lastname} onChange={this.onChange}/>
                        </Form.Item>

                        <Form.Item
                            label="Age"
                        >
                            <Input placeholder="Age" name="age" value={age} onChange={this.onChange}/>
                        </Form.Item>

                        <Form.Item
                            label="Address"
                        >
                            <Input placeholder="Address" name="address" value={address} onChange={this.onChange}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps - Reducer: ", state.reducers.users);
    return {
        users: state.reducers.users,
        editusers: state.EditUser.editusers
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllUsers: () => {
            dispatch(FetchUserRequest());
        },
        onDeleteUser: (id) => {
            dispatch(DeleteUserRequest(id));
        },
        onEditUser: (id) => {
            dispatch(EditUserRequest(id));
        },
        onUpdateUser: (user) => {
            dispatch(UpdateUserRequest(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);