class Validator {

  constructor() {}

  static email(value, msg, regExp) {
    let _re = regExp || /^([\w\-]{2,}\.?)+@([\w\-]{2,}\.?)+\.[a-z]{2,}$/;
    return _re.test(value)
           ? null : { error: msg || 'Wrong email format' };
  }

  static minLength(value, min, msg) {
    let _msg = msg || `Digit a minimun of ${min} characters`;
    if(value){
      return value.length >= min
      ? null
      : { error: _msg }
    }
    return { error: 'Empty field' };
  }

  static custom(callback, value){
    let result = callback(value);
    return result === true ? null : { error : result };
  }

}

export default Validator;
