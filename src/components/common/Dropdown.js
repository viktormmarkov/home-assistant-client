import _ from 'lodash';
import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input } from 'reactstrap';

const str2bool = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
      if (value.toLowerCase() === "null") return null;
    }
    return value;
 }

const convertToType = (type, value) => {
    switch (type) {
        case 'boolean':
            return str2bool(value);
        default :
            return value;
    }
}

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
    getSelectedIndex = (value) => {
        const {items, valueField} = this.props;
        return _.findIndex(items, i => i[valueField] === value);
    }
    getSelected = (value) => {
        const selectedIndex = this.getSelectedIndex(value);
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
            const {type} = this.props;
            const selected = this.getSelected(convertToType(type, e.target.value));
            this.props.onChange(selected);            
        }
        const selectedIndex = this.getSelectedIndex(e.target.value);
        this.setState({
            selectedIndex
        });
    }
    updateSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        const {placeholder, search} = this.state;
        const {valueKey, text, value, searchDisabled, searchPlaceholder, allOption} = this.props;
        const selected = this.getSelected(value);
        const items = (this.props.items || []).filter(i => {
            return !i.name || !search || i.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        const ALL_OPTION = {[valueKey]: null, [text]: "All"};
        const itemsExtended = allOption ? [ALL_OPTION, ...items] : items;
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={() => {this.toggle();}} className={this.props.className}>
                <DropdownToggle caret>
                    {selected[text] || this.props.placeholder || placeholder}
                </DropdownToggle>
                <DropdownMenu >
                    {
                        !searchDisabled ? (
                            <Input placeholder={searchPlaceholder || 'Type to filter' } 
                                value={search} 
                                onChange={this.updateSearch}
                            />
                        ) : null
                    }
                    <div className={'dropdownMenu'}>
                        {itemsExtended.map((i, index) => (<DropdownItem 
                        key={(valueKey && i[valueKey]) || index} 
                        onClick={this.updateValue} 
                        value={i[valueKey]} 
                        active={i[valueKey] === selected[valueKey]}>
                            {i[text]}
                        </DropdownItem>))}
                    </div>
                </DropdownMenu>
            </Dropdown>
        )
    }
}
