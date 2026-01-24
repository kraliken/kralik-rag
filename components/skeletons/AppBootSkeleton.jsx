export default function Loading() {
    return (
        <div className="min-h-dvh bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="h-10 w-10 rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground/60 animate-spin"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    )
}
