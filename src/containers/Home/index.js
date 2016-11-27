import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import * as discogsActions from 'redux/modules/discogs';
import * as userActions from 'redux/modules/userInfo';
import * as spotifyActions from 'redux/modules/spotify';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import AlbumsFound from './components/AlbumsFound';
import PlaylistSummary from './components/PlaylistSummary';
import StylesForm from './components/StylesForm';
import GenresForm from './components/GenresForm';
import TitleArtistLabelForm from './components/TitleArtistLabelForm';

function mapStateToProps(state) {
    return {
        discogsData: state.discogs.discogsData,
        loadingDiscogs: state.discogs.loading,
        savingSpotify: state.spotify.saving,
        playlistInfo: state.spotify.playlist,
        playlistError: state.spotify.error,
        userData: state.userInfo.userData,
        loginError: state.userInfo.error,
        loadedUser: state.userInfo.loaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        discogsActions: bindActionCreators(discogsActions, dispatch),
        spotifyActions: bindActionCreators(spotifyActions, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
    static propTypes = {
        discogsData: PropTypes.object,
        userData: PropTypes.object,
        loginError: PropTypes.object,
        loadedUser: PropTypes.object,
        playlistInfo: PropTypes.object,
        discogsActions: PropTypes.object,
        spotifyActions: PropTypes.object,
        userActions: PropTypes.object,
        loadingDiscogs: Boolean,
        savingSpotify: Boolean
    };

    state = {
        // stylesAdded: [],
        // stylesExcluded: [],
        styles: '',
        genres: '',
        country: '',
        date: '',
        titleArtistlabel: '',
        params: {}
    };

    @autobind
    onSubmitQuery() {
        const query = `${this.state.genres}${this.state.styles}${this.state.titleArtistlabel}${this.state.date}${this.state.country}`;
        console.log(query);
        if (query) {
            this.props.discogsActions.search(query);
        }
    }

    @autobind
    onUpdateStyleQuery(newQuery) {
        this.setState({ styles: newQuery });
        console.log('onUpdateStyleQuery ', this.state);
    }

    @autobind
    onUpdateCountryQuery(newQuery) {
        this.setState({ country: newQuery });
        console.log('onUpdateCountryQuery ', this.state);
    }

    @autobind
    onUpdateGenreQuery(newQuery) {
        this.setState({ genres: newQuery });
        console.log('onUpdateGenreQuery ', this.state);
    }

    @autobind
    onUpdateDateQuery(newQuery) {
        this.setState({ date: newQuery });
        console.log('onUpdateDateQuery ', this.state);
    }

    @autobind
    onUpdateTitleArtistLabelQuery(newQuery) {
        this.setState({ titleArtistlabel: newQuery });
        console.log('onUpdateTitleArtistLabelQuery ', this.state);
    }

    render() {
        const cssStyles = require('./Home.scss');
        const theme = require('../../theme/Theme.scss');

        return (
            <div>
                <Helmet title="Home"/>
                <div>
                    <div className={cssStyles.discogsForm}>
                        <h3>Step 1: Query Albums from Discogs database (up to 100 results)</h3>
                        <TitleArtistLabelForm
                            updateTitleArtistLabelQuery={ this.onUpdateTitleArtistLabelQuery }
                        />
                        <StylesForm
                            updateStyleQuery={ this.onUpdateStyleQuery }
                        />
                        <GenresForm
                            updateDateQuery={ this.onUpdateDateQuery}
                            updateCountryQuery={ this.onUpdateCountryQuery}
                            updateGenreQuery={ this.onUpdateGenreQuery}
                        />
                        <div className={cssStyles.legend}>* This search will only return the albums that are found in Spotify as well</div>

                        <div>
                            <Button className={cssStyles.buttonQuery} raised label="Clear Filters" onClick={this.onSubmitQuery} theme={theme}/>
                            <Button className={cssStyles.buttonQuery} raised label="Query Discogs" onClick={this.onSubmitQuery} theme={theme}/>
                        </div>
                    </div>

                    { this.props.loadingDiscogs && (
                        <ProgressBar mode="indeterminate" theme={theme}/>
                    )}

                    <AlbumsFound />
                    <PlaylistSummary />
                </div>
            </div>);
    }
}
