const jss = {
  inputText: {
    height: 25,
    flexGrow: 1,
    borderRadius: 5,
  },
  inputError: {
    backgroundColor: '#f99',
    borderColor: '#faa'
  },
  inputSuccess: {
    backgroundColor: '#efe',
    borderColor: '#afa',
  },
  submitLogin: {
    fontSize: 18
  },
  button: {
    borderWidth: 1,
    backgroundColor: '#25b5b8',
    borderColor: '#259598',
    borderRadius: 3,
    alignSelf: 'stretch',
    padding: 6
  },
  errorField: (errMsg) => {
    return errMsg
      ? {
          color:'#cc0000',
          fontSize: 12,
          marginTop: 5,
          marginBottom: 0,
        }
      : { display: 'none' }
  },
}

export default jss;
