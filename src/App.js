import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';


import TableList from './component/TableList';
import AddForm from './component/AddForm';

class App extends Component {
  render() {
    return(
      <>
        <AddForm/>
        <TableList/>
      </>
    );
  }
}
export default App;

