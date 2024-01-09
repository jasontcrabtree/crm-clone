'use client';

import logoutSession from "@/lib/actions/logout-session";
import { mergeClasses } from "@/lib/shad-utils";
import { AuthProps } from "@/lib/types/auth";
import Link from "next/link"

const AppNav = ({ session }: AuthProps) => {

    const test = mergeClasses("tw-animate-pulse tw-rounded-md tw-bg-primary/10", 'tree');

    console.log('test', test);

    return (
        <nav className="bg-slate-50 w-full sm:min-w-24 sm:max-w-48 sm:h-screen flex flex-col py-4 px-4">
            <h1 className="text-xl font-bold pb-4 text-indigo-600">Bondbridge</h1>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link href="/register">
                        Register
                    </Link>
                </li>
            </ul>
            <button className="mt-auto" onClick={() => {
                logoutSession();
            }}>
                Log Out
            </button>
        </nav>
    )
}

export default AppNav