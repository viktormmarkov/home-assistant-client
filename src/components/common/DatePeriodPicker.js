import React, {Fragment} from 'react'
import DatePicker from 'react-datepicker';
import { Label } from 'reactstrap';
const DATE_FORMAT = 'dd/MM/yyyy'

export default class CustomDatepicker extends React.Component {
    constructor() {
        super()
        this.state = {
            startDate: null,
            endDate: null,
        };
    }
    setStartDate = (newDate) => {
        this.setState({
            startDate: newDate
        });
    }
    setEndDate = (newDate) => {
        this.setState({
            endDate: newDate
        });
    }
    render() {
        return (
            <Fragment>
                <Label className="pr-2">From</Label>
                <DatePicker
                    className="form-control"
                    dateFormat={DATE_FORMAT}
                    selected={this.state.startDate}
                    onChange={this.setStartDate}
                />
                <Label className="px-2">To</Label>
                <DatePicker
                    className="form-control"
                    dateFormat={DATE_FORMAT}
                    selected={this.state.endDate}
                    onChange={this.setEndDate}>
                </DatePicker>
            </Fragment>
        )
    }
}