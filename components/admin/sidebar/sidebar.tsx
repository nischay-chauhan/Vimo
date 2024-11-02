import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { HouseIcon, HotelIcon, PlaneTakeoff, BookOpenIcon, DatabaseBackup } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", icon: HouseIcon, link: "/admin/dashboard" },
  { label: "Hotels", icon: HotelIcon, link: "/admin/hotels" },
  { label: "Trips", icon: PlaneTakeoff, link: "/admin/trips" },
  { label: "Bookings", icon: BookOpenIcon, link: "/admin/bookings" },
  { label: "Scrape Data", icon: DatabaseBackup, link: "/admin/scrape" }
];

const SidebarComponent = () => (
  <Sidebar>
    <SidebarContent>
      <SidebarGroup className="p-10">
        <SidebarGroupLabel className="text-xl">Admin Menu</SidebarGroupLabel>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link href={item.link}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
);
export default SidebarComponent;
