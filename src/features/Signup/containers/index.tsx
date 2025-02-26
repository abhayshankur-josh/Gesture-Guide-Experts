import { useDispatch } from "react-redux";
import { useSignupMutation } from "../api";
import SignupComponent, { MySignupFormValues } from "../components/SIgnupComponent";
import { setToken } from "../slice";
import { clearToken } from "../../Login/slice";

export default function SignupContainer() {
    const [signup, { isLoading }] = useSignupMutation();
    const dispatch = useDispatch();

    const handleSignup = async (values: MySignupFormValues, { setSubmitting } : { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const { token } = await signup(values).unwrap();
            dispatch(setToken(token));
            console.log('Login successful, token stored:', token);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSignout = () => {
        try {
            dispatch(clearToken());
            console.log('Signout Successful, token cleared!');
        } catch (error) {
            console.error('Signout failed:', error);
        }
    };

    return(
        <SignupComponent 
            handleSignup={handleSignup}
            handleSignout={handleSignout}
            isLoading={isLoading}
        />
    );
}