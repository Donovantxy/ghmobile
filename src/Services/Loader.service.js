import Singleton from './Singleton';
import Rx from 'rxjs/Rx';

class LoaderService extends Singleton{

  constructor(){
    super();
    this.subject = new Rx.Subject();
  }

  emitShowLoader(show){
    this.subject.next(!!show);
  }

  loaderListener(){
    return this.subject;
  }

}

export {LoaderService};
