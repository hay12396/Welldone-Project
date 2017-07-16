import LoadingIndicator from './common/LoadingIndicator';
import BottomBar from './common/BottomBar';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import appStyle from './styles/AppStyle';


class App extends React.Component {
    render() {
        return (
            <div className="container" style={appStyle}>
                {this.props.children}
                <LoadingIndicator loading={this.props.loading} />
                <BottomBar />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(rootReducer/*, props*/) {
    return {
        loading: rootReducer.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);