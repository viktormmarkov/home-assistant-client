import React, {Fragment} from 'react'
import DatePicker from 'react-datepicker';
import { Label } from 'reactstrap';
const DATE_FORMAT = 'dd/MM/yyyy'

export default class CustomDatepicker extends React.Component {
    constructor() {
        super()
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
        };
    }
    setStartDate = (newDate) => {
        this.setState({
            startDate: newDate
        });
        this.props.onStartChange(newDate);
    }
    setEndDate = (newDate) => {
        this.setState({
            endDate: newDate
        });
        this.props.onEndChange(newDate);
    }
    render() {
        const selectedStart = new Date(this.props.startDate);
        const selectedEnd = new Date(this.props.endDate);
        return (
            <Fragment>
                <Label className="pr-2">From</Label>
                {!!this.props.startDate && <DatePicker
                    className="form-control"
                    dateFormat={DATE_FORMAT}
                    selected={selectedStart}
                    onChange={this.setStartDate}
                />}
                <Label className="px-2">To</Label>
                {!!this.props.endDate && <DatePicker
                        className="form-control"
                        dateFormat={DATE_FORMAT}
                        selected={selectedEnd}
                        onChange={this.setEndDate}>
                </DatePicker>}
            </Fragment>
        )
    }
}