import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup";

export interface MyLoginFormValues {
  email: string;
  password: string;
}

interface LoginComponentProps {
  handleLogin: ( 
    values: MyLoginFormValues, 
    formikHelpers: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
  isLoading: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ handleLogin: handleSignup, isLoading }) => {

  const initialValues: MyLoginFormValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  return (
    <div>
      <h1>Login Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting }) => (

          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <br />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <br />
            <button type="submit" disabled={isSubmitting || isLoading}>
              Log In
            </button>
          </Form>
        )}

      </Formik>
      <hr />
    </div>
  );
}

export default LoginComponent;