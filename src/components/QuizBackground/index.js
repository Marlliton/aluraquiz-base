import styled from 'styled-components'

const QuizBackground = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
  width: 100%;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-color: ${({ theme }) => theme.colors.mainBg};
  
`

export default QuizBackground
