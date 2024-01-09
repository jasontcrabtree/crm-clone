'use client';

import { Calendar } from "@/ui-system/components/ui/calendar"
import { useState } from "react";

const Shad = () => {

    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div>
            <h1>Shad</h1>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        </div>
    )
}

export default Shad;