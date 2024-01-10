'use client';

import logoutSession from "@/lib/actions/logout-session";
import { mergeClasses } from "@/lib/shad-utils";
import { AuthProps } from "@/lib/types/auth";
import Link from "next/link"
import HomeIcon from "./icons/home-icon";
import UserIcon from "./icons/user-icon";

const NavLinkitem = ({ href, children, className }: {
    href: string, children: React.ReactNode, className?: string
}) => {
    const linkStyles = "py-1 px-1 rounded w-full  flex flex-row items-center gap-2 hover:text-rose-600 hover:bg-zinc-100 hover:cursor-pointer"

    return (
        <li>
            <Link href={href} className={mergeClasses(linkStyles, className)}>
                {children}
            </Link>
        </li>
    )
}

const AppNav = ({ session, user }: AuthProps) => {
    return (
        <nav className="bg-zinc-50 w-full sm:min-w-24 sm:max-w-48 sm:h-screen flex flex-col py-4 px-3 text-zinc-800">
            <h1 className="text-xl font-bold pb-3 py-2 px-1 text-rose-600">Bondbridge</h1>
            <ul className="gap-1">
                {user?.username ?
                    (<NavLinkitem href="/" className="text-sm mb-3 font-medium">
                        <UserIcon />
                        {user.username}
                    </NavLinkitem>)
                    : null}
                <li>
                    <NavLinkitem href="/">
                        Actions
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/">
                        Contacts
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/">
                        Organisations
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/">
                        Connections
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/">
                        Messages
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/">
                        Support
                    </NavLinkitem>
                </li>

                {/* @ts-expect-error */}
                {session && 1 === 3 ? (
                    <>
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
                    </>
                ) : null}
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