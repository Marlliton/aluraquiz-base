import React from 'react'
import styled from 'styled-components'

const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  width: 100%;
  padding: 10px 16px;
  font-size: 14;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: 0.3s;
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`

export default function Button(props) {
  return <ButtonBase {...props} />
}
