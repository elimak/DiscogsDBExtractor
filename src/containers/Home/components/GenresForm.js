import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import DecadesYearsForm from './DecadesYearsForm';

import genres from '../../../data/genres';
import countries from '../../../data/countries';

export default class GenresForm extends Component {
    static propTypes = {
        updateGenreQuery: PropTypes.function,
        updateCountryQuery: PropTypes.function,
        updateDateQuery: PropTypes.function
    };

    state = {
        genresAdded: '',
        countryAdded: ''
    };

    @autobind
    getDecadeState() {
        return this.decades.state;
    }

    @autobind
    handleGenreSelection(val) {
        const genresAdded = val.length ? val[0] : '';
        this.setState({ genresAdded });

        if (genresAdded.length > 0 ) {
            this.props.updateGenreQuery(`&genre=${genresAdded.split(' ').join('+')}`);
        }
    }

    @autobind
    handleCountrySelection(val) {
        const countryAdded = val.length ? val[0] : '';
        this.setState({ countryAdded });

        if (countryAdded.length > 0 ) {
            this.props.updateCountryQuery(`&country=${countryAdded.split(' ').join('+')}`);
        }
    }

    clearFilters() {
        this.setState({
            genresAdded: '',
            countryAdded: ''
        });
        if (this.decades) this.decades.clearFilters();
        this.props.updateGenreQuery('');
    }

    render() {
        const cssStyles = require('../Home.scss');
        const genreSources = genres.map((val) => val.genre);
        const countrySources = countries.map((val) => val.country);
        const genre = !!this.state.genresAdded ? [this.state.genresAdded] : [];
        const country = !!this.state.countryAdded ? [this.state.countryAdded] : [];

        const styleNoPadding = {
            paddingRight: '0px'
        };

        // <h3>By genres:</h3>

        return (
            <div className={cssStyles.flexBox_3}>
                <div>
                    <Autocomplete
                    className={cssStyles.autocomplete}
                    direction="down"
                    selectedPosition="below"
                    label="Select genre"
                    onChange={this.handleGenreSelection}
                    source={genreSources}
                    value={genre}
                />
                </div>
                <div>
                    <Autocomplete
                        className={cssStyles.autocomplete}
                        direction="down"
                        selectedPosition="below"
                        label="Select country / region"
                        onChange={this.handleCountrySelection}
                        source={countrySources}
                        value={country}
                    />
                </div>
                <div style={styleNoPadding}>
                    <DecadesYearsForm
                        ref={(comp) => { this.decades = comp; }}
                        updateDateQuery={this.props.updateDateQuery}
                    />
                </div>
            </div>
        );
    }
}

