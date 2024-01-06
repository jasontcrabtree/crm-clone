import Link from "next/link"

const AppNav = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/">
                        Login
                    </Link>
                    <Link href="/">
                        Register
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav