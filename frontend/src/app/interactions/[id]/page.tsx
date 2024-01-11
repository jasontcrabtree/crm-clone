const Page = ({ params }: { params: { id: string } }) => {

    const { id } = params;

    return (
        <div className="w-full bg-zinc-50">
            <h1>
                Interaction {id}
            </h1>
        </div>
    )
}

export default Page;