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

// Séparation des éléments du menu
const homeItem = {
    title: "Accueil",
    url: "/admin", 
    icon: Home,
}

const creationItems = [
  {
    title: "Ajouter un Article",
    url: "/admin/Article", 
    icon: Plus,
  },
  {
    title: "Ajouter une Categorie",
    url: "/admin/Category", 
    icon: Plus,
  },
  {
    title: "Ajouter un type",
    url: "/admin/typeContent", 
    icon: Plus,
  },
]
const GererBlogs = {
  title: "Gerer mes Articles",
  url: "/admin/listArticle",
  icon: Cog,
}

const settingsItem = {
  title: "Paramètres",
  url: "/admin/settings",
  icon: Settings,
}


export function AppSidebar() {

  const pathname = usePathname()
  
  // Logique d'activation
  const isLinkActive = (url: string) => {
    // '/admin' doit être une correspondance exacte
    if (url === "/admin") {
      return pathname === "/admin";
    }
    // Les autres sont actifs si le chemin commence par l'URL
    return pathname.startsWith(url);
  }

  // Détermine si le groupe 'Création' doit être ouvert par défaut
  const isCreationGroupActive = creationItems.some(item => isLinkActive(item.url));

  const {data: session} = authClient.useSession()

  
  return (
   
    <Sidebar className=" bg-white border-r border-secondary-200 text-secondary-900 shadow-xl">
      <SidebarContent>
     
        <SidebarGroup className="mb-auto pt-6 px-4"> 
          
          <SidebarGroupLabel className="text-secondary-900 font-extrabold text-2xl mb-6 px-3">
            Admin
          </SidebarGroupLabel>

          <SidebarGroupContent> 
            <SidebarMenu>

              {/* 1. Onglet ACCUEIL (toujours visible) */}
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


              {/* 2. Collapsible pour le groupe AJOUTS */}
              <Collapsible defaultOpen={isCreationGroupActive} className="group/collapsible">
                  
                  {/* Bouton qui déclenche l'ouverture/fermeture du Collapsible */}
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className={cn(
                            "flex items-center justify-between w-full p-3 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                            "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                        )}
                      >
                        <div className="flex items-center gap-3">
                            {/* Icône du groupe : Plus est pertinent pour 'Ajouts' */}
                            <Plus className="w-5 h-5" />
                            <span>Création & Ajouts</span>
                        </div>
                        {/* Indicateur de rétraction qui tourne */}
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  {/* Contenu rétractable */}
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

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

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
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}