import { LoginForm } from "@/components/login-form";
import { Footer } from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId="219646765270-sso3g1lma3casg8r9m38ivhvoc7u9um4.apps.googleusercontent.com">
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
          <Footer></Footer>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
