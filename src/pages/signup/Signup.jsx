import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import "./Signup.scss";

function Signup() {
  const { register, isPending } = useRegister();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const displayName = formData.get("displayName");
    const email = formData.get("email");
    const password = formData.get("password");

    register(email, password, displayName);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src="/images/black-card.png" alt="Sidebar illustration" />
      </div>
      <div className="auth-right">
        <h2 className="auth-title">Sign Up</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="auth-input-group">
            <div className="auth-input-field">
              <label htmlFor="displayName">Name</label>
              <input type="text" id="displayName" name="displayName" required />
            </div>
            <div className="auth-input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="auth-input-field">
              <label htmlFor="password">Create Password</label>
              <input type="password" id="password" name="password" required />
              <p className="auth-note">
                Passwords must be at least 8 characters
              </p>
            </div>
          </div>
          <button className="auth-button" disabled={isPending}>
            {isPending ? "Pending..." : "Sign Up"}
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
