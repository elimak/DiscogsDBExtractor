import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import DecadesYearsForm from './DecadesYearsForm';

import genres from '../../../data/genres';

export default class GenresForm extends Component {
    static propTypes = {
        updateGenreQuery: PropTypes.function,
        updateDateQuery: PropTypes.function
    };

    state = {
        genresAdded: ''
    };

    @autobind
    handleSelection(val) {
        const genresAdded = val.length ? val[0] : '';

        this.setState({ genresAdded });

        if (genresAdded.length > 0 ) {
            this.props.updateGenreQuery(`&genre=${genresAdded.split(' ').join('+')}`);
        }
    }

    render() {
        const cssStyles = require('../Home.scss');
        const genreSources = genres.map((val) => val.genre);
        const genre = !!this.state.genresAdded ? [this.state.genresAdded] : [];

        console.log('props? ', this.props);

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
                        onChange={this.handleSelection}
                        source={genreSources}
                        value={genre}
                    />
                </div>
                <div />
                <div style={styleNoPadding}>
                    <DecadesYearsForm
                        updateDateQuery={this.props.updateDateQuery}
                    />
                </div>
            </div>
        );
    }
}

