import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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
  
} from "@/components/ui/sidebar"


import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

import { User2 } from "lucide-react"
import { ChevronUp, Plus } from "lucide-react"
import { cn } from "@/lib/utils"; 

const items = [
  {
    title: "Accueil",
    url: "/admin", 
    icon: Home,
  },
  {
    title: "Ajouter un Article",
    url: "/admin/Article", 
    icon: Plus,
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    // 🚨 1. Style du conteneur principal de la Sidebar
    // Utiliser un fond sombre cohérent avec votre thème (ex: secondary-900)
    <Sidebar className="mr-100 bg-secondary-900 border-r border-secondary-700 text-secondary-300 mr-">
      <SidebarContent>
        {/* L'espace pour le titre et le menu principal */}
        <SidebarGroup className="mb-[297px] pt-4"> 
          {/* 🚨 2. Style du titre "PC MAG" */}
          <SidebarGroupLabel className="sign-title text-center !text-xl !text-primary-400 !mb-6">
            PC MAG
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* 🚨 3. Style des boutons de menu */}
                    {/* Appliquer un style sombre de base, avec hover actif */}
                    <a 
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 p-3 text-sm font-medium rounded-sm transition-colors",
                        "text-secondary-300 hover:bg-secondary-800 hover:text-primary-400",
                        // Si le composant sait détecter l'état actif, vous pouvez ajouter :
                        // isActive && "bg-secondary-700 text-primary-500"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* 🚨 4. Style du bouton utilisateur en bas */}
                  <SidebarMenuButton 
                    className="bg-white-100"
                  >
                    <User2 className="w-5 h-5 mr-3" /> Nom d'Utilisateur
                    <ChevronUp className="ml-auto w-4 h-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                
                {/* 🚨 5. Style du contenu du Dropdown Menu */}
                <DropdownMenuContent
                  side="top"
                  className="bg-gray-300"

                >
                  <DropdownMenuItem className="p-2 text-sm text-secondary-300 hover:bg-secondary-700 cursor-pointer">
                    <span>Compte</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 text-sm text-red-500 hover:bg-red-500/10 cursor-pointer">
                    <span>Déconnexion</span>
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