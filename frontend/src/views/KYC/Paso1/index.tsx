import React from 'react'
import { Text, Box } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyledText30 = styled(Text)`
  margin-bottom: 30px;
`
const StyledBox = styled(Box)`
  margin-bottom: 30px;
`

const Paso1 = () => {

    return (
        <>
            <StyledText30 color="#333" fontSize="35px" bold>
                Regístrese en 4 sencillos pasos.
            </StyledText30>
            <Text color="#333" fontSize="25px">
                Por seguridad, necesitamos validar su identidad (KYC) e información
            </Text>
            <StyledText30 color="#333" fontSize="25px">
                financiera (AML). Solo te llevará unos minutos.
            </StyledText30>
            <StyledBox ml="48px">
                <Text color="#333" fontSize="30px">
                    PASO 1
                </Text>
                <Text color="rgb(235,175,91)" fontSize="30px">
                    Datos Personales
                </Text>
                <Text color="rgb(131,126,132)" fontSize="25px">
                    Completa tu información personal básica, incluido el domicilio donde resides.
                </Text>
            </StyledBox>

            <StyledBox ml="48px">
                <Text color="#333" fontSize="30px">
                    PASO 2
                </Text>
                <Text color="rgb(235,175,91)" fontSize="30px">
                    Datos Financieros
                </Text>
                <Text color="rgb(131,126,132)" fontSize="25px">
                    Incluye información sobre tu renta, origen de fondos y demás aspectos financieros.
                </Text>
            </StyledBox>

            <StyledBox ml="48px">
                <Text color="#333" fontSize="30px">
                    PASO 3
                </Text>
                <Text color="rgb(235,175,91)" fontSize="30px">
                    Alta como Cliente Profesional
                </Text>
                <Text color="rgb(131,126,132)" fontSize="25px">
                    Opcional. Si no eres inversor profesional debes saltar este paso.
                </Text>
            </StyledBox>

            <StyledBox ml="48px">
                <Text color="#333" fontSize="30px">
                    PASO 4
                </Text>
                <Text color="rgb(235,175,91)" fontSize="30px">
                    Prueba de Identidad
                </Text>
                <Text color="rgb(131,126,132)" fontSize="25px">
                    Sube tu DNI o Pasaporte (anverso y reverso) y selfie para que comprobemos tu identidad.
                </Text>
            </StyledBox>
        </>
    )
}

export default Paso1
