
import { useDispatch } from "react-redux";
import LoginComponent, { MyLoginFormValues } from "../components/LoginComponent";
import { useLoginMutation } from "../../api";
import { clearAuthToken, setAuthToken } from "../../slice";

export default function LoginContainer() {

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (values: MyLoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const { token } = await login(values).unwrap();
      dispatch(setAuthToken(token));
      console.log('Login successful, token stored:', token);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(clearAuthToken());
      console.log('Logout successful, token cleared!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <LoginComponent
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      isLoading={isLoading}
    />
  );
}
