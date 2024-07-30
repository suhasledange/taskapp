import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Loader = () => {
  return (<TailSpin
    visible={true}
    height="27"
    width="27"
    color="lightblue"
    ariaLabel="tail-spin-loading"
    radius="3"
    wrapperStyle={{}}
    wrapperClass=""
    />)
}

export default Loader
