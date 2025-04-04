// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import React from 'react';
// import api from '../api/api';

// const GoogleAuth = () => {
//     const GoogleAuthSuccess = (data) => {
//         try {
//             const response = api.post('/auth/google', { tokenId: data.credential })
//             if (response.data.success) {
//                 console.log('Login successful:', response.data);
//                 // Handle successful login (e.g., redirect, display a message)
//             } else {
//                 console.error('Login failed:', response.data.message);
//             }
//         } catch (error) {
//             console.error('Unexpected error:', error);
//         }
//     };

//     return (
//         <div className="mt-6">
//             <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-[var(--color-border)]" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-[var(--color-text-light)]">
//                         Or continue with
//                     </span>
//                 </div>
//             </div>

//             <div className="mt-6">
//                 <div className="container mx-auto p-4">
//                     <div className="flex flex-wrap justify-center mb-4 space-x-2">
//                         <GoogleOAuthProvider clientId="286309906436-1mhnk8b933efuina84sro4q61prji0p4.apps.googleusercontent.com">
//                             <GoogleLogin
//                                 onSuccess={GoogleAuthSuccess}
//                                 onError={(error) => {
//                                     console.log('Login Failed', error);
//                                 }}
//                             />
//                         </GoogleOAuthProvider>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GoogleAuth;
