import React, { Component } from "react";
import AuthActions, { AuthSelectors } from "../Redux/AuthRedux";
import { connect } from "react-redux";
import { compose } from "redux";
import LoginForm from "../Forms/LoginForm";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/LoginScreenStyle";

class LoginScreen extends Component {
  componentDidUpdate() {
    const { isLoggedIn, history } = this.props;
    if (isLoggedIn) {
      history.push("/HomeScreen");
    }
  }
  handleSubmit = val => {
    this.props.login(val);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h2 className={classes.title}>Login</h2>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: AuthSelectors.isLoggedIn(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(AuthActions.loginRequest(data))
  };
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withStyles(styles),
  withRedux
)(LoginScreen);