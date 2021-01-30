import React, { useState } from 'react'
import { useRouter } from 'next/router'
import QuizBackground from '../src/components/QuizBackground'
import db from '../db.json'
import Widget from '../src/components/Widgets'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'
import QuizLogo from '../src/components/QuizLogo'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form
              onSubmit={event => {
                event.preventDefault()
                router.push(`/quiz?name=${name}`)
              }}
            >
              <Input
                placeholder="Diz ai seu nome pra jogar : )"
                onChange={event => {
                  // const value = event.target.value
                  // console.log(value)
                  setName(event.target.value)
                }}
                name="Input"
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera!</h1>

            <ul>
              {db.external.map((link, index) => {
                const [projectName, githubName] = link
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('vercel.app', '')
                  .split('.')

                return (
                  <li key={index}>
                    <Widget.Topic
                      href={`/quiz/${projectName}___${githubName}`}
                    >{`${projectName}/${githubName}`}</Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/Marlliton/aluraquiz-base" />
    </QuizBackground>
  )
}
