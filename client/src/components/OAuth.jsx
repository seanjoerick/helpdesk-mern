import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'; 
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth(app);

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/server/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/createticket');
            } else {
                dispatch(signInFailure(data.message || 'Google sign-in failed.'));
            }
        } catch (error) {
            console.error('Could not sign in with Google', error);
            dispatch(signInFailure('An error occurred during sign-in.'));
        }
    };

    return (
        <div>
            <button
                onClick={handleGoogleClick}
                type="button" 
                className="w-full text-white bg-primary-600 bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Continue with Google
            </button>
        </div>
    );
}
