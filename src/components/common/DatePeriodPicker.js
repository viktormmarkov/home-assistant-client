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
        const selectedStart = validStart ? new Date(this.props.startDate) : this.state.startDate;
        const selectedEnd = validEnd ? new Date(this.props.endDate) : this.state.endDate;
        return (
            <Fragment>
                <Label className="pr-2">From</Label>
                <DatePicker
                    className="form-control"
                    dateFormat={DATE_FORMAT}
                    selected={selectedStart}
                    onChange={this.setStartDate}
                    startDate={selectedStart}
                    selectsStart
                />
                <Label className="px-2">To</Label>
               <DatePicker
                    className="form-control"
                    dateFormat={DATE_FORMAT}
                    selected={selectedEnd}
                    endDate={selectedEnd}
                    onChange={this.setEndDate}
                    minDate={selectedStart}
                    selectsEnd
                />
            </Fragment>
        )
    }
}