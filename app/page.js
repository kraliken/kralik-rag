import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <div className="flex items-start min-h-screen bg-zinc-50 font-sans dark:bg-black">
            <div className="flex justify-center w-full p-4">
                <Button asChild variant="ghost">
                    <Link href="/list">Lista</Link>
                </Button>
            </div>
        </div>
    );
}
