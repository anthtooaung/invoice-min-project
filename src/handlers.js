import { inventorySection } from "./selectors"

export const inventoryShowHideHandler = () =>{
    inventorySection.classList.toggle("translate-x-full");
}

export const printHandler = () =>{
    console.log("print handler");
}