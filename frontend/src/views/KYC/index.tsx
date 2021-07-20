import React, { useEffect } from 'react'
import Page from 'components/layout/Page'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import StepConnector from '@material-ui/core/StepConnector';
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import FormData from 'form-data';
import {
  useKYC,
  useSetKYC,
  useDispatchSetKYC
} from 'state/hooks'
import { fileUpload, saveKYC } from 'action/kyc';
import useToast from 'hooks/useToast'
import Paso1 from './Paso1';
import Paso2 from './Paso2';
import Paso3 from './Paso3';
import Paso4 from './Paso4';
import Paso5 from './Paso5';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

QontoStepIcon.defaultProps = {
  active: false,
  completed: false
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons = {
    1: <InfoIcon />,
    2: <PersonIcon />,
    3: <MonetizationOnIcon />,
    4: <AssignmentIcon />,
    5: <AssignmentTurnedInIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

ColorlibStepIcon.defaultProps = {
  active: false,
  completed: false,
  icon: null
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  Stepper: {
    backgroundColor: '#faf9fa'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['one', 'two', 'three', 'four', 'five'];
}

const KYC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { toastWarning, toastSuccess } = useToast()
  const email = localStorage.getItem("email");
  useSetKYC(email)
  const { kycData } = useKYC()
  // state variables for paso2
  const [name, setName] = React.useState(kycData.name);
  const [apellido, setApellido] = React.useState(kycData.surname);
  const [birthDay, setBirthday] = React.useState(kycData.birthDay);
  const [phone, setPhone] = React.useState(kycData.phone);
  const [country, setCountry] = React.useState(kycData.country)
  const [town, setTown] = React.useState(kycData.town)
  const [postal, setPostal] = React.useState(kycData.postal)
  const [direction, setDirection] = React.useState(kycData.direction)
  const [nationality, setNationality] = React.useState(kycData.nationality)
  const [UScitizen, setUScitizen] = React.useState(kycData.usperson)
  const [citizen, setCitizen] = React.useState(kycData.exposedperson)
  // state variables for paso3
  const [radio1, setRadio1] = React.useState(kycData.radio1);
  const [radio2, setRadio2] = React.useState(kycData.radio2);
  const [radio3, setRadio3] = React.useState(kycData.radio3);
  const [radio4, setRadio4] = React.useState(kycData.radio4);
  const [radio5, setRadio5] = React.useState(kycData.radio5);
  const [radio6, setRadio6] = React.useState(kycData.radio6);
  // state variable for paso4
  const [professionalcustomer, setProfessionalcustomer] = React.useState(kycData.professionalcustomer);
  // state variable for paso5
  const [Hand, setVectorHand] = React.useState("");
  const [Passport, setVectorPassport] = React.useState("");

  useEffect(() => {
    setName(kycData.name);
    setApellido(kycData.surname);
    setBirthday(kycData.birthDay);
    setPhone(kycData.phone);
    setCountry(kycData.country);
    setTown(kycData.town);
    setPostal(kycData.postal);
    setDirection(kycData.direction);
    setNationality(kycData.nationality);
    setUScitizen(kycData.usperson);
    setCitizen(kycData.exposedperson);
    setRadio1(kycData.radio1);
    setRadio2(kycData.radio2);
    setRadio3(kycData.radio3);
    setRadio4(kycData.radio4);
    setRadio5(kycData.radio5);
    setRadio6(kycData.radio6);
    setProfessionalcustomer(kycData.professionalcustomer);
  }, [kycData])

  const handleNext = () => {
    if (activeStep === 4) {
      setActiveStep(0);
      const data = {
        email,
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
        radio1,
        radio2,
        radio3,
        radio4,
        radio5,
        radio6,
        professionalcustomer,
        Hand,
        Passport
      }

      saveKYC(data).then((result) => {
        console.log('result--->', result)
      })

      // const Handfiledata = new FormData();
      // Handfiledata.append('image', Hand[0]);
      // Handfiledata.append('name', 'puypassport');
      // console.log(Handfiledata);

      // const config = {
      //   'method': 'post',
      //   'url': 'http://localhost:3200/upload',
      //   headers: {
      //     ...Handfiledata.getHeaders()
      //   },
      //   'data': Handfiledata
      // };

      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

    }
    else
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Paso1 />;
      case 1:
        return <Paso2
          name={name}
          apellido={apellido}
          birthDay={birthDay}
          phone={phone}
          country={country}
          town={town}
          postal={postal}
          direction={direction}
          nationality={nationality}
          UScitizen={UScitizen}
          citizen={citizen}
          setName={setName}
          setApellido={setApellido}
          setBirthday={setBirthday}
          setPhone={setPhone}
          setCountry={setCountry}
          setTown={setTown}
          setPostal={setPostal}
          setDirection={setDirection}
          setNationality={setNationality}
          setUScitizen={setUScitizen}
          setCitizen={setCitizen}
        />;
      case 2:
        return <Paso3
          radio1={radio1}
          setRadio1={setRadio1}
          radio2={radio2}
          setRadio2={setRadio2}
          radio3={radio3}
          setRadio3={setRadio3}
          radio4={radio4}
          setRadio4={setRadio4}
          radio5={radio5}
          setRadio5={setRadio5}
          radio6={radio6}
          setRadio6={setRadio6}
        />;
      case 3:
        return <Paso4
          professionalcustomer={professionalcustomer}
          setProfessionalcustomer={setProfessionalcustomer}
        />;
      case 4:
        return <Paso5
          setVectorHand={setVectorHand}
          setVectorPassport={setVectorPassport}
        />;
      default:
        return 'Unknown step';
    }
  }

  return (
    <Page>
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} className={classes.Stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{ }</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button scale="md" variant="danger" onClick={handleReset} className={classes.button}>
                {t('Reset')}
              </Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>{getStepContent(activeStep)}</div>
              <div>
                <Button scale="md" variant="danger" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  {t('Back')}
                </Button>
                <Button scale="md" variant="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? t('Finish') : t('Next')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

export default KYC
