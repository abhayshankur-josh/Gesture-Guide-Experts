import { useState } from "react";
import { useLoginMutation } from "../api";
import { setToken } from "../slice";
import { clearToken } from "../../Login/slice";
import { useDispatch } from "react-redux";

export default function LoginContainer() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const { token } = await login({ email, password }).unwrap();
      dispatch(setToken(token));
      console.log('Login successful, token stored:', token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(clearToken());
      console.log('Logout successful, token cleared!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignup} disabled={isLoading}>
        Login
      </button>
      <button onClick={handleLogout} disabled={isLoading}>
        Logout
      </button>
    </div>
  );
}
