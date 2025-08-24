const VITE_SERVER_URI = import.meta.env.VITE_SERVER_URI;

export const continueWithGoogle = () => {
    window.location.href = `${VITE_SERVER_URI}/users/google`;
}