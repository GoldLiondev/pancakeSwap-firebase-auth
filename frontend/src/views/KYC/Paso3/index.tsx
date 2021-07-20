import React from 'react'
import { Text, Radio } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const StyledText30 = styled(Text)`
  margin-bottom: 30px;
`
const Filter = styled.label`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  margin-right: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
`
const FilterContainer = styled.div`
  display: grid;
`
const FilterSubContainer = styled.div`
  display: grid;
  margin-bottom:20px;
`
const StyledRadio = styled(Radio)`
  margin-right:20px;
`
const Paso3 = ({
    radio1,
    setRadio1,
    radio2,
    setRadio2,
    radio3,
    setRadio3,
    radio4,
    setRadio4,
    radio5,
    setRadio5,
    radio6,
    setRadio6,
}) => {
    const { t } = useTranslation();

    const handleChange = (key, evt) => {
        const { value } = evt.target;
        switch (key) {
            case "radio1":
                setRadio1(value);
                break;
            case "radio2":
                setRadio2(value);
                break;
            case "radio3":
                setRadio3(value);
                break;
            case "radio4":
                setRadio4(value);
                break;
            case "radio5":
                setRadio5(value);
                break;
            case "radio6":
                setRadio6(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <StyledText30 color="#333" fontSize="35px" bold>
                Información Financiera
            </StyledText30>
            <Text color="#333" fontSize="25px">
                Incluye Información tus conocimientos en la materia, renta,origen
            </Text>
            <StyledText30 color="#333" fontSize="25px">
                de fondos y demas aspectos financleros.
            </StyledText30>
            <FilterSubContainer>
                <Text color="#333" fontSize="25px">
                    ¿Has Invertido en empresas no cotizadas gestionadas por ti a par otras
                </Text>
                <FilterContainer>
                    <Filter>
                        <StyledRadio name="radio1" value="0" onChange={(e) => { handleChange("radio1", e) }} checked={radio1 === "0"} />
                        <Text ml="4px">{t('SI')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio1" value="1" onChange={(e) => { handleChange("radio1", e) }} checked={radio1 === "1"} />
                        <Text ml="4px">{t('NO')}</Text>
                    </Filter>
                </FilterContainer>
                <Text color="#ff0000" fontSize="25px">
                    Por favor ellge una opoion
                </Text>
            </FilterSubContainer>
            <FilterSubContainer>
                <Text color="#333" fontSize="25px">
                    ¿Conoces lo que es un Security Token y los riesgos que la inverslon en los mismos conlieva?
                </Text>
                <FilterContainer>
                    <Filter>
                        <StyledRadio name="radio2" value="0" onChange={(e) => { handleChange("radio2", e) }} checked={radio2 === "0"} />
                        <Text ml="4px">{t('SI')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio2" value="1" onChange={(e) => { handleChange("radio2", e) }} checked={radio2 === "1"} />
                        <Text ml="4px">{t('NO')}</Text>
                    </Filter>
                </FilterContainer>
                <Text color="#ff0000" fontSize="25px">
                    Por favor ellge una opoion
                </Text>
            </FilterSubContainer>
            <FilterSubContainer>
                <Text color="#333" fontSize="25px">
                    ¿Sabes que Invirtiendo en empresas no cotizadas puedes perder hasta el 100% de tu Inversion?
                </Text>
                <FilterContainer>
                    <Filter>
                        <StyledRadio name="radio3" value="0" onChange={(e) => { handleChange("radio3", e) }} checked={radio3 === "0"} />
                        <Text ml="4px">{t('SI')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio3" value="1" onChange={(e) => { handleChange("radio3", e) }} checked={radio3 === "1"} />
                        <Text ml="4px">{t('NO')}</Text>
                    </Filter>
                </FilterContainer>
                <Text color="#ff0000" fontSize="25px">
                    Por favor ellge una opoion
                </Text>
            </FilterSubContainer>
            <FilterSubContainer>
                <Text color="#333" fontSize="25px">
                    ¿Que porcentaje de tu patrimonio quieres Invertir en este tipo de productos?
                </Text>
                <FilterContainer>
                    <Filter>
                        <StyledRadio name="radio4" value="0" onChange={(e) => { handleChange("radio4", e) }} checked={radio4 === "0"} />
                        <Text ml="4px">{t('Menos del 25%')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio4" value="1" onChange={(e) => { handleChange("radio4", e) }} checked={radio4 === "1"} />
                        <Text ml="4px">{t('Entre el 25 y 50%')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio4" value="2" onChange={(e) => { handleChange("radio4", e) }} checked={radio4 === "2"} />
                        <Text ml="4px">{t('Entre el 50 y 75%')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio4" value="3" onChange={(e) => { handleChange("radio4", e) }} checked={radio4 === "3"} />
                        <Text ml="4px">{t('Más del 75%')}</Text>
                    </Filter>
                </FilterContainer>
                <Text color="#ff0000" fontSize="25px">
                    Por favor ellge una opoion
                </Text>
            </FilterSubContainer>
            <FilterSubContainer>
                <Text color="#333" fontSize="25px">
                    ¿CuaI es el origen de la mayor parte de tus Ingresos periódicos?
                </Text>
                <FilterContainer>
                    <Filter>
                        <StyledRadio name="radio5" value="0" onChange={(e) => { handleChange("radio5", e) }} checked={radio5 === "0"} />
                        <Text ml="4px">{t('No tengo Ingresons periódicos')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio5" value="1" onChange={(e) => { handleChange("radio5", e) }} checked={radio5 === "1"} />
                        <Text ml="4px">{t('Prestación por Jubilación o Incapacidad')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio5" value="2" onChange={(e) => { handleChange("radio5", e) }} checked={radio5 === "2"} />
                        <Text ml="4px">{t('Actividad laboral')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio5" value="3" onChange={(e) => { handleChange("radio5", e) }} checked={radio5 === "3"} />
                        <Text ml="4px">{t('Rentas de blenes Inmuebles en propiedad')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio5" value="4" onChange={(e) => { handleChange("radio5", e) }} checked={radio5 === "4"} />
                        <Text ml="4px">{t('Rendimientos de Inversi0s financieras')}</Text>
                    </Filter>
                </FilterContainer>
                <Text color="#ff0000" fontSize="25px">
                    Por favor ellge una opoion
                </Text>
            </FilterSubContainer>
            <FilterSubContainer>
                <Text color="#333" fontSize="25px">
                    ¿CuaI es el origen del capital que quieres Invertir o reInvertir en este tlpo de productos?
                </Text>
                <FilterContainer>
                    <Filter>
                        <StyledRadio name="radio6" value="0" onChange={(e) => { handleChange("radio6", e) }} checked={radio6 === "0"} />
                        <Text ml="4px">{t('Recolocar Inversi0s flnancieras existentes')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio6" value="1" onChange={(e) => { handleChange("radio6", e) }} checked={radio6 === "1"} />
                        <Text ml="4px">{t('Herencia o donación')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio6" value="2" onChange={(e) => { handleChange("radio6", e) }} checked={radio6 === "2"} />
                        <Text ml="4px">{t('Ingresos por Negoclos')}</Text>
                    </Filter>
                    <Filter>
                        <StyledRadio name="radio6" value="3" onChange={(e) => { handleChange("radio6", e) }} checked={radio6 === "3"} />
                        <Text ml="4px">{t('Otro origen')}</Text>
                    </Filter>
                </FilterContainer>
                <Text color="#ff0000" fontSize="25px">
                    Por favor ellge una opoion
                </Text>
            </FilterSubContainer>
        </>
    )
}

export default Paso3
