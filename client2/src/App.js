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
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      showRowHover: true,
      showCheckboxes: false,
      height: '600px',
      data: [],
      filter: {
        restaurant_name: "",
        borough: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  

  handleChange = (event) => {
    this.setState({
      filter: {
        [event.target.name]: event.target.value
      }
    });
  };

  handleSearch(e) {
    console.log(this.state.filter)
    var url = `api/restaurants?fields.restaurant.borough=${this.state.filter.borough}`
    console.log(url)
    fetch(url)
      .then((res) => res.json()
        .then((json) => {
          console.log(json)
          this.setState({ data : json[0].hits.hits})
        }))
  }

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
              <TextField name="restaurant_name" floatingLabelText="Restaurant" onChange={this.handleChange} />
            </TableHeaderColumn>
            <TableHeaderColumn colSpan="1">
              <TextField name="borough" floatingLabelText="borough" onChange={this.handleChange} />
            </TableHeaderColumn>
            <TableHeaderColumn colSpan="1">
              <RaisedButton label="Search" primary={true} onClick={this.handleSearch.bind(this)} />
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
            <TableHeaderColumn> <FlatButton label="Restaurant" /></TableHeaderColumn>
            <TableHeaderColumn><FlatButton label="Borough" /> </TableHeaderColumn>
            <TableHeaderColumn><FlatButton label="Cuisine Type" /></TableHeaderColumn>
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
