import React from 'react'
import ArticleCreationForm from '../_components/ArticleForm'


async function page() {
  const res = await fetch('http://localhost:3000/api/category',{
    cache: 'no-store'
  })
  const type = await fetch('http://localhost:3000/api/type',{
    cache: 'no-store'
  })

  const categories = await res.json()
  return (
    <div>
        <ArticleCreationForm categories={categories} type={type}></ArticleCreationForm>
    </div>
  )
}

export default page