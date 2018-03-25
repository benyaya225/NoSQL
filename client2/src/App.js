import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableFooter,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Container, Row, Col } from 'react-grid-system';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      showRowHover: true,
      showCheckboxes: false,
      data: [],
      filter: {
        name: "",
        borough: "",
        sort: "",
      },
      page: 1
    };
    this.handleSearch = this.handleSearch.bind(this);
  }




  handleSearch(e) {

    var url = `api/restaurants?`
    if (this.state.page != 1) {
      url += 'page=' + this.state.page + "&";
    }
    if (this.state.filter.sort != "") {
      url += 'sort=' + this.state.filter.sort + "&";
    }
    for (var name in this.state.filter) {
      if (this.state.filter[name] != "" && name != 'sort')
        url += "fields.restaurant." + name + "=" + this.state.filter[name] + "&";
    }

    if (url == `api/restaurants?`) {
      this.componentDidMount()
    } else {
      console.log(url)
      fetch(url)
        .then((res) => res.json()
          .then((json) => {
            console.log(json)
            this.setState({ data: json.hits.hits })
          }))
    }
  }

  handleNext(e) {
    this.setState({ page: this.state.page + 1 }, () => {
      this.handleSearch(e)
    })
  }

  handlePrev(e) {
    this.setState({ page: this.state.page - 1 }, () => {
      this.handleSearch(e)
    })
  }

  handleChange = (event) => {
    this.setState({
      filter: { ...this.state.filter, [event.target.name]: event.target.value }
    });
    console.log(this.state.filter)
  };

  handleSort(key, event) {
    console.log(key)
    console.log(event)
    this.setState({ filter: { ...this.state.filter, sort: [key] } }, () => this.handleSearch(event))
  }

  componentDidMount() {
    fetch('/api/inspectionsrestaurant/inspectionrestaurant')
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({ data: json[0].hits.hits })
      })
  }

  handleGet(e) {
    fetch('api/loadData')
      .then((res) => { window.location.reload() })
  }

  render() {

    var data = this.state.data.map(model =>
      <TableRow>
        <TableRowColumn>{model._source.fields.restaurant.name}</TableRowColumn>
        <TableRowColumn>{model._source.fields.restaurant.borough}</TableRowColumn>
        <TableRowColumn>{model._source.fields.restaurant.cuisineType}</TableRowColumn>
      </TableRow>)

    return (
      <div>
        <Container fluid>
          <Row>
            <RaisedButton label="GET THE DATA" onClick={this.handleGet} fullWidth  secondary={true} />
          </Row>
        </Container>
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
                <TextField name="name" floatingLabelText="Restaurant" onChange={this.handleChange.bind(this)} />
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1">
                <TextField name="borough" floatingLabelText="borough" onChange={this.handleChange.bind(this)} />
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1">
                <RaisedButton label="Search" primary={true} onClick={this.handleSearch} />
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
              <TableHeaderColumn> <FlatButton label="Restaurant" value="name" onClick={this.handleSort.bind(this, "fields.restaurant.name")} /></TableHeaderColumn>
              <TableHeaderColumn><FlatButton label="Borough" /> </TableHeaderColumn>
              <TableHeaderColumn><FlatButton label="Cuisine Type" /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            showRowHover={this.state.showRowHover}>
            {data}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <Container>
              <Row>
                <Col md={3} offset={{ md: 5 }}>
                  <FlatButton label="previous" onClick={this.handlePrev.bind(this)} disabled={this.state.page == 1} />
                  <RaisedButton label="next" secondary={true} onClick={this.handleNext.bind(this)} />
                </Col>
              </Row>
            </Container>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default App;
