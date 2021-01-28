import React, { useState } from 'react'
import styled from 'styled-components'
import QuizBackground from '../src/components/QuizBackground'
import db from '../db.json'
import Widget from '../src/components/Widgets'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'
import QuizLogo from '../src/components/QuizLogo'
import { useRouter } from 'next/router'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')
  console.log(name, setName)

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={function (event) {
                event.preventDefault()
                router.push(`/quiz?name=${name}`)
              }}
            >
              <input
                placeholder="Diz ai seu nome"
                onChange={event => {
                  // const value = event.target.value
                  // console.log(value)
                  setName(event.target.value)
                }}
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <p>lorem ipsum dolor sit amet...</p>
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/Marlliton/aluraquiz-base" />
    </QuizBackground>
  )
}
