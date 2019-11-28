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
        const validStart = !!this.props.startDate;
        const validEnd = !!this.props.endDate;
        const selectedStart = new Date(this.props.startDate);
        const selectedEnd = new Date(this.props.endDate);
        return (
            <Fragment>
                <Label className="pr-2">From</Label>
                <DatePicker
                    className="form-control"
                    dateFormat={DATE_FORMAT}
                    selected={validStart ? selectedStart: this.state.startDate}
                    onChange={this.setStartDate}
                />
                <Label className="px-2">To</Label>
               <DatePicker
                    className="form-control"
                    dateFormat={DATE_FORMAT}
                    selected={validEnd ? selectedEnd: this.state.endDate}
                    onChange={this.setEndDate}
                />
            </Fragment>
        )
    }
}