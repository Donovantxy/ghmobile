const appStyles = {
  inputText: {
    height: 25,
    flexGrow: 1,
    // borderColor: '#c00',
    // borderWidth: 1,
    borderRadius: 5,
  },
  inputError: {
    backgroundColor: '#fee',
    borderColor: '#faa'
  },
  inputSuccess: {
    backgroundColor: '#efe',
    borderColor: '#afa',
  },
  submitLogin: {
    fontSize: 18
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

export default appStyles;
