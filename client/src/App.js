import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Filter from './components/Filter'
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3 className="App-title">INSPECTIONS RESTAURANT WEB APP</h3>
        </header>

        <p className="App-intro">
          <br/> 
          You can use this web app to search restaurants and their inspection with various filters.
          <br/>
          <br/>
        </p>
        <Container>
          <Row>
            <Col>
              Filters : 
              <Filter name="Borough"/>
              <Filter name="Cuisine Type"/>
              <Filter name="Critical Flag"/>
              <Filter name="Grade"/>
              <Filter name="Violation Code"/>
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default App;
