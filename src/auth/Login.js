import React, { Component } from 'react';
import { Alert, Button, FormControl, FormGroup, Well } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import AuthService from './AuthService';
import { AuthContext } from '../shared/AuthContext';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ error: null });

    try {
      await AuthService.login(this.state.username, this.state.password);
      await this.props.login();
      await this.props.history.push('/');
    } catch (err) {
      this.setState({ error: err.response.data.error });
    }
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <Well bsSize="large" className="auth-card">
        {error && <Alert bsStyle="danger">{error}</Alert>}

        <h1 className="auth-title">Вхід</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <FormControl
              type="text"
              name="username"
              value={username}
              placeholder="Введіть ім'я користувача"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup controlId="password">
            <FormControl
              type="password"
              name="password"
              value={password}
              placeholder="Введіть пароль"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <Button className="auth-card-submit-button" type="submit">
            Увійти
          </Button>
        </form>
      </Well>
    );
  }
}

export default withRouter(props => (
  <AuthContext.Consumer>
    {({ login }) => <Login {...props} login={login} />}
  </AuthContext.Consumer>
));
