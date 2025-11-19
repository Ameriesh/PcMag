"use client"
import type { ReactElement } from "react"
import { TrendingUp } from "lucide-react"
import { useScopedI18n } from '@/locales/client'; // 💡 Importation de la traduction
import { useCategory } from "@/hooks/use-category-data"
import { useType } from "@/hooks/use-type-data"
import { useArticlesData } from "@/hooks/use-article-data"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface SectionCardsProps {
    authorId: string;
}

export function SectionCards({ authorId } : SectionCardsProps): ReactElement { 
    
    
    const t = useScopedI18n('dashboard'); 

 
    const fetchId = 'admin'; 
    
    const {data: categories} = useCategory()
    const {data: type } = useType()
    const {data: articles} = useArticlesData(authorId) 
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
         
      
      <Card className="@container/card border-2 rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none border-primary-500 hover:bg-secondary-100">
        <CardHeader className="border-primary-500">
          
          <CardDescription className="text-primary-600">{t('my_articles')}</CardDescription>
          <CardTitle className=" text-[30px] text-secondary-700">
            {articles?.length || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      
     
      <Card className="@container/card border-2 rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none border-primary-500 hover:bg-secondary-100">
        <CardHeader className="border-primary-500">
          
          <CardDescription className="text-primary-600">{t('my_categories')}</CardDescription>
          <CardTitle className=" text-[30px] text-secondary-700">
            {categories?.length || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      
     
      <Card className="@container/card border-2 rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none border-primary-500 hover:bg-secondary-100">
        <CardHeader className="border-primary-500">
          
          <CardDescription className="text-primary-600">{t('my_types')}</CardDescription>
          <CardTitle className=" text-[30px] text-secondary-700">
            {type?.length || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
     
     
      <Card className="@container/card border-2 rounded-bl-lg rounded-br-none rounded-tl-none border-primary-500 hover:bg-secondary-100">
        <CardHeader className="border-primary-500">
          
          <CardDescription className="text-primary-600">{t('total_revenue')}</CardDescription>
          <CardTitle className=" text-[30px] text-secondary-700 ">
            0
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    
    </div>
  )
}