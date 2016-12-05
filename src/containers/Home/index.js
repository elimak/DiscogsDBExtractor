import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import * as searchActions from 'redux/modules/search';
import * as discogsActions from 'redux/modules/discogs';
import * as userActions from 'redux/modules/userInfo';
import * as spotifyActions from 'redux/modules/spotify';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import StylesForm from './components/StylesForm';
import GenresForm from './components/GenresForm';
import TitleArtistLabelForm from './components/TitleArtistLabelForm';
import SearchSummary from './components/SearchSummary';

function mapStateToProps(state) {
    return {
        discogsData: state.discogs.discogsData,
        discogsError: state.discogs.error,
        loadingDiscogs: state.discogs.loading,
        userData: state.userInfo.userData,
        loginError: state.userInfo.error,
        loadedUser: state.userInfo.loaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchActions: bindActionCreators(searchActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        discogsActions: bindActionCreators(discogsActions, dispatch),
        spotifyActions: bindActionCreators(spotifyActions, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
    static propTypes = {
        discogsData: PropTypes.array,
        userData: PropTypes.object,
        discogsError: PropTypes.object,
        loginError: PropTypes.object,
        loadedUser: PropTypes.object,
        searchActions: PropTypes.object,
        discogsActions: PropTypes.object,
        spotifyActions: PropTypes.object,
        userActions: PropTypes.object,
        loadingDiscogs: Boolean,
    };

    state = {
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
        if (query) {
            this.props.searchActions.storeSearch({
                title: this.titleArtist.state.title,
                artist: this.titleArtist.state.artist,
                label: this.titleArtist.state.label,
                stylesIn: this.stylesForm.state.stylesAdded,
                stylesOut: this.stylesForm.state.stylesExcluded,
                genre: this.genresForm.state.genresAdded,
                country: this.genresForm.state.countryAdded,
                year: this.genresForm.getDecadeState().year,
                decade: this.genresForm.getDecadeState().decade
            });
            this.props.spotifyActions.resetPlaylist();
            this.props.discogsActions.search(query);
        }
    }

    @autobind
    onUpdateStyleQuery(newQuery) {
        this.setState({ styles: newQuery });
    }

    @autobind
    onUpdateCountryQuery(newQuery) {
        this.setState({ country: newQuery });
        console.log('onUpdateCountryQuery ', this.state);
    }

    @autobind
    onUpdateGenreQuery(newQuery) {
        this.setState({ genres: newQuery });
    }

    @autobind
    onUpdateDateQuery(newQuery) {
        this.setState({ date: newQuery });
    }

    @autobind
    onUpdateTitleArtistLabelQuery(newQuery) {
        this.setState({ titleArtistlabel: newQuery });
    }

    @autobind
    onSaveAsPlaylist(name, albums) {
        const filtered = albums.map((album) => album.id);
        this.props.spotifyActions.savePlaylist(this.props.userData.id, name, filtered);
    }

    @autobind
    onClearFilters() {
        if (this.titleArtist) this.titleArtist.clearFilters();
        if (this.stylesForm) this.stylesForm.clearFilters();
        if (this.genresForm) this.genresForm.clearFilters();
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
                            ref={(comp) => { this.titleArtist = comp; }}
                            updateTitleArtistLabelQuery={ this.onUpdateTitleArtistLabelQuery }
                        />
                        <StylesForm
                            ref={(comp) => { this.stylesForm = comp; }}
                            updateStyleQuery={ this.onUpdateStyleQuery }
                        />
                        <GenresForm
                            ref={(comp) => { this.genresForm = comp; }}
                            updateDateQuery={ this.onUpdateDateQuery}
                            updateCountryQuery={ this.onUpdateCountryQuery}
                            updateGenreQuery={ this.onUpdateGenreQuery}
                        />
                        <div className={cssStyles.right}>
                            <div className={cssStyles.legend}>* This search will only return the albums that are found in Spotify as well</div>
                            <Button className={cssStyles.clearButton} label="Clear Filters" onClick={this.onClearFilters} theme={theme}/>
                            <Button className={cssStyles.queryButton} raised label="Query Discogs" onClick={this.onSubmitQuery} theme={theme}/>
                        </div>
                    </div>

                    { this.props.loadingDiscogs && (
                        <ProgressBar mode="indeterminate" theme={theme}/>
                    )}

                    { this.props.discogsError && (
                        <div>
                            Your request has timed out, try narrowing your search
                        </div>
                    )}

                    { this.props.discogsData && (
                        <SearchSummary
                            saveAsPlaylist={this.onSaveAsPlaylist}
                        />
                    )}
                </div>
            </div>);
    }
}
