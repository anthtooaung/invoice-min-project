import {
  newProductForm,
  newProductName,
  newProductPrice,
  newProductQty,
  newProductRowTemplate,
  productSelect,
  productTable,
  recordTable,
} from "./selectors";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { productInfo } from "./states";
export const newProductFormHandler = event => {
  event.preventDefault();

  const form = new FormData(newProductForm);

  const name = form.get("new_product_name");
  const qty = form.get("new_product_qty");
  const price = form.get("new_product_price");

  let isSafe = true;

  if (!name.trim()) {
    newProductName.focus();
    isSafe = false;
  } else if (!qty.trim() || qty === "0") {
    newProductQty.focus();
    isSafe = false;
  } else if (!price.trim() || price === "0") {
    newProductPrice.focus();
    isSafe = false;
  }

  if (isSafe) {
    // productTable.append(createNewProductRole(name, price, qty));
    checkProductRole(name, price, qty);
    newProductForm.reset();
  }
};

export const checkProductRole = (newName, newPrice, newQty) => {
  const oldProduct = productInfo.find(({ name }) => name === newName);
  if (oldProduct) {
    const sumQty = updateProductInfo(oldProduct.id, "qty", newQty, "plus");
    // changeProductInfo(oldProduct.id,"qty",sumQty);
    // changeProductInfo(oldProduct.id,"price",newPrice);
    // updateProductRow(oldProduct.id, newPrice, sumQty);
    if (oldProduct.price !== newPrice) {
      updateProductInfo(oldProduct.id, "price", newPrice, "change");
      updateProductOption(oldProduct.id, oldProduct.name, newPrice, false);
    }
  } else {
    const id = uuidv4();
    productInfo.push({
      id: id,
      name: newName,
      price: parseFloat(newPrice),
      qty: parseInt(newQty),
    });
    // console.log(productInfo.at(p));
    updateProductOption(id, newName, newPrice, true);
    productTable.append(createNewProductRole(id, newName, newPrice, newQty));
  }
};

const createNewProductRole = (id, newName, newPrice, newQty) => {
  const newProductRow = newProductRowTemplate.content.cloneNode(true);
  newProductRow.querySelector(".newProductRow").id = "product-" + id;
  newProductRow.querySelector(".name").innerText = newName;
  newProductRow.querySelector(".price").innerText = newPrice;
  newProductRow.querySelector(".qty").innerText = newQty;
  return newProductRow;
};

export const updateProductInfo = (id, key, value, method) => {
  const oldValue = productInfo.find(e => e.id === id)[key];
  let total = 0;

  if (method === "plus") {
    total = parseFloat(oldValue) + parseFloat(value);
  } else if (method === "minus") {
    total = parseFloat(oldValue) - parseFloat(value);
  } else if (method === "change") {
    if (key === "price") {
      total = parseFloat(value);
    } else if (key === "qty") {
      const recordCurrentQty = recordTable.querySelector(
        `#record-${id} .qty`,
      ).innerText;
      const num = parseInt(recordCurrentQty) - parseInt(value);
      total = oldValue + num;
    }
  }
  updateProductRow(id, key, total);
  changeProductInfo(id, key, total);
  return total;
};

export const removeProductInfo = (id) = >{
  
}

export const updateProductRow = (id, key, value) => {
  const updateRow = document.querySelector(`#product-${id}`);
  updateRow.querySelector(`.${key}`).innerText = value;
  if (key === "qty" && value < 1) {
    document.getElementById(`option-${id}`).remove();
  }
};

export const inventoryRender = () => {
  productInfo.forEach(e => {
    productTable.append(createNewProductRole(e.id, e.name, e.price, e.qty));
    updateProductOption(e.id, e.name, e.price, true);
  });
};

const updateProductOption = (id, name, price, isNew) => {
  if (isNew) {
    const selection = new Option(`${name} - ${price} mmk`, id);
    selection.id = "option-" + id;
    productSelect.append(selection);
  } else {
    document.getElementById(`option-${id}`).innerText =
      `${name} - ${price} mmk`;
  }
};

export const changeProductInfo = (id, key, value) => {
  const product = productInfo.find(e => e.id === id);
  if (!product) return;

  product[key] = value;
};

export const productTableHandler = event => {
  if (event.target.classList.contains("removeBtn")) {
    const row = event.target.closest(".newProductRow");
    const name = row.querySelector(".name").innerText;
    Swal.fire({
      title: `Do you really want to delete '${name}' product?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
    }).then(result => {
      if (result.isConfirmed) {
        removeRecordRow(row);
      }
    });
  }
};

const removeRecordRow = row => {

  row.remove();
};
