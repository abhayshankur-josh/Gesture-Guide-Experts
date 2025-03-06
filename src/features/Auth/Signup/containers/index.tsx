import SignupComponent, { MySignupFormValues } from "../components/SIgnupComponent";
import { useSignupMutation } from "../../api";
import { useAppDispatch } from "../../../../store/storeHooks";
import { useNavigate } from "react-router-dom";
import { profileApi } from "../../../Profile/api";
import { setProfileDetails } from "../../../Profile/slice";
import { ROUTES } from "../../../../constants/routesConstants";
import { setAuthToken } from "../../slice";

export default function SignupContainer() {
    const [signup, { isLoading }] = useSignupMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignup = async (values: MySignupFormValues, { setSubmitting } : { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            // Setting generated token into local Storage.
            const { token, error, message } = await signup(values).unwrap();
            if (token) {
                dispatch(setAuthToken(token)) ;
                // Triggering the Get Profile Details endpoint.
                const profile = await dispatch(profileApi.endpoints.getProfile.initiate()).unwrap();
                // Storing the Profile details into local Storage.
                dispatch(setProfileDetails(profile));
                navigate(ROUTES.DASHBOARD);
            } else {
                console.log(`Message: ${message}, Error: ${error}`);
                alert(error)
            }
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <SignupComponent 
            handleSignup={handleSignup}
            isLoading={isLoading}
        />
    );
}