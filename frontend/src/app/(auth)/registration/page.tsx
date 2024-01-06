'use server'

import { registerUser } from "@/lib/actions/register-user";

const UserRegistration = () => {

    return (
        <div>Login
            <form action={registerUser}>
                <input type="text" name="userName" id="userName" />
                <input type="password" name="userPassword" id="userPassword" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default UserRegistration;