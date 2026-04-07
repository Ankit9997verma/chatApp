import { useAuthStore } from "../store/useAuthStore";

function LoginPage(){
    const {authUser , isLoading , login } = useAuthStore();
    return <div> login page </div>;

}
export default LoginPage ;