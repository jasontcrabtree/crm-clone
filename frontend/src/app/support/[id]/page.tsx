const Page = ({ params }: { params: { id: string } }) => {

    const { id } = params;

    return (
        <div className="w-full bg-zinc-100">
            <h1>
                Support {id}
            </h1>
        </div>
    )
}

export default Page;