import useProductsState from '@/hook/useProductsState'
import React from 'react'

const Breadcrumb = () => {
  const { product } = useProductsState()
  return (
    <div className='breadcrumb'>
  
    </div>
  )
}

export default Breadcrumb

//<Breadcrumb product={product} />)}
//const { product} = useProductsState()