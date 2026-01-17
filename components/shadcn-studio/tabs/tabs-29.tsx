'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from "@/lib/utils"

interface Tab {
    name: string
    value: string
    content: React.ReactNode
}

interface AnimatedTabsProps {
    tabs: Tab[]
    defaultTab?: string
    className?: string
}

const AnimatedUnderlineTabs = ({ tabs, defaultTab, className }: AnimatedTabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

    useLayoutEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.value === activeTab)
        const activeTabElement = tabRefs.current[activeIndex]

        if (activeTabElement) {
            const { offsetLeft, offsetWidth } = activeTabElement

            setUnderlineStyle({
                left: offsetLeft,
                width: offsetWidth
            })
        }
    }, [activeTab, tabs])

    return (
        <div className={cn('w-full', className)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
                <TabsList className='bg-transparent relative rounded-none border-b p-0 w-full justify-start h-auto gap-6 overscroll-x-auto'>
                    {tabs.map((tab, index) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            ref={(el: HTMLButtonElement | null) => {
                                tabRefs.current[index] = el
                            }}
                            className='bg-transparent dark:data-[state=active]:bg-transparent relative z-10 rounded-none border-0 data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors'
                        >
                            {tab.name}
                        </TabsTrigger>
                    ))}

                    <motion.div
                        className='bg-primary absolute bottom-0 z-20 h-0.5'
                        layoutId='underline'
                        animate={{
                            left: underlineStyle.left,
                            width: underlineStyle.width
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 40
                        }}
                    />
                </TabsList>

                {tabs.map(tab => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-6 animate-in fade-in-50 duration-300">
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default AnimatedUnderlineTabs
