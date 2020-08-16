import React, { Component } from 'react';
import {Space, Form, Input, Button, Modal, message} from 'antd';
import {connect} from 'react-redux';

import { AddUserRequest } from '../actions/actions';

class AddForm extends Component {
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
    onChange = e => {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value,
        })
    }
    onFinish = () => {
        var {firstname, lastname, age,address} = this.state;
        var user = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            address: address
        }
        this.props.onAddUser(user);
    }
    onClose = () => {
        this.setState({
            visible: false
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOK = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          message.success("CREATE SUCCESSFULLY");
        }, 1500);
        var {firstname, lastname, age,address} = this.state;
        var user = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            address: address
        }
        this.props.onAddUser(user);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    render() {
        var {firstname, lastname, age,address, visible, loading} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal} size="middle" style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', marginTop: '20px', width: '300px', display: 'block'}}>
                    ADD
                </Button>
                <Modal 
                    visible={visible}
                    title="ADD USER"
                    centered
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                        Cancel
                      </Button>,
                      <Button key="submit" type="primary" loading={loading} onClick={this.handleOK}>
                        Create
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
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddUser: (user) => {
            dispatch(AddUserRequest(user));
        }
    }
}

export default connect(null, mapDispatchToProps)(AddForm);