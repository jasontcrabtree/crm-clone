'use client'

import { AuthContext } from "@/ui/components/auth-provider";
import { useContext } from "react";

const Settings = () => {
    const { session } = useContext(AuthContext);

    console.log('SETTINGS PAGE SESSION', session)

    return (
        <div>
            Settings
        </div>
    )
}

export default Settings