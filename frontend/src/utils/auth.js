import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { addFlashAc } from '../../src/pages/flash/store/actionCreators';

export default function(Comp) {
    class Auth extends React.Component {
        componentWillMount() {
            // If not logged in, redirect to the login page
            if(this.props.isAuth === false) {
                this.props.addFlashAc({
                    id: shortid.generate(),
                    type: 'alert-primary',
                    text: 'Please log in'
                });
                this.props.history.push('/login');
            }
        }
        componentWillUpdate(nextProps) {
            if(!nextProps.isAuth && nextProps.isAuth !== this.props.isAuth) {
                this.props.history.push('/login');
            }
        }
        render() {
            return <Comp {...this.props}/>;
        }
    }
    const mapStateToProps = state => {
        return {
            isAuth: state.login.isAuth
        };
    };
    return connect(mapStateToProps, { addFlashAc })(Auth);
};