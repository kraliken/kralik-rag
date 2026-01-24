import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllTopicAction } from "@/lib/actions/topic"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"

const ListPage = async () => {

    const { data } = await getAllTopicAction()

    return (
        <div className="flex flex-col gap-8 items-start min-h-screen bg-zinc-50 font-sans dark:bg-black">
            <div className="flex justify-center w-full p-4">
                <Button asChild variant="ghost">
                    <Link href="/">Kezdőlap</Link>
                </Button>
            </div>
            <div className="flex flex-col items-center w-full">
                {data.map(item => (
                    <Item key={item.id}>
                        <ItemContent>
                            <ItemTitle>{item.title}</ItemTitle>
                        </ItemContent>
                    </Item>
                ))}
            </div>
        </div>
    )
}

export default ListPage