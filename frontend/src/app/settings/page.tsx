'use client'

import { AuthContext } from "@/ui-system/components/auth-provider";
import { useContext } from "react";

const Settings = () => {
    const { session } = useContext(AuthContext);

    console.log('SETTINGS PAGE SESSION', session)

    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}

export default Settings