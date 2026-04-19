import { inventoryShowHideHandler, printHandler } from "./handlers";
import { newProductFormHandler, productTableHandler } from "./inventory";
import { newRecordBtnHandler, recordTableHandler } from "./record";
import {
  addNewProductBtn,
  inventoryHideBtn,
  inventoryShowBtn,
  newProductForm,
  newRecordBtn,
  printBtn,
  productTable,
  recordTable,
} from "./selectors";
const listener = () => {
  inventoryShowBtn.addEventListener("click", inventoryShowHideHandler);
  inventoryHideBtn.addEventListener("click", inventoryShowHideHandler);
  printBtn.addEventListener("click", printHandler);
  addNewProductBtn.addEventListener("click", newProductFormHandler);
  newRecordBtn.addEventListener("click",newRecordBtnHandler);
  recordTable.addEventListener("click",recordTableHandler);
  productTable.addEventListener("click",productTableHandler);
};
export default listener;
