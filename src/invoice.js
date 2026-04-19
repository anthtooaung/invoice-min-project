import initialRender from "./initialRender";import listener from "./listener";
import observer from "./observer";
class Invoice {
  init() {
    console.log("start Invoice");
    listener();
    initialRender();
    observer();
  }
}

export default Invoice;
