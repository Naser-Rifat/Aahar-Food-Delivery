import GoogleButton from 'react-google-button';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { googleSignIn, setUser, setIsloading } = useAuth();

    const history = useHistory();
    const location = useLocation();
    const redirect_url = location.state?.from || "\home"

    const handlegoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                setUser(result.user);
                history.push(redirect_url);
            })
            .finally(() => setIsloading(false))

    }



    return (
        <div className="my-60 text-center  mx-auto">

            <h1 className="text-center my-2">Sign In With Google</h1>

            <GoogleButton label="Sign In" className=" mx-auto"
                onClick={handlegoogleSignIn}
            />

        </div>
    );
};

export default Login;