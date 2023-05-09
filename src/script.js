const checkoutItems = document.querySelectorAll(".item");
const totalPrice = document.querySelector(".total-price");
const shippingPrice = 19;

let totalP = Number(totalPrice.innerText.replace(/[$,]+/g, ""));
let items = [];

checkoutItems.forEach((item) => {
  const itemData = {
    pic: item.querySelector(".pic"),
    name: item.querySelector("h3"),
    discountPrice: item.querySelector(".price-discount"),
    originalPrice: item.querySelector(".price-original"),
    minusBtn: item.querySelector(".btn-minus"),
    plusBtn: item.querySelector(".btn-plus"),
    quantity: item.querySelector(".quantity p"),
    price: 0,
    original: 0,
  };

  itemData.price = Number(
    itemData.discountPrice.innerText.replace(/[$,]+/g, "")
  );
  itemData.original = Number(
    itemData.originalPrice.innerText.replace(/[$,]+/g, "")
  );
  itemData.count = Number(itemData.quantity.innerText);

  const itemTotal = itemData.price * itemData.count;
  totalP += itemTotal;
  items.push(itemData);

  itemData.minusBtn.addEventListener("click", function () {
    itemData.count--;
    if (itemData.count <= 0) {
      item.remove();
    } else {
      itemData.quantity.innerText = itemData.count;
      updateItem(itemData);
      updateTotal();
    }
  });

  itemData.plusBtn.addEventListener("click", function () {
    itemData.count++;
    itemData.quantity.innerText = itemData.count;
    updateItem(itemData);
    updateTotal();
  });
});

function updateItem(itemData) {
  const itemTotal = itemData.price * itemData.count;

  itemData.discountPrice.innerText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(itemTotal);

  const origTotal = itemData.original * itemData.count;
  itemData.originalPrice.innerText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(origTotal);
}

function updateTotal() {
  let total = 0;
  let shipping = 0;
  let itemCount = items.length;

  // Check if cart is empty
  if (itemCount === 0) {
    shipping = 0;
    total = 0;
  } else {
    // Calculate total and shipping
    shipping = 19;
    items.forEach((itemData) => {
      const count = itemData.count;
      const price = itemData.price;
      total += price * count;
    });
  }

  // Update shipping and total values
  document.querySelector(".shipping p").innerText = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  ).format(shipping.toFixed(2));
  document.querySelector(".total p").innerText = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  ).format((total + shipping).toFixed(2));
}

updateTotal();

// Get form, submit button, success and error messages
const form = document.querySelector("form");
const submitBtn = document.querySelector('button[type="submit"]');
const successMsg = document.querySelector(".success");
const errorMsg = document.querySelector(".error");

// Hide success and error messages by default
successMsg.style.display = "none";
errorMsg.style.display = "none";

// Function to show success message
function showSuccessMsg() {
  successMsg.style.display = "block";
  errorMsg.style.display = "none";
}

// Function to show error message
function showErrorMsg() {
  errorMsg.style.display = "block";
  successMsg.style.display = "none";
}

// Function to validate form
function validateForm() {
  const inputs = form.querySelectorAll(".input-field");

  let valid = true;

  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      valid = false;
    } else {
      input.classList.remove("error");
    }
  });

  return valid;
}

// Function to handle form submit
function handleSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    showSuccessMsg();
  } else {
    showErrorMsg();
  }
}

// Add event listener to submit button
submitBtn.addEventListener("click", handleSubmit);

const closeButtons = document.querySelectorAll(".close-btn");
const message = document.querySelector(".message");

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    message.style.display = "none";
  });
});
