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
  // Simuler la route active pour le style (à remplacer par usePathname() si possible)
  const currentPath = "/admin/Article"; 
  
  return (
   
    // 1. Sidebar : Fond blanc, bordure secondaire claire, texte gris foncé
    <Sidebar className="mr-100 bg-white border-r border-secondary-200 text-secondary-900 shadow-xl">
      <SidebarContent>
     
        {/* 2. Groupe : Retrait de l'ancienne marge fixe */}
        <SidebarGroup className="mb-auto pt-6 px-4"> 
          
          {/* 3. Label du Dashboard : Texte sombre et espacement moderne */}
          <SidebarGroupLabel className="text-secondary-900 font-extrabold text-2xl mb-6 px-3">
            Admin
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                  const isActive = item.url === currentPath; // Logique d'activation
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        
                        <a 
                          href={item.url}
                          className={cn(
                            "flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors",
                            // 4. Styles : Texte gris, hover en Cyan, fond gris clair.
                            "text-secondary-700 hover:bg-primary-50 hover:text-primary-600",
                            // Style actif
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
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="border-t border-secondary-200 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                 
                  {/* 5. Bouton Utilisateur : Fond clair, design épuré */}
                  <SidebarMenuButton 
                    className="flex items-center w-full py-2 px-3 bg-secondary-50 text-secondary-800 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <User2 className="w-5 h-5 mr-3 text-secondary-600" /> 
                    <span className="font-semibold">Nom d'Utilisateur</span>
                    <ChevronUp className="ml-auto w-4 h-4 text-secondary-600" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                
                {/* 6. Contenu du Dropdown Menu : Fond blanc/bordure claire */}
                <DropdownMenuContent
                  side="top"
                  align="start"
                  sideOffset={8}
                  className="bg-white border border-secondary-200 shadow-lg p-1 w-52 rounded-md"
                >
                  <DropdownMenuItem className="p-2 text-sm text-secondary-700 hover:bg-secondary-100 cursor-pointer rounded-sm outline-none">
                    <span>Compte</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer rounded-sm outline-none">
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