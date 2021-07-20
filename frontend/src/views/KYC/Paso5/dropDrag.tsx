import React, { useEffect } from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import './style.css'

const useStyles = makeStyles(() => ({
  dropBox: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // "@media (max-width: 1023px)": { maxWidth: "100%" },
  },
  dropSection: {
    backgroundColor: '#f5f5f5',
    height: 245,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbsContainer: {
    width: '100%',
    height: '100%',
  },
  thumbInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 10,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  HighlightOffIcon: {
    position: 'absolute',
    top: '10%',
    left: '90%',
    cursor: 'pointer',
  },
}))

const DrogDrag = ({ handleChange }) => {
  const classes = useStyles()
  const [files, setFiles] = React.useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const thumb = files.map((file) => (
    <div className={classes.thumbInner} key={file.name}>
      <img src={file.preview} className={classes.thumbImg} alt="" />
      <HighlightOffIcon
        className={classes.HighlightOffIcon}
        onClick={() => {
          setFiles([])
        }}
      />
    </div>
  ))

  useEffect(() => {
    handleChange(files.map((file) => file))
  }, [files, handleChange])

  return (
    <>
      <section className={classes.dropSection}>
        <div
          {...getRootProps({ className: 'dropzone' })}
          className={classes.dropBox}
          style={thumb.length === 0 ? { display: 'flex' } : { display: 'none' }}
        >
          <input {...getInputProps()} />
          <p>Drag & drop file here, or click to select file</p>
        </div>
        <aside
          className={classes.thumbsContainer}
          style={thumb.length !== 0 ? { display: 'initial' } : { display: 'none' }}
        >
          {thumb}
        </aside>
      </section>
    </>
  )
}

export default DrogDrag
