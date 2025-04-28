import "./Login.scss";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const { login, isPending } = useLogin();
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    login(email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src="/images/black-card.png" alt="card" />
      </div>
      <div className="auth-right">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-input-group">
            <div className="auth-input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="auth-input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
          </div>
          <button className="auth-button" disabled={isPending}>
            {isPending ? "Pending" : "Login"}
          </button>
        </form>
        <div className="auth-footer">
          <p>Need to create an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
