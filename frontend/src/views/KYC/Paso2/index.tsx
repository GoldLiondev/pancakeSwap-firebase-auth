import React from 'react'
import { Text, Input } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Switch from '@material-ui/core/Switch';

const StyledText30 = styled(Text)`
  margin-bottom: 30px;
`
const Row = styled.div`
  width: 70%;
  margin-top:10px;
  margin-bottom:15px;
  @media screen and (max-width: 420px) {
    width: 100%;
} ;
`
const TextDiv = styled.div`
  justify-content: left;
  align-items: center;
  display: flex;
  margin-bottom:5px;
`
const Filter = styled.label`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  margin-right: 16px;
`

const Paso2 = ({
    name,
    apellido,
    birthDay,
    phone,
    country,
    town,
    postal,
    direction,
    nationality,
    UScitizen,
    citizen,
    setName,
    setApellido,
    setBirthday,
    setPhone,
    setCountry,
    setTown,
    setPostal,
    setDirection,
    setNationality,
    setUScitizen,
    setCitizen,
}) => {
    const { t } = useTranslation();

    const handleChangePhoneNumber = (num) => {
        setPhone(num);
    }

    return (
        <>
            <StyledText30 color="#333" fontSize="35px" bold>
                Información Personal
            </StyledText30>
            <Text color="#333" fontSize="25px">
                Completa tu información personal básica, incluido el domicilio donde resides.
            </Text>
            <div>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Nombre:</Text>
                    </TextDiv>
                    <Input
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Apellido:</Text>
                    </TextDiv>
                    <Input
                        value={apellido}
                        onChange={(e) => {
                            setApellido(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Fecha de Nacimiento:</Text>
                    </TextDiv>
                    <Input
                        type="date"
                        value={birthDay}
                        onChange={(e) => {
                            setBirthday(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Teléfono:</Text>
                    </TextDiv>
                    <PhoneInput
                        country='us'
                        value={phone}
                        onChange={handleChangePhoneNumber}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">País de Residencia:</Text>
                    </TextDiv>
                    <Input
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Ciudad:</Text>
                    </TextDiv>
                    <Input
                        value={town}
                        onChange={(e) => {
                            setTown(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Código Postal:</Text>
                    </TextDiv>
                    <Input
                        type="number"
                        value={postal}
                        onChange={(e) => {
                            setPostal(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Dirección:</Text>
                    </TextDiv>
                    <Input
                        value={direction}
                        onChange={(e) => {
                            setDirection(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <TextDiv>
                        <Text fontSize="20px">Nacionalidad:</Text>
                    </TextDiv>
                    <Input
                        value={nationality}
                        onChange={(e) => {
                            setNationality(e.target.value)
                        }}
                    />
                </Row>
                <Row>
                    <Filter>
                        <Switch
                            checked={UScitizen}
                            onChange={() => { setUScitizen(!UScitizen) }}
                            name="UScitizen"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        <Text ml="4px">{t('Eres ciudadano de EEUU?')}</Text>
                    </Filter>
                </Row>
                <Row>
                    <Filter>
                        <Switch
                            checked={citizen}
                            onChange={() => { setCitizen(!citizen) }}
                            name="citizen"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        <Text ml="4px">{t('Persona politicamente expuesta?')}</Text>
                    </Filter>
                </Row>
            </div>
        </>
    )
}

export default Paso2
