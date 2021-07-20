import React from 'react'
import { Text, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'
import DrogDrag from './dropDrag';
import VectorHand from '../pngs/vectorHand.png'
import VectorPassport from '../pngs/vectorPassport.png'
import './style.css'

const StyledText30 = styled(Text)`
  margin-bottom: 30px;
`
const StyledImage = styled(Image)`
//   width:245px;
//   height:245px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 15px;
  margin-bottom: 50px;
  align-items: center;
  @media screen and (max-width: 420px) {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  } ;
`
const Paso5 = ({
    setVectorHand,
    setVectorPassport,
}) => {

    return (
        <>
            <StyledText30 color="#333" fontSize="35px" bold>
                Sube tu DNI y Selfie
            </StyledText30>
            <Text color="#333" fontSize="25px">
                Sube tu DNI o Pasaporte (anverso y reverso) y selfie, para que
            </Text>
            <StyledText30 color="#333" fontSize="25px">
                comprobemos tu Identidad.
            </StyledText30>
            <Row>
                <DrogDrag
                    handleChange={(val) => {
                        setVectorPassport(val);
                    }}
                />
                <StyledImage src={VectorPassport} alt="VectorPassport" width={245} height={245} />
            </Row>
            <Row>
                <DrogDrag
                    handleChange={(val) => {
                        setVectorHand(val);
                    }}
                />
                <StyledImage src={VectorHand} alt="VectorHand" width={245} height={245} />
            </Row>
        </>
    )
}

export default Paso5
