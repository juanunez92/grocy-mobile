import "./style.css";
import { startSketch, createEffect } from "./sketch";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

// Elementos principales de la aplicación
const productInput = document.getElementById("productInput");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");
const quickItems = document.querySelectorAll(".quickItem");

// Array donde almacenamos los productos
let products = [];

// Vibración nativa del móvil
async function vibratePhone(style = ImpactStyle.Light) {
  try {
    await Haptics.impact({ style: style });
  } catch (error) {
    console.log("La vibración solo funciona en dispositivo/emulador móvil");
  }
}
// Guardamos los productos en LocalStorage
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Recuperamos los productos guardados
function loadProducts() {
  const savedProducts = localStorage.getItem("products");

  if (savedProducts) {
    products = JSON.parse(savedProducts);

    // Compatibilidad por si había productos guardados como texto
    products = products.map((product) => {
      if (typeof product === "string") {
        return {
          name: product,
          bought: false,
        };
      }

      return product;
    });

    renderList();
  }
}

// Función encargada de actualizar la lista en pantalla
function renderList() {
  shoppingList.innerHTML = "";
  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.classList.add("item");

    if (index === products.length - 1) {
      li.classList.add("animate");
    }

    li.innerHTML = `
<span class="${product.bought ? "bought" : ""}" data-index="${index}">
  ${product.name}
</span>      
<button data-index="${index}">X</button>
    `;
    shoppingList.appendChild(li);
  });

  // Eventos para eliminar productos
  const deleteButtons = document.querySelectorAll(".item button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      const rect = button.getBoundingClientRect();

      createEffect(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        "red"
      );
      products.splice(index, 1);
      vibratePhone(ImpactStyle.Medium);
      saveProducts();
      renderList();
    });
  });

  // Eventos para marcar productos como comprados
  const productTexts = document.querySelectorAll(".item span");

  productTexts.forEach((text) => {
    text.addEventListener("click", () => {
      const index = text.dataset.index;

      products[index].bought = !products[index].bought;

      vibratePhone(ImpactStyle.Light);
      saveProducts();
      renderList();
    });
  });
}

// Evento para añadir nuevos productos
addButton.addEventListener("click", () => {
  const newProduct = productInput.value.trim();

  if (newProduct !== "") {
    products.push({
      name: newProduct,
      bought: false,
    });

    const rect = addButton.getBoundingClientRect();

    createEffect(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      "green"
    );
    vibratePhone(ImpactStyle.Light);
    saveProducts();
    productInput.value = "";
    renderList();
  }
});

// Eventos para los productos rápidos

quickItems.forEach((item) => {
  item.addEventListener("click", () => {
    const productName = item.textContent.trim();

    products.push({
      name: productName,
      bought: false,
    });

    const rect = item.getBoundingClientRect();

    createEffect(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      "green"
    );
    vibratePhone(ImpactStyle.Light);

    saveProducts();

    renderList();
  });
});

loadProducts();
startSketch();
