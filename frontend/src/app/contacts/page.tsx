import CustomLink from "@/ui-system/components/custom-link";

const Page = () => {

    return (
        <div className="w-full bg-zinc-50">
            <div>
                Contact stats
            </div>
            <div>
                Search
            </div>
            <div>
                New contact
            </div>
            <div>
                <h2>Contact List</h2>
                <div>
                    <CustomLink href="/contacts/matthew-boyd-3e08243280rf">
                        Contact 1
                    </CustomLink>
                </div>
            </div>
        </div>
    )
}

export default Page;