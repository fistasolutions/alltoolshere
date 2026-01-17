import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const TOPICS = [
    { name: "Artificial Intelligence", count: 1240, icon: "🤖" },
    { name: "Productivity", count: 850, icon: "⚡" },
    { name: "Developer Tools", count: 720, icon: "🛠️" },
    { name: "Design Tools", count: 640, icon: "🎨" },
    { name: "Marketing", count: 530, icon: "📈" },
    { name: "No-Code", count: 420, icon: "🚀" },
    { name: "Social Media", count: 380, icon: "💬" },
    { name: "Finance", count: 210, icon: "💰" },
    { name: "Education", count: 190, icon: "📚" },
    { name: "Health & Fitness", count: 150, icon: "💪" },
    { name: "Crypto", count: 120, icon: "🪙" },
    { name: "Music", count: 90, icon: "🎵" },
]

export default function TopicsPage() {
    return (
        <div className="container max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl font-bold">Topics</h1>
                <p className="text-muted-foreground text-lg">Browse tools by category.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {TOPICS.map((topic) => (
                    <Link key={topic.name} href={`/tools?topic=${encodeURIComponent(topic.name)}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="text-4xl group-hover:scale-110 transition-transform">{topic.icon}</div>
                                <div>
                                    <CardTitle className="text-base group-hover:text-primary transition-colors">{topic.name}</CardTitle>
                                    <CardDescription>{topic.count} tools</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
