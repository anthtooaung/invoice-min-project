import {
  checkProductRole,
  updateProductInfo,
  updateProductRow,
} from "./inventory";
import {
  newRecordProductRowTemplate,
  productSelect,
  recordProductForm,
  recordProductNetTotalPrice,
  recordProductTax,
  recordQty,
  recordTable,
} from "./selectors";
import { productInfo } from "./states";
import Swal from "sweetalert2";
export const newRecordBtnHandler = event => {
  event.preventDefault();
  const formData = new FormData(recordProductForm);
  const selectedItem = formData.get("product_select");
  const qty = formData.get("record_qty");

  let isSafe = true;

  if (selectedItem === "0") {
    productSelect.focus();
    isSafe = false;
  } else if (!qty.trim() || qty === "0") {
    recordQty.focus();
    isSafe = false;
  }

  if (isSafe) {
    checkRecordProductRole(selectedItem, qty);
    recordProductForm.reset();
  }
};

const checkRecordProductRole = (id, qty) => {
  const product = productInfo.find(p => p.id === id);
  const rowId = "record-" + product.id;
  const recordRow = document.getElementById(`${rowId}`);
  if (recordRow) {

    Swal.fire({
      title: "What do you want the new quantity?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add",
      denyButtonText: `change`,
    }).then(result => {

      let total = 0;

      if (result.isConfirmed) {

        const num = row.querySelector(".qty").innerText;
        total = parseInt(num) + parseInt(qty);
        updateProductInfo(row.id.split("-")[1], "qty", qty, "minus");

      } else if (result.isDenied) {

        updateProductInfo(row.id.split("-")[1], "qty", qty, "change");
        total = parseInt(qty);
      }

      updateRecordRow(row, total);
    });

  } else {
    updateProductInfo(id, "qty", qty, "minus");
    recordTable.append(
      createNewRecordRow(rowId, product.name, product.price, qty),
    );
  }
};

const updateRecordRow = (row, qty) => {
  const price = row.querySelector(".price").innerText;
  row.querySelector(".qty").innerText = qty;
  row.querySelector(".totalPrice").innerText =
    parseFloat(qty) * parseFloat(price);
};

const createNewRecordRow = (id, name, price, qty) => {
  const copy = newRecordProductRowTemplate.content.cloneNode(true);
  copy.querySelector(".newRecordRow").id = id;
  copy.querySelector(".name").innerText = name;
  copy.querySelector(".price").innerText = price;
  copy.querySelector(".qty").innerText = qty;
  copy.querySelector(".totalPrice").innerText =
    parseInt(qty) * parseFloat(price);
  return copy;
};

const calculateTax = totalPrice => {
  const tax = 5;
  const taxPrice = parseFloat((parseInt(totalPrice) * 5) / 100);
  return taxPrice;
};

const calculateRecordCostTotal = () => {
  let total = 0;
  recordTable.querySelectorAll(".totalPrice").forEach(e => {
    total += parseFloat(e.innerText);
  });
  return total;
};

export const recordTableObserver = () => {
  const observerOption = {
    childList: true,
    subtree: true,
  };

  const updateTotal = () => {
    const total = calculateRecordCostTotal();
    const tax = calculateTax(total);
    recordProductTotalPrice.innerText = total;
    recordProductTax.innerText = tax;
    recordProductNetTotalPrice.innerText = total + tax;
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordTable, observerOption);
};


export const recordTableHandler = (event) =>{
  console.log(
  event.target.closest(".newRecordRow")
  );
}