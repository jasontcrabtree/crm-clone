'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";

import logoutSession from "@/lib/actions/logout-session";
import { mergeClasses } from "@/lib/shad-utils";
import { AuthProps } from "@/lib/types/auth";
import HomeIcon from "./icons/home-icon";
import UserIcon from "./icons/user-icon";
import BoltIcon from "./icons/bolt-icon";
import ContactsIcon from "./icons/contacts-icon";
import ConnectionIcon from "./icons/connection-icon";
import MessageIcon from "./icons/message-icon";
import OrganisationIcon from "./icons/organisation-icon";
import SupportIcon from "./icons/support-icon";
import { useHistoryContext } from "./history-provider";
import useDisplayRecentHistory from "@/lib/hooks/useHistory";

const NavLinkitem = ({ href, children, className }: {
    href: string, children: React.ReactNode, className?: string
}) => {
    const currentRoute = usePathname();
    const linkStyles = "py-1 px-1 rounded w-full  flex flex-row items-center gap-2 hover:text-rose-600 hover:bg-zinc-100 hover:cursor-pointer"

    return (
        <Link href={href} className={mergeClasses(
            linkStyles, className, currentRoute === href && "text-indigo-700 font-medium"
        )}>
            {children}
        </Link>
    )
}

const AppNav = ({ session, user }: AuthProps) => {
    // useDisplayRecentHistory();

    // const { history } = useHistoryContext();

    // console.log('history', history)

    return (
        <nav className="bg-zinc-50 w-full sm:min-w-24 sm:max-w-48 sm:h-screen flex flex-col pt-8 pb-4 px-3 text-zinc-800">
            <span className="text-xl font-bold py-2 pb-3 px-1 text-rose-600">Bondbridge</span>

            {user?.username ?
                (<NavLinkitem href="/profile" className="text-sm font-medium">
                    <UserIcon />
                    {user.username}
                </NavLinkitem>)
                : null}

            <ul className="flex flex-col gap-2 mt-12">
                <li>
                    <NavLinkitem href="/">
                        <HomeIcon />
                        Dashboard
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/interactions">
                        <BoltIcon />
                        Interactions
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/contacts">
                        <ContactsIcon />
                        Contacts
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/organisations">
                        <OrganisationIcon />
                        Organisations
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/connections">
                        <ConnectionIcon />
                        Connections
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/messages">
                        <MessageIcon />
                        Messages
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/support">
                        <SupportIcon />
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

            <div className="px-2 py-4 text-zinc-700 font-medium mt-auto">
                Recent pages
            </div>


            <div className="flex flex-col gap-2 mt-auto mb-8">

                <button onClick={() => {
                    logoutSession();
                }}>
                    Log Out
                </button>
            </div>
        </nav>
    )
}

export default AppNav