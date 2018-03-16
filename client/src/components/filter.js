import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      boroughs : ["puteaux", "courbevoie"]
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    if(this.props.name === "Borough") {
      return (
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.boroughs.map(borough=>            
              <DropdownItem key={borough}>{borough}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    else if(this.props.name === "CuisineType") {
      return (
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.types.map(type=>            
              <DropdownItem key={type}>{type}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    else if(this.props.name === "CriticalFlag") {
      return (
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.flags.map(flag=>            
              <DropdownItem key={flag}>{flag}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    
  }
}

