import { Button } from "@/components/ui/button"
import { ProductCard, Product } from "@/components/product-card"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FollowingPage() {
    return (
        <div className="container max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">Your Feed</h1>
                    <p className="text-muted-foreground">
                        Updates from makers and topics you follow.
                    </p>
                </div>

                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Activity</TabsTrigger>
                        <TabsTrigger value="launches">Launches</TabsTrigger>
                        <TabsTrigger value="discussions">Discussions</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-6 border rounded-xl bg-muted/10">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">It's quiet here...</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Follow some makers and topics to populate your feed with amazing new tools.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button>Find Makers</Button>
                        <Button variant="outline">Explore Topics</Button>
                    </div>
                </div>
            </div>

            <aside className="hidden lg:col-span-4 lg:block space-y-6">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider mb-4">Suggested Makers</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Card key={i} className="flex flex-row items-center p-3 gap-3">
                            <Avatar>
                                <AvatarImage src={`https://github.com/shadcn.png`} />
                                <AvatarFallback>M</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="font-semibold truncate">Maker Name</div>
                                <div className="text-xs text-muted-foreground truncate">Building the next big thing</div>
                            </div>
                            <Button variant="outline" size="sm">Follow</Button>
                        </Card>
                    ))}
                </div>
            </aside>

        </div>
    )
}
