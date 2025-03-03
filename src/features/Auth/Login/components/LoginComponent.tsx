import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ROUTES } from "../../../../constants/routesConstants";

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

const LoginComponent: React.FC<LoginComponentProps> = ({ handleLogin, isLoading }) => {
  const initialValues: MyLoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-gradient-primary-to-secondary text-black text-center py-4">
              <h3 className="my-2">
                <i className="bi bi-lock-fill me-2"></i>Account Login
              </h3>
            </div>
            <div className="card-body p-4 p-md-5">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-floating mb-4">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="floatingEmail"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingEmail">Email address</label>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <a href="#" className="text-decoration-none">Forgot password?</a>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={isSubmitting || isLoading}
                      >
                        {(isSubmitting || isLoading) ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Logging in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer text-center py-3 bg-light">
              <div className="small">
                Don't have an account?
                <Link to={ROUTES.SIGNUP} className="text-decoration-none"> Sign up </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;