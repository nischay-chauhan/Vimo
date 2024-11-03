'use client'
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { HouseIcon, HotelIcon, PlaneTakeoff, BookOpenIcon, DatabaseBackup, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { label: "Dashboard", icon: HouseIcon, link: "/admin/dashboard" },
  { label: "Hotels", icon: HotelIcon, link: "/admin/hotels" },
  { label: "Trips", icon: PlaneTakeoff, link: "/admin/trips" },
  { label: "Bookings", icon: BookOpenIcon, link: "/admin/bookings" },
  { label: "Scrape Data", icon: DatabaseBackup, link: "/admin/scrape" }
];



const SidebarComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    return(
        <Sidebar>
          <SidebarContent >
            <SidebarGroup className="p-10">
              <Link href={"/admin/dashboard"}>
            <Image
              src={'/logo.svg'}
              alt="Vimo Logo"
              width={200}
              height={200}
              />
              </Link>
              <SidebarMenu className="gap-6 mt-6">
                {menuItems.map((item) => (
                  <SidebarMenuItem   key={item.label}>
                    <SidebarMenuButton isActive={pathname === item.link}  asChild>
                      <Link href={item.link}>
                        <item.icon />
                        <span className="text-lg">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <Button onClick={() => router.push("/admin/logout")} variant="destructive">Logout</Button>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      );
}
export default SidebarComponent;
