"use client";

import ToastProvider from "./ToastProvider";
import AuthProvider from "./auth/AuthProvider";
import WishlistProvider from "./WishlistProvider";

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
