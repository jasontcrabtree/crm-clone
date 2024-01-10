import { DashboardSkeleton } from "@/ui-system/skeletons/dashboard";
import { Suspense } from "react";

const CorePageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full bg-blue-500 flex-col-reverse sm:flex-row">
            {children}
        </div>
    )
}

const Template = ({ children }: { children: JSX.Element }) => {


    return (
        <CorePageLayout>
            <Suspense fallback={<DashboardSkeleton />}>
                {children}
                <div className="bg-teal-800 text-white w-full sm:min-w-24 sm:max-w-48 sm:h-screen">
                    Action slot
                </div>
            </Suspense>
        </CorePageLayout>
    )
}

export default Template;