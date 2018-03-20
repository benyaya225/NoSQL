import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {

  state = {
    fixedHeader: true,
    fixedFooter: true,
    showRowHover: true,
    showCheckboxes: false,
    height: '600px',
    data: [],
    filter: {
      restaurant_name: ""
    }
  };

  handleChange = (event) => {
    this.setState({
      filter: {
        [event.target.name]: event.target.value
      }
    });
  };

  componentDidMount() {
    fetch('/api/inspectionsrestaurant/inspectionrestaurant')
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({ data: json[0].hits.hits })
      })
  }

  render() {

    var data = this.state.data.map(model =>
      <TableRow>
        <TableRowColumn>{model._source.fields.restaurant.name}</TableRowColumn>
        <TableRowColumn>{model._source.fields.restaurant.borough}</TableRowColumn>
        <TableRowColumn>{model._source.fields.restaurant.cuisineType}</TableRowColumn>
      </TableRow>)

    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedfooter={this.state.fixedFooter}>
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}>

          <TableRow
            displayBorder={false}>
            <TableHeaderColumn colSpan="1">
              <TextField name = "restaurant_name" floatingLabelText="Restaurant" onChange={this.handleChange} />
            </TableHeaderColumn>
            <TableHeaderColumn colSpan="1">
              <TextField name = "borough "floatingLabelText="borough" onChange={this.handleChange} />
            </TableHeaderColumn>
          </TableRow>

          <TableRow>
            <TableHeaderColumn
              colSpan="3"
              style={{ textAlign: 'center' }}>
              Inspections restaurant
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn> <FlatButton label = "Restaurant"/></TableHeaderColumn>
            <TableHeaderColumn><FlatButton label = "Borough"/> </TableHeaderColumn>
            <TableHeaderColumn><FlatButton label = "Cuisine Type"/></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          showRowHover={this.state.showRowHover}>
          {data}
        </TableBody>
      </Table>
    );
  }
}

export default App;
