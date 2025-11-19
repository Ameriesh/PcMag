"use client"
import { Calendar, Home, Inbox, Search, Settings, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuSub, // Ajouté pour l'indentation
  SidebarMenuSubItem, // Ajouté pour l'indentation
} from "@/components/ui/sidebar"
import { useI18n } from "@/locales/client"

// Importation des composants Collapsible
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible"


import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

import { User2 } from "lucide-react"
import { ChevronUp, Plus, Cog } from "lucide-react"
import { cn } from "@/lib/utils"; 
import { authClient } from "@/lib/auth-client" 


const Items = [
  {
     title: "Accueil",
     url: "/dashboard",
     icon: Home
  },
  {
     title: "Mes articles",
     url: "/dashboard/blog/listArticle",
     icon: Cog
  },



]
 


export function AppSidebar() {

  const t = useI18n()

  const pathname = usePathname()
  
  
  const isLinkActive = (url: string) => {
  
    if (url === "/dashboard") {
      return pathname === "/dashboard";
    }
    
    return pathname.startsWith(url);
  }


  
  return (
   
    <Sidebar className=" bg-white border-r border-secondary-200 text-secondary-900 shadow-xl">
      <SidebarContent>
     
        <SidebarGroup className="mb-auto pt-6 px-4"> 
          
          <SidebarGroupLabel className="text-secondary-900 font-extrabold text-2xl mb-6 px-3">
            {t('user')}
          </SidebarGroupLabel>

          <SidebarGroupContent> 
            <SidebarMenu>
              
                        {Items.map((item) => {
                            const isActive = isLinkActive(item.url) 
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a 
                                            href={item.url}
                                            className={cn(
                                                "flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors",
                                                "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                                                isActive && "bg-primary-50 text-primary-600 font-semibold",
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                   
            </SidebarMenu>
            {/* <SidebarMenu>

             
              <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                      <a 
                          href={homeItem.url}
                          className={cn(
                              "flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors",
                              "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                              isLinkActive(homeItem.url) && "bg-primary-50 text-primary-600 font-semibold",
                          )}
                      >
                          <homeItem.icon className="w-5 h-5" />
                          <span>{homeItem.title}</span>
                      </a>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            


              <Collapsible defaultOpen={isCreationGroupActive} className="group/collapsible">
                  
                 
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className={cn(
                            "flex items-center justify-between w-full p-3 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                            "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                        )}
                      >
                        <div className="flex items-center gap-3">
                         
                            <Plus className="w-5 h-5" />
                            <span>Création & Ajouts</span>
                        </div>
                       
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  
                  <CollapsibleContent>
                    <SidebarMenuSub>
                        {creationItems.map((item) => {
                            const isActive = isLinkActive(item.url) 
                            return (
                                <SidebarMenuSubItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a 
                                            href={item.url}
                                            className={cn(
                                                "flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors",
                                                "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                                                isActive && "bg-primary-50 text-primary-600 font-semibold",
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuSubItem>
                            )
                        })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
              </Collapsible>
              
               <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                      <a 
                          href={GererBlogs.url}
                          className={cn(
                              "flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors",
                              "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                              isLinkActive(GererBlogs.url) && "bg-primary-50 text-primary-600 font-semibold",
                          )}
                      >
                          <GererBlogs.icon className="w-5 h-5" />
                          <span>{GererBlogs.title}</span>
                      </a>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                      <a 
                          href={settingsItem.url}
                          className={cn(
                              "flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors",
                              "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                              isLinkActive(settingsItem.url) && "bg-primary-50 text-primary-600 font-semibold",
                          )}
                      >
                          <Settings className="w-5 h-5" />
                          <span>{settingsItem.title}</span>
                      </a>
                  </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu> */}
          </SidebarGroupContent>
        </SidebarGroup>
{/* 
        <SidebarFooter className="border-t border-secondary-200 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
             
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton 
                    className="flex items-center w-full py-2 px-3 bg-secondary-50 text-secondary-800 rounded-lg hover:bg-secondary-100 transition-colors"
                    suppressHydrationWarning={true}
                  >
                    <User2 className="w-5 h-5 mr-3 text-secondary-600" /> 
                    <span className="font-semibold">{session?.user.name}</span>
                    <ChevronUp className="ml-auto w-4 h-4 text-secondary-600" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                
               
                <DropdownMenuContent
                  side="top"
                  align="start"
                  sideOffset={8}
                  className="bg-white border border-secondary-200 shadow-lg p-1 w-52 rounded-md"
                >
                  <DropdownMenuItem className="p-2 text-sm text-secondary-700 hover:bg-secondary-100 cursor-pointer rounded-sm outline-none">
                    <span>My Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer rounded-sm outline-none">
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter> */}
      </SidebarContent>
    </Sidebar>
  )
}