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
                navigate('/');
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
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-1"
            >
                Continue with Google
            </button>
        </div>
    );
}
