"use server"
import { Prisma } from "@/genereted/prisma";

interface ArticleData{
  title: string;
  excerpt: string;
  image: string;
  category: string;
  badge: string;
  type: 'news' | 'test' | 'video';
  readTime: string;
  featured: boolean;
}