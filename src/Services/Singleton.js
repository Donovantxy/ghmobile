let __instance = [];
class Singleton {
  constructor(){
    if( !__instance[this.constructor.name] ){
       __instance[this.constructor.name] = this;
     }
    return __instance[this.constructor.name];
  }
}

export default Singleton;
