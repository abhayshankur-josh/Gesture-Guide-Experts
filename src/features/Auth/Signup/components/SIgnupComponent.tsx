import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export interface MySignupFormValues {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface SignupComponentProps {
  handleSignup: ( 
    values: MySignupFormValues, 
    formikHelpers: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
  handleSignout: () => void;
  isLoading: boolean;
}

const SignupComponent: React.FC<SignupComponentProps> = ({handleSignup, handleSignout, isLoading}) => {

    const initialValues: MySignupFormValues = {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Full Name is Required'),
        email: Yup.string().email('Invalid email address').required('Email is Required'),
        password: Yup.string().required('Password Required'),
        confirm_password: Yup.string().required('Confirm Password is Required')
    });

    return(
        <div>
            <h1>Signup Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignup}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="username">Full Name: </label>
                            <Field type="text" name="username" />
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div>
                            <label htmlFor="confirm_password">Confirm Password: </label>
                            <Field type="password" name="confirm_password" />
                            <ErrorMessage name="confirm_password" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting || isLoading}>
                            Sign In
                        </button>
                    </Form>
                )}
            </Formik>
            <hr />
            <br />
            <button type="button" onClick={handleSignout} disabled={isLoading}> Log Out </button>
        </div>
    );
};

export default SignupComponent;