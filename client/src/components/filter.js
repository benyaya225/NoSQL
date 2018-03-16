import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      boroughs : ["puteaux", "courbevoie"],
      types : ["mexicain", "italien"],
      flags : ["Critical", "Not Critical"],
      grades : ["A","B","C"],
      codes : ["02G","0BA"]
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
        <ButtonDropdown className="filter" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
          <DropdownToggle caret color="primary"> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.boroughs.map(borough=>            
              <DropdownItem key={borough}>{borough}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    else if(this.props.name === "Cuisine Type") {
      return (
        <ButtonDropdown className="filter" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
          <DropdownToggle caret color="primary"> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.types.map(type=>            
              <DropdownItem key={type}>{type}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    else if(this.props.name === "Critical Flag") {
      return (
        <ButtonDropdown className="filter" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
          <DropdownToggle caret color="primary"> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.flags.map(flag=>            
              <DropdownItem key={flag}>{flag}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    else if(this.props.name === "Grade") {
      return (
        <ButtonDropdown className="filter" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
          <DropdownToggle caret color="primary"> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.grades.map(grade=>            
              <DropdownItem key={grade}>{grade}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    else {
      return (
        <ButtonDropdown className="filter" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
          <DropdownToggle caret color="primary"> {this.props.name} </DropdownToggle>
          <DropdownMenu>
            {this.state.codes.map(code=>            
              <DropdownItem key={code}>{code}</DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
  }
}

