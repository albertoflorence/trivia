import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  apiToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const token = await this.apiToken();
    history.push('/game');
    localStorage.setItem('token', token);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validate = () => {
    const { name, email } = this.state;
    return name && email;
  };

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ !this.validate() }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
