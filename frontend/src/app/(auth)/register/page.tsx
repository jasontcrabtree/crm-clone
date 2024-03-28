import { registerUser } from "@/lib/actions/register-user";

export default function UserRegistration() {
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