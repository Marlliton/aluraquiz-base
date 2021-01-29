/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import QuizBackground from '../src/components/QuizBackground'
import db from '../db.json'
import Widget from '../src/components/Widgets'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Button from '../src/components/Button'

export function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>[Desafio do loading]</Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit
}) {
  const questionId = `question_${questionIndex}`
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta de ${questionIndex + 1} a ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover'
        }}
        src={question.image}
      />
      <Widget.Content>
        <h1>{question.title}</h1>
        <p>{question.description}</p>

        <form
          onSubmit={event => {
            event.preventDefault()
            onSubmit()
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`
            return (
              <Widget.Topic as="label" key={alternativeId}>
                <input type="radio" name={questionId} />
                {alternative}
              </Widget.Topic>
            )
          })}
          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const totalQuestions = db.questions.length
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex]

  useEffect(() => {
    // Aqui faria um fetch se o db estivesse em um servidor
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
    // nasce === didMount
  }, [])

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === 'QUIZ' && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
          />
        )}
        {screenState === 'LOADING' && <LoadingWidget />}
        {screenState === 'RESULT' && (
          <Widget>
            <Widget.Header>Parabéns você acertou as questões</Widget.Header>
            <Widget.Content>x y z</Widget.Content>
          </Widget>
        )}
      </QuizContainer>
    </QuizBackground>
  )
}
