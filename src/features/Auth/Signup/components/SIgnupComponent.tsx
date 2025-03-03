import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ROUTES } from "../../../../constants/routesConstants";
import { Link } from "react-router-dom";

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
  isLoading: boolean;
}

const SignupComponent: React.FC<SignupComponentProps> = ({ handleSignup, isLoading }) => {
  const initialValues: MySignupFormValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-gradient-primary-to-secondary text-black text-center py-4">
              <h3 className="my-2">
                <i className="bi bi-person-plus-fill me-2"></i>Create Account
              </h3>
              <p className="mb-0 text-black-50">Join our community today</p>
            </div>
            <div className="card-body p-4 p-md-5">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignup}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form>
                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            name="username"
                            className={`form-control ${
                              touched.username && errors.username ? "is-invalid" : ""
                            }`}
                            id="floatingUsername"
                            placeholder="Full Name"
                          />
                          <label htmlFor="floatingUsername">
                            <i className="bi bi-person me-1"></i>Full Name
                          </label>
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        id="floatingEmail"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingEmail">
                        <i className="bi bi-envelope me-1"></i>Email Address
                      </label>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <Field
                            type="password"
                            name="password"
                            className={`form-control ${
                              touched.password && errors.password ? "is-invalid" : ""
                            }`}
                            id="floatingPassword"
                            placeholder="Password"
                          />
                          <label htmlFor="floatingPassword">
                            <i className="bi bi-key me-1"></i>Password
                          </label>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <Field
                            type="password"
                            name="confirm_password"
                            className={`form-control ${
                              touched.confirm_password && errors.confirm_password
                                ? "is-invalid"
                                : ""
                            }`}
                            id="floatingConfirmPassword"
                            placeholder="Confirm Password"
                          />
                          <label htmlFor="floatingConfirmPassword">
                            <i className="bi bi-check-circle me-1"></i>Confirm Password
                          </label>
                          <ErrorMessage
                            name="confirm_password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="termsCheck"
                        required
                      />
                      <label className="form-check-label" htmlFor="termsCheck">
                        I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
                      </label>
                    </div>

                    <div className="d-grid mt-4 mb-0">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={isSubmitting || isLoading}
                      >
                        {isSubmitting || isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check2-circle me-2"></i>Create Account
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer text-center py-3 bg-light">
              <div className="small">
                Already have an account? 
                <Link to={ROUTES.LOGIN} className="text-decoration-none"> Sign In </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;