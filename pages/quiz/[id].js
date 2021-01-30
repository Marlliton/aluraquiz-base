/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/Screens/Quiz'

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestion={dbExterno.questions}
        externalBG={dbExterno.bg}
      />
    </ThemeProvider>
    /* <pre>{JSON.stringify(dbExterno.questions, null, 4)}</pre> */
  )
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___')
  const dbExterno = await fetch(
    `https://${projectName}.${githubUser}.vercel.app/api/db`
  )
    .then(responseServer => {
      if (responseServer.ok) {
        return responseServer.json()
      }
      throw new Error('Falha em pegar os dados')
    })
    .then(respostaConvertidaEmObjeto => respostaConvertidaEmObjeto)
    .catch(err => console.log(err))
  // console.log('dbExterno', dbExterno)
  return {
    props: { dbExterno } // will be passed to the page component as props
  }
}
