import { FolderPlus, Info, MessageSquare, NotepadText, Settings2, Users } from "lucide-react";

export const ragAppLinks = [
    {
        label: "Áttekintés",
        icon: <Info className="h-4 w-4" />,
        href: "/dashboard/rag/overview",
        roles: ["user", "admin"],
    },
    {
        label: "Témakörök",
        icon: <FolderPlus className="h-4 w-4" />,
        href: "/dashboard/rag/topics",
        roles: ["admin"],
    },
    {
        label: "Tartalomfeldolgozás",
        icon: <Settings2 className="h-4 w-4" />,
        href: "/dashboard/rag/docs",
        roles: ["admin"],
    },
    {
        label: "Tartalmak",
        icon: <NotepadText className="h-4 w-4" />,
        href: "/dashboard/rag/contents",
        roles: ["user", "admin"],
    },
    {
        label: "Chat",
        icon: <MessageSquare className="h-4 w-4" />,
        href: "/dashboard/rag/chat",
        roles: ["user", "admin"],
    },
]

export const setupLinks = [
    {
        label: "Felhasználók",
        icon: <Users className="h-4 w-4" />,
        href: "/dashboard/users",
        roles: ["admin"],
    }
]



