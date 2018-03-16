import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Filter from './components/Filter'
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3 className="App-title">WELCOME TO YOUR INSPECTIONS RESTAURANT APPLICATION</h3>
        </header>

        <p className="App-intro">
          <br/>
          You can use this web app to search restaurants and their inspection with various filters.
          <br/>
          <br/>
        </p>
        <Container>
          <Row>
            <Col> Search a restaurant by : </Col> 
          </Row>
          <Row>
            <Col>
              <Filter name="Borough"/>
              <Filter name="CuisineType"/>
              <Filter name="CriticalFlag"/>
            </Col>
          </Row>
        
        </Container>
        
      </div>
    );
  }
}

export default App;
