import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spotifyActions from 'redux/modules/spotify';
import autobind from 'autobind-decorator';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import AlbumsFound from './AlbumsFound';
import PlaylistSummary from './PlaylistSummary';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';


function mapStateToProps(state) {
    return {
        discogsData: state.discogs.discogsData,
        savingSpotify: state.spotify.saving,
        savedSpotify: state.spotify.saved,
        playlistInfo: state.spotify.playlist,
        playlistError: state.spotify.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        spotifyActions: bindActionCreators(spotifyActions, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchSummary extends Component {
    static propTypes = {
        saveAsPlaylist: PropTypes.function,
        discogsData: PropTypes.array,
        spotifyActions: PropTypes.object,
        savingSpotify: Boolean,
        savedSpotify: Boolean,
        playlistInfo: PropTypes.object,
        playlistError: PropTypes.object,

        title: PropTypes.string,
        artist: PropTypes.string,
        label: PropTypes.string,
        stylesIn: PropTypes.array,
        stylesOut: PropTypes.array,
        genre: PropTypes.string,
        country: PropTypes.string,
        year: PropTypes.string,
        decade: PropTypes.string
    };

    state = {
        playlistName: '',
        selection: []
    };

    @autobind
    onSavePlaylist() {
        const name = this.state.playlistName || 'this is a test';
        this.props.saveAsPlaylist(name, this.state.selection);
    }

    @autobind
    onAlbumSelectionUpdate(selection) {
        this.setState(...this.state, { selection });
    }

    @autobind
    handleChange(value) {
        this.setState({
            playlistName: value
        });
    }

    render() {
        const cssStyles = require('../Home.scss');
        const theme = require('../../../theme/Theme.scss');

        console.log('serach ', this.props.discogsData);

        const hasNoResult = !this.props.discogsData.length;
        const hasResult = !!this.props.discogsData.length;

        const getResult = () => {
            const parts = [];
            if (this.props.title) parts.push({pre: 'Title', val: this.props.title });
            if (this.props.artist) parts.push({pre: 'Artist', val: this.props.artist });
            if (this.props.label) parts.push({pre: 'Label', val: this.props.label });
            if (this.props.stylesIn && this.props.stylesIn.length) parts.push({pre: 'Styles added', val: this.props.stylesIn.join(', ') });
            if (this.props.stylesOut && this.props.stylesOut.length) parts.push({pre: 'Styles excluded', val: this.props.stylesOut.join(', ') });
            if (this.props.genre) parts.push({pre: 'Genre', val: this.props.genre });
            if (this.props.country) parts.push({pre: 'Country', val: this.props.country });
            if (this.props.year) parts.push({pre: 'Year', val: this.props.year });
            if (this.props.decade) parts.push({pre: 'Decade', val: this.props.decade });

            return parts;
        };

        if (hasNoResult) {
            return (
                <div className={cssStyles.noResult}>
                    <h3>Sorry, There was no record found</h3>
                    <div>Try updating some criteria</div>
                </div>
            );
        }

        return (
            <div className={cssStyles.searchSummary}>
                <h3>Step 2: Edit and save your result</h3>
                <div className={cssStyles.flexBox_2}>
                    <div>
                        <div>Your search returned {this.props.discogsData.length} albums with the following filters:
                            <ul>
                            { ( getResult().map(res => (<li><span>{res.pre}:</span> {res.val}</li>) ) ) }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>You can edit the list of albums found below and save it as a new Spotify Playlist</div>
                            <div className={cssStyles.savePlaylist}>
                                <Input
                                    type="text"
                                    label="Playlist Name"
                                    name="playlistName"
                                    value={this.state.playlistName}
                                    onChange={this.handleChange}
                                    maxLength={50} />
                                <Button raised theme={theme} label="Save Playlist"
                                        disabled={this.props.savingSpotify || (this.state.playlistName.length < 2)}
                                        onClick={this.onSavePlaylist}/>
                            </div>
                        </div>
                    </div>
                </div>

                { !this.props.savingSpotify && !this.props.playlistInfo && hasResult && (
                    <AlbumsFound
                        selectionUpdate={this.onAlbumSelectionUpdate}
                    />
                )}

                { this.props.savingSpotify && (
                    <div>
                        <ProgressBar mode="indeterminate"/>
                        <p>Please wait, we are currently saving your new playlist <b>{this.state.playlistName}</b></p>
                    </div>
                )}

                { this.props.playlistError && (
                    <div>
                        Sorry, there was a problem and we could not save your playlist, please try again later.
                    </div>
                )}

                { this.props.savedSpotify && this.props.playlistInfo && (
                    <PlaylistSummary />
                )}

            </div>
        );
    }
}

