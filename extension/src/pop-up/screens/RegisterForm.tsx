import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { IUserRegister } from '../../types/global.type';
import { useAppContext } from '../contexts/app-context';
import { initiateRegister } from '../handlers/initiate-register.handler';

function RegistrationForm() {
    const { state, updateState } = useAppContext();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'First Name must be at least 2 characters')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Last Name must be at least 2 characters')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    const handleSubmit = async (values: typeof validationSchema.__outputType) => {
        const { confirmPassword, ...rest } = values;
        const data = await initiateRegister(rest);

        if (data) {
            updateState(data);
        }
    };

    if (state.isAuthenticated) return <Navigate to="/" replace={true} />;

    return (
        <div className="flex justify-center items-center h-full">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96">
                        <h1 className="text-xl font-bold mb-4">Sign up</h1>
                        <div className="mb-4">
                            <label
                                htmlFor="firstName"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                First Name
                            </label>
                            <Field
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-red-500 mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="lastName"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Last Name
                            </label>
                            <Field
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500 mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email Address
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 mt-2"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Confirm Password
                            </label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 mt-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Loading...' : 'Sign up'}
                        </button>
                        <p className="block text-gray-700 font-bold mb-2 mt-4">
                            Already have an account?{' '}
                            <Link to="/login">
                                <span className="text-violet-700 underline cursor-pointer">
                                    Sign Up
                                </span>
                            </Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegistrationForm;
