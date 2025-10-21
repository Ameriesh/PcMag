import React from 'react'
import ArticleCreationForm from '../_components/ArticleForm'


async function page() {
  const [resCategories, resTypes] = await Promise.all([
      fetch('http://localhost:3000/api/categories/category', { cache: 'no-store' }),
      fetch('http://localhost:3000/api/type', { cache: 'no-store' })
  ]);

  const categories = resCategories.ok ? await resCategories.json().catch(() => []) : [];
  const types = resTypes.ok ? await resTypes.json().catch(() => []) : [];

  return (
    <div>
        <ArticleCreationForm categories={categories} types={types}></ArticleCreationForm>
    </div>
  )
}

export default page