const ActionSlot = ({ children }: { children: JSX.Element }): JSX.Element => {
    return (
        <div className="bg-teal-800 text-white w-[35%] sm:min-w-32 sm:max-w-64 sm:h-screen ml-auto pt-10">
            {children}
        </div>
    )
}

export default ActionSlot;