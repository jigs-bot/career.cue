import React from 'react'
import TagCard from '@/components/tagCard'
function Tag() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tags</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <TagCard name="software engin."/>
        <TagCard name="data science"/>
        <TagCard name="cisco"/>
        <TagCard name="Amazon"/>
        <TagCard/>
        <TagCard/>
        <TagCard/>
        <TagCard/>
        <TagCard/>
        <TagCard/>
        <TagCard/>
      </div>
    </div>
  )
}

export default Tag