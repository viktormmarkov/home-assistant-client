import _ from 'lodash';
import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input } from 'reactstrap';

export default class SmartDropdown extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            selectedItem: {
                value: null,
                text: null
            },
            search: '',
            selectedIndex: null,
        };
    }
    getSelected = (value) => {
        const {items, valueField} = this.props;
        const selectedIndex = _.findIndex(items, i => i[valueField] === value);
        if (selectedIndex > -1) {
            return this.props.items[selectedIndex];
        } else {
            return {};
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    updateValue = (e) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.items[e.target.value]);            
        }
        this.setState({
            selectedIndex: e.target.value
        });
    }
    updateSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        const {placeholder, search} = this.state;
        const {valueKey, text, value} = this.props;
        const selected = this.getSelected(value);
        const items = (this.props.items || []).filter(i => {
            return !i.name || !search || i.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={() => {this.toggle();}}>
                <DropdownToggle caret>
                    {selected[text] || this.props.placeholder || placeholder}
                </DropdownToggle>
                <DropdownMenu >
                    <Input placeholder="Search products" value={search} onChange={this.updateSearch}/>
                    <div className={'dropdownMenu'}>
                        {items.map((i, index) => (<DropdownItem 
                        key={valueKey && i[valueKey] || index} 
                        onClick={this.updateValue} 
                        value={index} 
                        active={index === this.state.selectedIndex}>
                            {i[text]}
                        </DropdownItem>))}
                    </div>
                </DropdownMenu>
            </Dropdown>
        )
    }
}
