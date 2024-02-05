import { Spin } from 'antd'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <Spin style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%"}}/>
  )
}

export default LoadingSpinner