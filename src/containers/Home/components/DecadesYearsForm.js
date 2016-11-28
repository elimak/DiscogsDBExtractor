import React, { Component, PropTypes } from 'react';
import Autocomplete from 'react-toolbox/lib/autocomplete';

import years from '../../../data/years';
import decades from '../../../data/decades';

export default class DecadesYears extends Component {
    static propTypes = {
        updateDateQuery: PropTypes.function
    };

    state = {
        decade: '',
        year: ''
    };

    getQuery(decade, year) {
        if (year) {
            return `&year=${year}`;
        } else if (decade) {
            return `&decade=${decade}`;
        }
        return '';
    }

    handleDecadeSelection(val) {
        const decade = val.length ? val[0] : '';
        this.setState({ decade });
        this.setState({ year: '' });
        this.props.updateDateQuery(this.getQuery(decade, ''));
    }

    handleYearSelection(val) {
        const year = val.length ? val[0] : '';
        this.setState({ year });
        this.props.updateDateQuery(this.getQuery(this.state.decade, year));
    }

    filterYearsByDecade(decade, yearList) {
        const res = yearList.filter((val) => val >= decade && val < (decade + 10));
        return res;
    }

    clearFilters() {
        this.setState({
            decade: '',
            year: ''
        });
        this.props.updateDateQuery('');
    }

    render() {
        const cssStyles = require('../Home.scss');
        let yearsSources = years.getYears().map((val) => val.year);
        if (this.state.decade &&
            parseInt(this.state.decade, 10) > 1900 &&
            parseInt(this.state.decade, 10) < 2030) {
            yearsSources = this.filterYearsByDecade(parseInt(this.state.decade, 10), yearsSources);
        }

        const yearValue = !!this.state.year ? [ this.state.year ] : [];
        const decadeValue = !!this.state.decade ? [ this.state.decade ] : [];

        const decadesSources = decades.map((val) => val.decade);

        // <h3>By Decade or Year:</h3>
        return (
            <div className={cssStyles.flexBox_2}>
                <div>
                    <Autocomplete
                        className={cssStyles.autocomplete}
                        direction="down"
                        selectedPosition="below"
                        label="Decade"
                        onChange={this.handleDecadeSelection.bind(this)}
                        source={decadesSources}
                        value={decadeValue}
                    />
                </div>
                <div>
                    <Autocomplete
                        className={cssStyles.autocomplete}
                        direction="down"
                        selectedPosition="below"
                        label="Year"
                        onChange={this.handleYearSelection.bind(this)}
                        source={yearsSources}
                        value={yearValue}
                    />
                </div>
            </div>
        );
    }
}
