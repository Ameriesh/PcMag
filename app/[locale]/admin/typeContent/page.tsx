import React from 'react'
import TypeForm from '../_components/TypeForm'
import TypeTable from '../_components/TypeTable'

function page() {
  return (
    <div>
        <TypeForm/><br></br>

        <h2 className='text-center text-4xl text-primary-400'>Liste des Types</h2> <br></br>


        <TypeTable/>
    </div>
  )
}

export default page