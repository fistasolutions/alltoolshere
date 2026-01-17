export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        AllToolsHere
                    </a>


                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Guidelines</a>
                </div>
            </div>
        </footer>
    )
}
