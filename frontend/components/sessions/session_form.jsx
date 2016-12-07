import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "" };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  componentDidMount(){
    this.redirectIfLoggedIn();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  renderErrors() {
		if (this.props.errors) {
	    return (
	      <ul className="error_list">
					{this.props.errors.map((error, ind) => (
						<li className="error" key={`error-${ind}`}>{ error }</li>
					))}
	      </ul>
	    );
	  } else {
			return <div></div>;
		}
  }

  render() {
		// refactor material
		const submitButton = (this.props.formType === "login") ? "Log In" : "Create Account";

    return(
      <div className="login_form_container">
				<form onSubmit={this.handleSubmit} className="login-form-box">
					{this.renderErrors()}
					<div className="login-form">
							<input type="text"
								placeholder="Username"
								value={this.state.username}
								onChange={this.update("username")}
								className="login-input" />
							<input type="password"
								placeholder="Password"
								value={this.state.password}
								onChange={this.update("password")}
								className="login-input" />
					</div>
					<input type="submit"
						className="submit" value={submitButton} />
				</form>
      </div>
    );
  }
}

export default SessionForm;
