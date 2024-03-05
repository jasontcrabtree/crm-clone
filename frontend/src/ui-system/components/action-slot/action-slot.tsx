const ActionSlot = ({ children }: { children: JSX.Element }): JSX.Element => {
    return (
        <div className="bg-teal-800 text-white w-[25%] sm:min-w-24 sm:max-w-48 sm:h-screen ml-auto pt-24">
            {children}
        </div>
    )
}

export default ActionSlot;