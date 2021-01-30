/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import QuizBackground from '../src/components/QuizBackground'
import db from '../db.json'
import Widget from '../src/components/Widgets'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Button from '../src/components/Button'
import AlternativesForm from '../src/components/AlternativesForm'
import LoadingWidget from '../src/components/LoadingWidget'

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Tela de Resultados</Widget.Header>
      <Widget.Content>
        <p>
          Você acertou{' '}
          {results.reduce((currentSun, resultCurrent) => {
            const isHit = resultCurrent === true
            if (isHit) {
              return currentSun + 1
            }
            return currentSun
          }, 0)}{' '}
          Perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              #{index < 9 && 0}
              {index + 1} Resultado: {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResults
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined)
  const [isQuestionSubmit, setIsQuestionSubmit] = useState(false)
  const questionId = `question_${questionIndex}`
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined
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

        <AlternativesForm
          onSubmit={event => {
            event.preventDefault()
            setIsQuestionSubmit(true)
            setTimeout(() => {
              addResults(isCorrect)
              setIsQuestionSubmit(false)
              setSelectedAlternative(undefined)
              onSubmit()
            }, 2000)
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
            const isSelected = selectedAlternative === alternativeIndex

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmit && alternativeStatus}
              >
                <input
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            )
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
        {isQuestionSubmit && isCorrect && <p>Você Acertou!</p>}
        {isQuestionSubmit && !isCorrect && <p>Você Errou!</p>}
        {/* {isCorrect ? <p>Você Acertou!</p> : <p>Você Errou!</p>} */}
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
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [results, setResults] = useState([])
  const totalQuestions = db.questions.length
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex]

  function addResults(result) {
    setResults([...results, result])
  }

  useEffect(() => {
    // Aqui faria um fetch se o db estivesse em um servidor
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 2 * 1000)
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
            addResults={addResults}
          />
        )}
        {screenState === 'LOADING' && <LoadingWidget />}
        {screenState === 'RESULT' && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  )
}
