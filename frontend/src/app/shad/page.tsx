'use client';

import { useEffect, useRef, useState } from "react";

import { Button } from "@/ui-system/components/ui/button";
import { Calendar } from "@/ui-system/components/ui/calendar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui-system/components/ui/collapsible";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    ImperativePanelHandle,
} from "@/ui-system/components/ui/resizable"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/ui-system/components/ui/context-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/ui-system/components/ui/drawer";
import { Skeleton } from "@/ui-system/components/ui/skeleton";

const Shad = () => {
    const ref = useRef<ImperativePanelHandle>(null);

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [size, setSize] = useState<number>(0)

    const measureSize = () => {
        setSize(ref.current?.getSize() || 0)
    }

    useEffect(() => {
        console.log('size', size);
    }, [size])

    useEffect(() => {
        console.log('date', date)
    }, [date])

    return (
        <div className="w-full" >
            <h1 className="mb-8">Shad CN Components</h1>

            <Button className="mb-8" variant={"default"}>Button</Button>

            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mb-8"
            />

            <Collapsible className="mb-8">
                <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
                <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>
            </Collapsible>

            <ContextMenu >
                <ContextMenuTrigger className="flex p-4 mb-8 bg-zinc-100">Right click</ContextMenuTrigger>
                <ContextMenuContent className="bg-zinc-100">
                    <ContextMenuItem className="hover:cursor-pointer underline hover:bg-white">Profile</ContextMenuItem>
                    <ContextMenuItem className="hover:cursor-pointer underline hover:bg-white">Billing</ContextMenuItem>
                    <ContextMenuItem className="hover:cursor-pointer underline hover:bg-white">Team</ContextMenuItem>
                    <ContextMenuItem className="hover:cursor-pointer underline hover:bg-white">Subscription</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            <Drawer>
                <DrawerTrigger className="flex p-4 mb-8 bg-zinc-100">Open Drawer</DrawerTrigger>
                <DrawerContent className="bg-zinc-100" >
                    <DrawerHeader className="bg-zinc-100">
                        <DrawerHeader>Header</DrawerHeader>
                        <DrawerDescription>Drawer description</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>
                            Drawer Action
                        </Button>
                        <DrawerClose>
                            Close Draw
                        </DrawerClose>
                    </DrawerFooter >
                </DrawerContent >
            </Drawer>

            <div className="flex items-center space-x-4 bg-zinc-300 mb-8 p-4">
                <Skeleton className="h-12 w-12 rounded-full bg-zinc-100" />
                <div className="space-y-2 bg-zinc-300">
                    <Skeleton className="h-4 w-[250px] bg-zinc-100" />
                    <Skeleton className="h-4 w-[200px] bg-zinc-100" />
                </div>
            </div>

            <ResizablePanelGroup direction="vertical" id="verticalWrapper">
                <ResizablePanel order={1} id="topPanel" collapsible>
                    <ResizablePanelGroup direction="horizontal" id="top">
                        <ResizablePanel className="bg-red-500" order={1} id="topLeft" ref={ref} onResize={measureSize}>
                            One
                            {size > 30 ? (
                                <div>Hello WORLD</div>
                            ) : null}
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel className="bg-blue-500" order={2} id="topRight">
                            Two
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle id="verticalWrapper" withHandle />
                <ResizablePanel order={2} id="bottomPanel">
                    <ResizablePanelGroup direction="horizontal" id="bottom">
                        <ResizablePanel className="bg-green-500" order={1} id="bottomLeft">Three</ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel className="bg-yellow-500" order={2} id="bottomRight">Four</ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>


        </div>
    )
}

export default Shad;