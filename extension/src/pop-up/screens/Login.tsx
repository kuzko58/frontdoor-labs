import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppContext } from '../contexts/app-context';
import { initiateLogin } from '../handlers/initiate-login.handler';
import { updateServiceWorker } from '../handlers/update-service-worker.handler';

const LoginForm = () => {
    const { state, updateState } = useAppContext();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values: typeof validationSchema.__outputType) => {
        const data = await initiateLogin(values);

        if (data) {
            updateState(data);
        }
    };

    if (state.isAuthenticated) return <Navigate to="/" replace={true} />;

    return (
        <div className="flex justify-center items-center h-full">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96">
                        <h1 className="text-xl font-bold mb-4">Login</h1>
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
                        <button
                            type="submit"
                            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Loading...' : 'Login'}
                        </button>

                        <p className="block text-gray-700 font-bold mb-2 mt-4">
                            Don't have an account?{' '}
                            <Link to="/register">
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
};

export default LoginForm;
