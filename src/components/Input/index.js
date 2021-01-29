import React from 'react'
import styled from 'styled-components'

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  outline: 0;
  margin-bottom: 25px;
  margin-top: 25px;
`

export default function Input(props) {
  return (
    <div>
      <InputBase {...props}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
      </InputBase>
    </div>
  )
}
