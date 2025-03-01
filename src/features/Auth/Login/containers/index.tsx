
import LoginComponent, { MyLoginFormValues } from "../components/LoginComponent";
import { useLoginMutation } from "../../api";
import { profileApi } from "../../../Profile/api";
import { setProfileDetails } from "../../../Profile/slice";
import { useAppDispatch } from "../../../../store/storeHooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routesConstants";
import { setAuthToken } from "../../slice";

export default function LoginContainer() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: MyLoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      // Setting generated token into local Storage.
      const { token, message, error } = await login(values).unwrap();
      if (token) {
        dispatch(setAuthToken(token));
        // Triggering the Get Profile Details endpoint.
        const profile = await dispatch(profileApi.endpoints.getProfile.initiate()).unwrap();
        // Storing the Profile details into local Storage.
        dispatch(setProfileDetails(profile));
        navigate(ROUTES.DASHBOARD);
      } else {
        console.log(`Message: ${message}, Error: ${error}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoginComponent
      handleLogin={handleLogin}
      isLoading={isLoading}
    />
  );
}
