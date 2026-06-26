import { AppSidebar } from "@/components/sidebar/AppSidebar"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
<header className="flex h-16 shrink-0 items-center transition-[width] ease-linear">
  <div className="flex w-full items-center justify-between px-4">
    <div className="flex items-center gap-2">
      <SidebarTrigger className="-ml-1" />

      <Field>
        <Input id="input-button-group" placeholder="Type to search..." />
    </Field>


    </div>

 <Button variant="default" className="cursor-pointer" size="sm">
      <Plus /> Create
    </Button>
  </div>
</header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          <h1 className="text-7xl">Hello</h1>
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
