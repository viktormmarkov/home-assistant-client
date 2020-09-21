import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';


export default class PeriodFormat extends Component {
    render() {
        const {start, end, format = 'DD/MM/yyyy' } = this.props;
        return (
            <React.Fragment>
                {` ${moment(start).format(format)} to ${moment(end).format(format)} `}
            </React.Fragment>
        )
    }
}
