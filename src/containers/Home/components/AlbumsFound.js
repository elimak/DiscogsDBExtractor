import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spotifyActions from 'redux/modules/spotify';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import Input from 'react-toolbox/lib/input';

function mapStateToProps(state) {
    return {
        discogsData: state.discogs.discogsData,
        loadingDiscogs: state.discogs.loading,
        savingSpotify: state.spotify.saving,
        savedSpotify: state.spotify.saved,
        playlist: state.spotify.playlist,
        userData: state.userInfo.userData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        spotifyActions: bindActionCreators(spotifyActions, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AlbumsFound extends Component {
    static propTypes = {
        discogsData: PropTypes.object,
        spotifyActions: PropTypes.object,
        playlist: PropTypes.object,
        userData: PropTypes.object,
        loadingDiscogs: Boolean,
        savingSpotify: Boolean,
        savedSpotify: Boolean
    };

    state = {
        playlistName: ''
    };

    onSavePlaylist() {
        const name = this.state.playlistName || 'this is a test';
        const albums = this.props.discogsData.map(obj => obj.id);
        this.props.spotifyActions.savePlaylist(this.props.userData.id, name, albums);
    }

    handleChange(name, value) {
        this.setState({...this.state, [name]: value});
    }

    render() {
        const cssStyles = require('../Home.scss');

        const isLoading = this.props.loadingDiscogs;
        const isSaving = this.props.savingSpotify;
        const hasNoResult = this.props.discogsData && !this.props.discogsData.length;
        const hasResult = !!(this.props.discogsData && this.props.discogsData.length);

        const showResults = hasResult && !isLoading && !isSaving;
        const showNoResults = hasNoResult && !isLoading && !isSaving;

        // console.log('isLogged ', isLogged);
        // console.log('isSaving ', isLoading);
        // console.log('hasNoResult ', hasNoResult);
        // console.log('hasResult ', hasResult);
        //
        // console.log('AlbumsFound RENDER');
        // console.log('userData ', this.props.userData);
        // console.log('discogsData ', this.props.discogsData);
        // console.log('render this: ', (isLogged && hasResult && !isLoading));
        // console.log('render this: ', isLogged, ' && ', hasResult, ' && ', !isLoading);

        if (!this.props.discogsData || !!this.props.playlist) {
            return (<div/>);
        }

        return (<div className={cssStyles.results}>
            { showResults && (
                <div><h3>This search found: { this.props.discogsData.length } records</h3></div>
            )}

            { showResults &&
            ( this.props.discogsData.map((album) => {
                return (<div>
                    <iframe src={`https://embed.spotify.com/?uri=spotify:album:${album.id}`} width="250" height="80" frameBorder="0" allowTransparency="true"></iframe>
                    <div className={cssStyles['card-body']}>
                        <h4>{album.artist.name} - {album.name}</h4>
                        <p className={cssStyles.pink}>{album.styles.join(', ')}</p>
                        <p className={cssStyles.blue}>{album.labels.join(', ')}</p>
                    </div>
                    <hr/>
                </div>);
            }))}

            { showResults && (
                <div>
                    <Input
                        type="text"
                        label="Playlist Name"
                        name="playlistName"
                        value={this.state.playlistName}
                        onChange={this.handleChange.bind(this, 'playlistName')}
                        maxLength={50} />
                    <Button raised primary label="Save Playlist"
                        disabled={isSaving || (this.state.playlistName.length < 2)}
                        onClick={this.onSavePlaylist.bind(this)}/>
                </div>
            )}

            { isSaving && (
                    <div>
                        <ProgressBar mode="indeterminate"/>
                        <p>Please wait, we are currently saving your new playlist <b>{this.state.playlistName}</b></p>
                        <ul>
                            { this.props.discogsData.map((album) => (<li>{album.artist.name} - {album.name}</li>)) }
                        </ul>
                    </div>
                )
            }

            { showNoResults && (
                <p>There was no record found</p>
            )}
        </div>);
    }
}
