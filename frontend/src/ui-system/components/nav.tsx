'use client';

import { usePathname } from "next/navigation";

import logoutSession from "@/lib/actions/logout-session";
import { AuthProps } from "@/lib/types/auth";

import { useHistoryContext } from "./history-provider";
import CustomLink from "./custom-link";
import { mergeClasses } from "@/lib/client/shad-utils";
import { formatUrlToReadable } from "@/lib/client/client-utils";
import { ArrowPathIcon, BoltIcon, BuildingOffice2Icon, ChatBubbleLeftIcon, GlobeAsiaAustraliaIcon, HomeIcon, QuestionMarkCircleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'

import { ArrowPathIcon as MicroArrowPathIcon, BoltIcon as MicroBoltIcon, ChatBubbleLeftIcon as MicroBuildingOffice2Icon, ChatBubbleLeftIcon as MicroChatBubbleLeftIcon, GlobeAsiaAustraliaIcon as MicroGlobeAsiaAustraliaIcon, HomeIcon as MicroHomeIcon, QuestionMarkCircleIcon as MicroQuestionMarkCircleIcon, UserGroupIcon as MicroUserGroupIcon, UserIcon as MicroUserIcon } from '@heroicons/react/16/solid'
import { Button } from "./ui/button";

const NavLinkitem = ({ href, children, className }: {
    href: string, children: React.ReactNode, className?: string
}) => {
    const currentRoute = usePathname();
    const linkStyles = "py-1 px-1 rounded w-full  flex flex-row items-center gap-2 hover:text-rose-600 hover:bg-zinc-100 hover:cursor-pointer"

    return (
        <CustomLink href={href} classes={`${linkStyles}, ${currentRoute === href && "text-indigo-700 font-medium"}, ${className}`}>
            {children}
        </CustomLink>
    )
}

const renderHistoryIcon = (item: string): JSX.Element => {
    const iconMap = [
        { icon: MicroArrowPathIcon, key: 'connections' },
        { icon: MicroBoltIcon, key: 'interactions' },
        { icon: MicroBuildingOffice2Icon, key: 'organisations' },
        { icon: MicroChatBubbleLeftIcon, key: 'messages' },
        { icon: MicroQuestionMarkCircleIcon, key: 'support' },
        { icon: MicroUserGroupIcon, key: 'contacts' },
        { icon: MicroUserIcon, key: 'settings' }
    ];

    const matchedIcon = iconMap.find(icon => item.includes(icon.key));

    if (matchedIcon) {
        return <matchedIcon.icon className="w-[14px]" />;
    }

    return <MicroBoltIcon className="w-[14px]" />;
}

export const LogoIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 11.5C23 17.8513 17.8513 23 11.5 23C5.14873 23 0 17.8513 0 11.5C0 5.14873 5.14873 0 11.5 0C17.8513 0 23 5.14873 23 11.5Z" fill="#D70039" />
            <g clipPath="url(#clip0_115_38)">
                <path d="M12.7557 15.581H15.581M15.581 15.581H18.4062M15.581 15.581V12.7557M15.581 15.581V18.4062M6.47727 10.2443H8.3608C8.86034 10.2443 9.33942 10.0459 9.69265 9.69265C10.0459 9.33942 10.2443 8.86034 10.2443 8.3608V6.47727C10.2443 5.97773 10.0459 5.49865 9.69265 5.14542C9.33942 4.79219 8.86034 4.59375 8.3608 4.59375H6.47727C5.97773 4.59375 5.49865 4.79219 5.14542 5.14542C4.79219 5.49865 4.59375 5.97773 4.59375 6.47727V8.3608C4.59375 8.86034 4.79219 9.33942 5.14542 9.69265C5.49865 10.0459 5.97773 10.2443 6.47727 10.2443ZM6.47727 18.4062H8.3608C8.86034 18.4062 9.33942 18.2078 9.69265 17.8546C10.0459 17.5013 10.2443 17.0223 10.2443 16.5227V14.6392C10.2443 14.1397 10.0459 13.6606 9.69265 13.3074C9.33942 12.9541 8.86034 12.7557 8.3608 12.7557H6.47727C5.97773 12.7557 5.49865 12.9541 5.14542 13.3074C4.79219 13.6606 4.59375 14.1397 4.59375 14.6392V16.5227C4.59375 17.0223 4.79219 17.5013 5.14542 17.8546C5.49865 18.2078 5.97773 18.4062 6.47727 18.4062ZM14.6392 10.2443H16.5227C17.0223 10.2443 17.5013 10.0459 17.8546 9.69265C18.2078 9.33942 18.4062 8.86034 18.4062 8.3608V6.47727C18.4062 5.97773 18.2078 5.49865 17.8546 5.14542C17.5013 4.79219 17.0223 4.59375 16.5227 4.59375H14.6392C14.1397 4.59375 13.6606 4.79219 13.3074 5.14542C12.9541 5.49865 12.7557 5.97773 12.7557 6.47727V8.3608C12.7557 8.86034 12.9541 9.33942 13.3074 9.69265C13.6606 10.0459 14.1397 10.2443 14.6392 10.2443Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_115_38">
                    <rect width="17" height="17" fill="white" transform="translate(3 3)" />
                </clipPath>
            </defs>
        </svg>
    )
}

const AppNav = ({ session, user }: AuthProps) => {

    const { history } = useHistoryContext();

    return (
        <nav className={`bg-slate-200 w-full sm:min-w-24 sm:max-w-48 sm:h-screen gap-6  pt-10 px-3 max-h-screen h-full flex flex-col content-start`}>
            <span className="text-xl font-bold px-1 text-rose-600 flex flex-row gap-2 items-center">
                <LogoIcon />
                Bondbridge
            </span>

            <ul className="flex flex-col gap-2 ">
                <li>
                    <NavLinkitem href="/">
                        <HomeIcon className="w-6" />
                        Dashboard
                    </NavLinkitem>
                </li>
                {/* <li>
                    <NavLinkitem href="/interactions">
                        <BoltIcon className="w-6" />
                        Interactions
                    </NavLinkitem>
                </li> */}
                <li>
                    <NavLinkitem href="/contacts">
                        <UserGroupIcon className="w-6" />
                        Contacts
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/organisations">
                        <BuildingOffice2Icon className="w-6" />
                        Organisations
                    </NavLinkitem>
                </li>
                {/* <li>
                    <NavLinkitem href="/connections">
                        <ArrowPathIcon className="w-6" />
                        Connections
                    </NavLinkitem>
                </li> */}
                {/* <li>
                    <NavLinkitem href="/messages">
                        <ChatBubbleLeftIcon className="w-6" />
                        Messages
                    </NavLinkitem>
                </li>
                <li>
                    <NavLinkitem href="/support">
                        <QuestionMarkCircleIcon className="w-6" />
                        Support
                    </NavLinkitem>
                </li> */}

                {/* @ts-expect-error */}
                {session && 1 === 3 ? (
                    <>
                        <li>
                            <CustomLink href="/login">
                                Login
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink href="/register">
                                Register
                            </CustomLink>
                        </li>
                    </>
                ) : null}
            </ul>

            <div className="flex h-[2px] w-[20%] ml-2 bg-indigo-800 rounded"></div>

            <div className="flex-grow px-1 text-xs flex flex-col gap-1 overflow-y-auto auto-rows-fr">
                {history.length > 0
                    ? (
                        <>
                            <span className="text-zinc-700 font-medium">
                                Recent Pages
                            </span>
                            <div className="flex flex-col gap-1">
                                {history.map((item, index) => {

                                    const historyItemStyles = mergeClasses(
                                        "flex w-full p-2 hover:text-white hover:border-indigo-600 rounded-[8px] border-[1px] text-zinc-400 rounded-[8px] hover:bg-indigo-600 items-center gap-1 bg-white",
                                        index === 0 ? "border-indigo-800 text-indigo-800 font-semibold" : "border-zinc-200"
                                    )

                                    if (item === "/") {
                                        return (
                                            <CustomLink href={item} classes={historyItemStyles} key={index}>
                                                Dashboard
                                                {renderHistoryIcon(item)}
                                            </CustomLink>
                                        )
                                    } else {
                                        return (
                                            <CustomLink href={item} classes={historyItemStyles} key={index}>
                                                <span className="truncate max-w-[18ch]">
                                                    {formatUrlToReadable(item)}
                                                </span>
                                                {renderHistoryIcon(item)}
                                            </CustomLink>
                                        )
                                    }
                                })}
                            </div>
                        </>)
                    : (
                        <div className="flex flex-row gap-2 items-center text-zinc-500">
                            <GlobeAsiaAustraliaIcon className="w-6" />
                            <span>History empty ...</span>
                        </div>
                    )}
            </div>


            <div className="flex flex-col gap-2 mt-auto mb-8 ">
                {user?.username ?
                    (<NavLinkitem href="/profile" className="text-sm font-medium text-indigo-800">
                        <UserIcon className="w-6" />
                        {user.username}
                    </NavLinkitem>)
                    : null}

                <Button variant={"secondary"} onClick={() => {
                    logoutSession();
                }}>
                    Log Out
                </Button>
            </div>
        </nav>
    )
}

export default AppNav