import { mergeClasses } from "@/lib/client/shad-utils";
import Link from "next/link";
import { useHistoryContext } from "./history-provider";

const CustomLink = ({ href, classes, children }: {
    href: string,
    classes?: string,
    children: React.ReactNode
}) => {
    const { updateHistory } = useHistoryContext();

    return (
        <Link href={href} className={`${mergeClasses(classes)}`} onClick={() => updateHistory(href)}>
            {children}
        </Link>
    )
}

export default CustomLink;