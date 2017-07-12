import { $colors, $vars } from './style.vars';

const $jss = {
  mainContainer: {
    padding: 10,
  },

  inputText: {
    height: 25,
    flexGrow: 1,
    borderRadius: 5,
  },

  hidden: {
    display: 'none',
  },

  inputError: {
    backgroundColor: $colors.greenBackgroundNoValid,
    borderColor: $colors.greenBorderNoValid,
    shadowColor: $colors.greenBorderNoValid,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: $vars.shadowOpacity,
    shadowRadius: $vars.shadowRadius,
  },

  inputSuccess: {
    backgroundColor: $colors.gohenryGreenLighter,
    borderColor: $colors.gohenryGreenDarker,
    shadowColor: $colors.gohenryGreenDarker,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: $vars.shadowOpacity,
    shadowRadius: $vars.shadowRadius,
  },

  submitLogin: {
    fontSize: 18
  },

  errorMessage: {
    fontSize: 11,
    color: $colors.redError,
    marginLeft:1,
    marginTop: 2
  },

  button: (backgroundColor, borderColor) => {
    return {
      borderWidth: 1,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderRadius: 3,
      alignSelf: 'stretch',
      padding: 6,
      marginTop: 15,
    };
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

  flexContainer: (direction, justifyContent) => {
    return {
      flex: 1,
      flexDirection: direction || 'column',
      justifyContent: justifyContent || 'center',
    };
  },

}

export { $jss };
