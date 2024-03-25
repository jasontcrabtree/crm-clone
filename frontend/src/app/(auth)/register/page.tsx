import { registerUser } from "@/lib/actions/register-user";

const UserRegistration = () => {

    return (
        <div>Login
            <form action={registerUser}>
                <input type="text" name="username" id="username" />
                <input type="password" name="password" id="password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default UserRegistration;