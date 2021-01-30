import React, { useState } from 'react'
import Widget from '../Widgets'
import Lottie from 'react-lottie'
import animationData from './loading.json'

export default function LoadingWidget() {
  const [animationState, setAnimationState] = useState({
    isStopped: false,
    isPaused: false
  })

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div>
      <Widget>
        <Widget.Header>Carregando...</Widget.Header>
        <Widget.Content>
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            isStopped={animationState.isStopped}
            isPaused={animationState.isPaused}
          />
        </Widget.Content>
      </Widget>
    </div>
  )
}
