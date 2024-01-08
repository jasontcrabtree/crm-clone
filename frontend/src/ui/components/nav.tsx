'use client';

import logoutSession from "@/lib/actions/logout-session";
import { AuthProps } from "@/lib/types/auth";
import Link from "next/link"

const AppNav = ({ session }: AuthProps) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                    {session
                        ? (
                            <button onClick={() => {
                                logoutSession();
                            }}>
                                Log Out
                            </button>
                        ) : (
                            <>
                                <Link href="/login">
                                    Login
                                </Link>
                                <Link href="/register">
                                    Register
                                </Link>
                            </>
                        )
                    }
                </li>
            </ul>
        </nav>
    )
}

export default AppNav