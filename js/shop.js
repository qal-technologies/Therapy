import handleAlert from "/js/general.js";

//Audio source:
const BASE_PATHS = {
  images: "/src/images",
  svg: "/src/svg",
  audio: "/src/audio"
};

//Audio source:
const audioSrc = {
  session: {
    "en": `${BASE_PATHS.audio}/book-english.mp3`,
    "fr": `${BASE_PATHS.audio}/book-french.mp3`,
    "es": `${BASE_PATHS.audio}/book-spanish.mp3`,
    "de": `${BASE_PATHS.audio}/book-german.mp3`,
    "it": `${BASE_PATHS.audio}/book-italian.mp3`
  }
};

function handleAudio(lang) {
  const audioMessage = document.querySelector('.preview-banner audio#book-audio-message');

  if (!audioMessage) return;

  audioMessage.src = audioSrc.session[lang] || "/src/audio/book-audio.mp3";

  const listenBTN = document.querySelector(".preview-banner button#preview-play");

  if (listenBTN && audioMessage) {
    listenBTN.addEventListener('click', () => {
      if (!audioMessage.paused) {
        listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
        audioMessage.pause();
      } else {
        listenBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>`;
        audioMessage.play();
      }
    });
  }

  audioMessage.addEventListener("ended", () => {
    listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
  });
}


// Book Data:
const BOOK_COLLECTION = [
  {
    id: 'book-1',
    title: "COMPAGNON FÉMININ",
    downloads: "5000+ Downloads",
    formats: ["eBook", "Hardcopy"],
    price: "25.00",
    status: "Sold Out",
    description: `Get instant access to the story that's changing lives. Read on any device, anytime, begin your journey in just one click`,
    image: "/src/images/book1.jpg",
    quantity: 1,
  },
  {
    id: 'book-2',
    title: "THE ELEGANT STORY",
    downloads: "3000+ Downloads",
    formats: ["eBook", "Hardcopy"],
    price: "25.00",
    status: "Sold Out",
    description: "Another inspiring story that will change your perspective on healing and growth.",
    image: "/src/images/book2.jpg",
    quantity: 1
  }
];

function removeDetailsModal() {
  const modal = document.querySelector("#details-div");

  if (modal) {
    modal.classList.toggle("fadeOut");
  };
}

function showDetailsModal(e) {
  const modal = document.querySelector("#details-div");
  const cartCount = document.querySelector(".details-top span.cart-count");

  const contains = modal.classList.contains("fadeOut");
  contains && modal.classList.remove("fadeOut");

  const bookId = e.target.closest(".sub-preview").dataset.id;
  const book = BOOK_COLLECTION.find(b => b.id == bookId);

  modal.style.display = "block";
  renderBookCollection(book);

//for auto scroll cart:
const addToCartElements = document.querySelectorAll('.add-to-cart');
    
    // Loop through each element found
    addToCartElements.forEach(element => {
        // Get the parent element
        const parent = element.parentElement;
        
        // Check if parent exists
        if (parent) {
            // Scroll the parent to make the element visible
            parent.scrollTo({
                top: element.offsetTop - parent.offsetTop,
                left: element.offsetLeft - parent.offsetLeft,
                behavior: 'smooth' // Optional: adds smooth scrolling
            });
        }
    });

  const existing = JSON.parse(localStorage.getItem("carts")) || [];
  cartCount.textContent = existing.length;

  const close = document.querySelector("#details-div button.close-details");


  close && close.addEventListener("click", removeDetailsModal);
}

function handleQuantityChange(e) {
  const parentId = e.target.closest('.qty-main-div').dataset.id;
  const book = BOOK_COLLECTION.find(b => b.id === parentId);

  if (!book) return;

  if (e.target.classList.contains('add')) {
    book.quantity++;
  } else if (e.target.classList.contains('minus')) {
    // Prevent quantity from going below 1
    book.quantity = Math.max(1, book.quantity - 1);
  }

  // Update the displayed quantity
  const qtyText = e.target.closest('.qty-main-div').querySelector('.qty-text');
  if (qtyText) {
    qtyText.textContent = book.quantity;
  }
}

// function handleAlert(message) {
//   const parent = document.querySelector("#details-div .alert-message");
//   const text = document.querySelector("#details-div .alert-message .alert-text");

//   // if (parent) {
//     const contains = parent.classList.contains("fadeOut");
//     contains && parent.classList.remove("fadeOut");

//     parent.style.display = "flex";
//     text.textContent = message;

//     setTimeout(() => {
//       parent.classList.add("fadeOut");

//       text.textContent = "";
//       parent.style.display = "none";
//     }, 4000);
//   // }
// }

function handleCartUpdate(count) {
  const cartParent = document.querySelector(".details-top a.open-cart");
  const cartCount = document.querySelector(".details-top span.cart-count");

  if (!cartParent) return;

  cartCount.textContent = count;
  cartParent.classList.add("bounce");

  setTimeout(() => {
    cartParent.classList.remove("bounce");
  }, 1000);
}

function handleCartAnimation(count) {
  const cartParent = document.querySelector(".details-top a.open-cart");
  const cartImage = document.querySelector(".book-item img");

  const flyingImage = cartImage.cloneNode();
  flyingImage.classList.add("fly-to-cart");

  const productRect = cartImage.getBoundingClientRect();
  const cartRect = cartParent.getBoundingClientRect();

  const targetX = cartRect.left + cartRect.width / 2 - productRect.left - productRect.width / 2;
  const targetY = cartRect.top + cartRect.height / 2 - productRect.top - productRect.height / 2;

  flyingImage.style.setProperty("--target-x", `${targetX}px`);
  flyingImage.style.setProperty("--target-y", `${targetY}px`);

  flyingImage.style.position = "absolute";
  flyingImage.style.top = `${productRect.top}px`;
  flyingImage.style.left = `${productRect.left}px`;
  flyingImage.style.width = `${productRect.width}px`;
  flyingImage.style.height = `${productRect.height}px`;

  document.body.appendChild(flyingImage);

  flyingImage.addEventListener("animationend", () => {
    handleCartUpdate(count);

    flyingImage.remove();
  })
}

// Render Book Collection:
function renderBookCollection(book) {
  const collectionContainer = document.getElementById('bookCollection');
  if (!collectionContainer) return;

  collectionContainer.innerHTML = `
    <div class="book-item" data-id="${book.id}">
      <img src="${book.image}" alt="${book.title}">
<div class="book-info">
      <h3 class="book-title">${book.title.toUpperCase()}</h3>
      <p class="book-author">Charlotte Casiraghi</p>

      <!--div class="book-downloads">
      <div class="download-stars">★★★★★</div>
      <p class="download-text">${book.downloads}</p>
      </div-->

      <div class="book-format">
<p style="font-weight:bolder; min-width:100%; text-align:left; margin-top:10px; font-size:18px;" >
Select Book Format
</p>
        <div class="format-div">
        <input type="radio" name=${book.formats[0]} id=${book.formats[0]} checked>

        <div class="side">
          <p class="format-name">${book.formats[0]}</p>
          <p class="format-price">&euro; ${book.price}</p>
          </div>
        </div>

<div class="format-div last">
<input type="radio" name=${book.formats[1]} id=${book.formats[1]} ${book.status.toLowerCase() === "sold out" ? "disabled" : ""}>

          <div class="side">
          <p class="format-name">${book.formats[1]}</p>
          <p class="format-status ${book.status.toLowerCase()}">${book.status}</p>
          </div>
        </div>
      </div>
  </div>    

      <div class="book-description-div">
      <p class="description-title">
      eBook Description
      </p>
      <p class="description-text">
      ${book.description}
      </p>


       <div class="quantity">
        <p class="quantity-text">Select Number of Copies</p>
        <div class="qty-main-div" data-id="${book.id}">
          <span class="qty-arrow minus">-</span>
          <p class="qty-text">${book.quantity}</p>
          <span class="qty-arrow add">+</span>
        </div>
      </div>
     </div>

      <button class="add-to-cart btn">Add to Cart</button>
    </div>

  `;

  document.querySelectorAll('.qty-arrow').forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });

  document.querySelector(".book-info .format-div.last").addEventListener("click", () => {
    handleAlert("Temporarily Unavailable. Only eBook Available now.", "toast");
  })

  // Add event listeners for Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const bookItem = e.target.closest('.book-item');
      const bookId = bookItem.dataset.id;
      const book = BOOK_COLLECTION.find(b => b.id === bookId);

      if (book) {
        if (addToCart(book)) {
          const cartCount = document.querySelector(".details-top span.cart-count");
          const existing = JSON.parse(localStorage.getItem("carts")) || [];
          const count = existing.length;


          handleAlert(`${book.quantity} ${book.quantity > 1 ? 'copies' : 'copy'} of "${book.title}" added to cart!`, "toast");

          // Reset quantity after adding to cart
          book.quantity = 1;
          handleCartAnimation(count);
          renderBookCollection(book);

          setTimeout(() => {
            window.location.replace('/html/main/cart.html');
          }, 2000);
        }
      }
    });
  });
}


// Improved Add to Cart Function
function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem('carts')) || [];

  // Get selected format
  const selectedFormat = document.querySelector(`.book-item[data-id="${book.id}"] input[type="radio"]:checked`);
  if (!selectedFormat && book.formats.length > 0) {
    handleAlert('Please select a format before adding to cart', "toast");
    return false;
  }

  // Check if book already in cart with same format
  const existingItemIndex = cart.findIndex(item =>
    item.id === book.id && item.format === selectedFormat?.name
  );

  if (existingItemIndex !== -1) {
    // Update quantity of existing item
    cart[existingItemIndex].quantity += book.quantity;
  } else {

    const language = navigator.language;

    const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;

    // Adding new item to cart:
    cart.push({
      id: book.id,
      title: book.title,
      author: "Charlotte Casiraghi",
      price: book.price,
      image: book.image,
      quantity: book.quantity,
      transactionId: transactionId,
      description: book.description,
      image: book.image,
      date: new Date(),
      format: selectedFormat?.name || book.formats[0]
    });
  }

  localStorage.setItem('carts', JSON.stringify(cart));
  return true;
}

// Initialize both sections
document.addEventListener('DOMContentLoaded', () => {
  const language = navigator.language;
  const lang = language.toLowerCase().substring(0, 2);

  handleAudio(lang);

  const book = document.querySelectorAll("#preview button.get-copy");
  const close = document.querySelector("#details-div button.close-details");

  book && book.forEach(btn => btn.addEventListener("click", showDetailsModal));
  close && close.addEventListener("click", removeDetailsModal);
});


