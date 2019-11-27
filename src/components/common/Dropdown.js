import React, { Component, Fragment } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';


export default class SmartDropdown extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            selectedItem: {
                value: null,
                text: null
            },
            selectedIndex: null,
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    updateValue = (e) => {
        this.setState({
            selectedItem: this.props.items[e.target.value],
            selectedIndex: e.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(this.props.items[e.target.value]);            
        }
    }
    render() {
        const {placeholder, selectedItem} = this.state;
        const {value, text} = this.props;
        const items = this.props.items || [];
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={() => {this.toggle();}}>
                <DropdownToggle caret>
                    {selectedItem[text] || this.props.placeholder || placeholder}
                </DropdownToggle>
                <DropdownMenu>
                    {items.map((i, index) => (<DropdownItem 
                    key={i[value]} 
                    onClick={this.updateValue} 
                    value={index} 
                    active={index === this.state}>
                        {i[text]}
                    </DropdownItem>))}
                </DropdownMenu>
            </Dropdown>
        )
    }
}
