import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login as actionLogin } from '../redux/actions';
import { apiToken } from '../services';
import Logo from '../components/Logo';
import SettingIcon from '../components/icons/Setting';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { login } = this.props;
    const { email, name } = this.state;
    const { history } = this.props;
    const token = await apiToken();
    localStorage.setItem('token', token);
    login({ email, name });
    history.push('/game');
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
    const { history } = this.props;
    return (
      <div className="login">
        <Logo />
        <form onSubmit={ this.handleSubmit } className="login-form">
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            placeholder="Qual é o seu e-mail do gravatar?"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            placeholder="Qual é o seu nome?"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ !this.validate() }
          >
            Jogar
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            <SettingIcon />
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login: actionLogin,
};

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  login: PropTypes.func.isRequired,
};
