import React, { Component, PropTypes } from 'react';
import Autocomplete from 'react-toolbox/lib/autocomplete';

import styles from '../../../data/styles';

export default class StylesForm extends Component {
    static propTypes = {
        updateStyleQuery: PropTypes.function
    };

    state = {
        stylesAdded: [],
        stylesExcluded: []
    };

    getQuery(added, excluded) {
        if ((added || this.state.stylesAdded).length === 0 &&
            (excluded || this.state.stylesExcluded).length === 0) {
            return '';
        }
        const queryAdded = (added || this.state.stylesAdded).map((val) => {
            const noSpace = val.split(' ').join('+');
            return escape(noSpace);
        }).join('+');
        const queryExcluded = (excluded || this.state.stylesExcluded).map((val) => {
            const noSpace = val.split(' ').join('+-');
            return escape(noSpace);
        }).join('+-');
        const queryStyle = `&style=${queryAdded}+-${queryExcluded}`;
        return queryStyle;
    }

    handleStyleSelection(val) {
        const stylesAdded = val;
        this.setState({ stylesAdded });
        this.props.updateStyleQuery(this.getQuery(stylesAdded, null));
    }

    handleStyleExclusionSelection(val) {
        const stylesExcluded = val;
        this.setState({ stylesExcluded });
        this.props.updateStyleQuery(this.getQuery(null, stylesExcluded));
    }

    clearFilters() {
        this.setState({
            stylesAdded: [],
            stylesExcluded: []
        });
        this.props.updateStyleQuery('');
    }

    render() {
        const cssStyles = require('../Home.scss');
        const styleSources = styles.map((val) => val.style);

        return (
            <div className={cssStyles.flexBox_2}>
                <div>
                    <Autocomplete
                        className={cssStyles.autocomplete}
                        direction="down"
                        selectedPosition="below"
                        label="Add style"
                        onChange={this.handleStyleSelection.bind(this)}
                        source={styleSources}
                        value={this.state.stylesAdded}
                    />
                </div>
                <div>
                <Autocomplete
                    className={cssStyles.autocomplete}
                    direction="down"
                    selectedPosition="below"
                    label="Exclude style"
                    onChange={this.handleStyleExclusionSelection.bind(this)}
                    source={styleSources}
                    value={this.state.stylesExcluded}
                />
                </div>
            </div>
        );
    }
}

