"use client"
import { Home, Cog } from "lucide-react"
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
} from "@/components/ui/sidebar"

// 💡 Importation du hook de locale actuel
import { useScopedI18n, useCurrentLocale } from '@/locales/client'; 
import { cn } from "@/lib/utils"; 
import { authClient } from "@/lib/auth-client"


// 💡 Structure des items pour la traduction
const getSidebarItems = (t: any) => ([
  {
     title: t('accueil'),
     url: "/admin",
     icon: Home
  },
  {
     title: t('my_articles'),
     url: "/admin/listArticle",
     icon: Cog
  },
  {
     title: t('my_categories'),
     url: "/admin/Category",
     icon: Cog
  },
    {
     title: t('my_types'),
     url: "/admin/typeContent",
     icon: Cog
  },
]);

 
export function AppSidebar() {

  const t = useScopedI18n('sidebar');
  
  const rawPathname = usePathname();
  // 💡 CORRECTION HYDRATATION: Utiliser useCurrentLocale() pour la valeur du serveur
  const currentLocale = useCurrentLocale(); 
  
  // 1. NORMALISATION DU CHEMIN D'ACCÈS
  // Retire le préfixe de locale (ex: '/fr/admin/listArticle' -> '/admin/listArticle')
  // Le chemin normalisé est utilisé UNIQUEMENT pour la logique d'activation.
  const pathname = rawPathname.replace(`/${currentLocale}`, '') || '/';
  
  const {data: session} = authClient.useSession()
  
  const items = getSidebarItems(t);


  // 2. LOGIQUE D'ACTIVATION (utilise le pathname normalisé) :
  const isLinkActive = (url: string) => {
    
    // Cas spécial pour la page d'accueil ("/admin" ou "/")
    if (url === "/admin") {
      return pathname === url || pathname === '/';
    }
    
    // Pour toutes les autres URL : vérifie l'égalité stricte ou le préfixe de sous-route
    return pathname === url || pathname.startsWith(`${url}/`);
  }

  
  return (
   
    <Sidebar className=" bg-white border-r border-secondary-200 text-secondary-900 shadow-xl">
      <SidebarContent>
     
        <SidebarGroup className="mb-auto pt-6 px-4"> 
          
          <SidebarGroupLabel className="text-secondary-900 font-extrabold text-2xl mb-6 px-3">
            Admin
          </SidebarGroupLabel>

          <SidebarGroupContent> 
            <SidebarMenu>
              
                        {items.map((item) => {
                            const isActive = isLinkActive(item.url);
                            // 💡 Construction du HREF avec la locale pour l'hydratation
                            // Si item.url est '/', on omet le '/admin' du chemin pour ne pas avoir //
                            const hrefWithLocale = `/${currentLocale}${item.url === '/' ? '' : item.url}`;

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a 
                                            href={hrefWithLocale} 
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
          
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}