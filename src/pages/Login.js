import React from 'react';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleSubmit = () => {};

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

export default Login;
