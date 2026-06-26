import * as React from "react"

import { NavMain } from "@/components/sidebar/SidebarMain"
import { NavUser } from "@/components/sidebar/SidebarUser"
import { SidebarBrand } from "@/components/sidebar/SidebarBranc"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { data } from "@/constants/dashbaord"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.sidebarItems} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.sidebarUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
