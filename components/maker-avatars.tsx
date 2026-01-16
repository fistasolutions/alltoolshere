"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

interface Maker {
    name: string
    avatar: string
    handle?: string
}

interface MakerAvatarsProps {
    makers: Maker[]
}

export function MakerAvatars({ makers }: MakerAvatarsProps) {
    return (
        <div className="flex items-center -space-x-2 overflow-hidden hover:space-x-1 transition-all">
            {makers.map((maker, i) => (
                <HoverCard key={i}>
                    <HoverCardTrigger asChild>
                        <Avatar className="h-8 w-8 border-2 border-background cursor-pointer hover:z-10 transition-transform">
                            <AvatarImage src={maker.avatar} alt={maker.name} />
                            <AvatarFallback>{maker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage src={maker.avatar} />
                                <AvatarFallback>{maker.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{maker.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {maker.handle || "@" + maker.name.toLowerCase().replace(/\s/g, "")}
                                </p>
                                <div className="flex items-center pt-2">
                                    <span className="text-xs text-muted-foreground">
                                        Joined December 2021
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Follow</Button>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            ))}
        </div>
    )
}
