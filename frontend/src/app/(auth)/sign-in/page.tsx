'use client';
import { handleUserAuthentication } from "@/lib/actions/user-management";
import { FormEvent } from "react";

const Page = () => {

    const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleUserAuthentication(formData, 'register');
    };

    const loginUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleUserAuthentication(formData, 'login');
    };

    return (
        <div className={`w-full bg-zinc-50 max-h-screen overflow-y-scroll`}>
            <div className="flex flex-col w-full max-w-[48%] gap-4 mx-auto p-12">
                <h1 className="font-bold text-indigo-700 text-xl">
                    Register or Log In
                </h1>
                <form onSubmit={registerUser}>
                    <input type="text" name="username" id="registerUsername" />
                    <input type="password" name="password" id="registerPassword" />
                    <button type="submit">Register</button>
                </form>

                <form onSubmit={loginUser}>
                    <input type="text" name="username" id="loginUsername" />
                    <input type="password" name="password" id="loginPassword" />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Page;