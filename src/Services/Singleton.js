let instance = null;
class Singleton {
  constructor(){
    if(!instance){
      instance = this;
    }
    return instance;
  }
}

export default Singleton;
