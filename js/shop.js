import handleAlert from "/js/general.js";
import { handleAuthStateChange, getCurrentUser } from './auth.js';
import { addToCart as addToCartInDb, getCartItems, getUserData } from './database.js';


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
    description: `This ebook is limited to just 5,000 readers. It’s been created with care to feel like a real book you can hold close, even though it’s digital. Once all copies are claimed, it will no longer be available worldwide.  You can read it easily on your phone, tablet, or computer. Just one click to begin your journey.`,
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

  if (modal) modal.classList.toggle("fadeOut");
};



function showDetailsModal(e) {
  const modal = document.querySelector("#details-div");
  const cartCount = document.querySelector(".details-top span.cart-count");
  if (!modal) return;

  const contains = modal.classList.contains("fadeOut");
  contains && modal.classList.remove("fadeOut");

  const bookId = e.target.closest(".sub-preview").dataset.id;
  const book = BOOK_COLLECTION.find(b => b.id == bookId);

  modal.style.display = "block";
  renderBookCollection(book);

  setTimeout(() => {
    const addToCartElements = document.querySelectorAll('.add-to-cart');

    addToCartElements.forEach(element => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    });
  }, 3000);
}

function handleQuantityChange(e) {
  const parentId = e.target.closest('.qty-main-div').dataset.id;
  const book = BOOK_COLLECTION.find(b => b.id === parentId);

  if (!book) return;

  if (e.target.classList.contains('add')) {
    book.quantity++;
  } else if (e.target.classList.contains('minus')) {
    book.quantity = Math.max(1, book.quantity - 1);
  }

  const qtyText = e.target.closest('.qty-main-div').querySelector('.qty-text');
  if (qtyText) qtyText.textContent = book.quantity;
}


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
  if (!cartParent || !cartImage) return;
  
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
<input type="radio" name=${book.formats[1]} id=${book.formats[1]} class="last"  ${book.status.toLowerCase() === "sold out" ? "disabled" : ""}>

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

  document.querySelectorAll(".book-info .last")
    .forEach(el => el.addEventListener("click", () => {
      handleAlert("Permanently Unavailable. Only eBook Available now.", "toast");
    }));
  
  document.querySelectorAll('.add-to-cart').forEach(button => button.addEventListener('click', handleAddToCartClick));
}

async function handleAddToCartClick(e) {
  const user = getCurrentUser();
  if (!user) {
    handleAlert("Please login or register to add items to your cart.", "toast");
    setTimeout(() => window.location.href = "/html/regs/Signup.html", 2000);
    return;
  }

  const bookItem = e.target.closest('.book-item');
  const bookId = bookItem.dataset.id;
  const book = BOOK_COLLECTION.find(b => b.id === bookId);
  if (!book) return;

  const selectedFormat = document.querySelector('input[type="radio"]:checked');
  if (!selectedFormat) {
    handleAlert('Please select a format.', "toast");
    return;
  }

  const language = navigator.language;

  const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;
  const itemData = {
    bookId: book.id,
    title: book.title,
    price: book.price,
    image: book.image,
    quantity: book.quantity,
    transactionId: transactionId,
    description: `You are buying one or more copies of Compagnon Féminin, a special digital book available to only 5,000 readers worldwide. It has been carefully designed to feel like a real book, even though you read it on a phone, tablet, or computer.`,
    date: new Date(),
    format: selectedFormat?.name || book.formats[0]
  };

  const button = e.currentTarget;
  button.disabled = true;
  button.innerHTML = `<div class="spinner-container" style="align-self:center;"><div class="spinner"></div></div>`;

  try {
    await addToCartInDb(user.uid, itemData);
    handleAlert(`${book.quantity} ${book.quantity > 1 ? 'copies' : 'copy'} of "${book.title}" added to cart!`, "toast");


    const cartItems = await getCartItems(user.uid);
    handleCartAnimation(cartItems.length);
    
    book.quantity = 1;
    button.disabled = false;
    button.innerHTML = 'Add to Cart';

    renderBookCollection(book);
    setTimeout(() => {
      window.location.href = '/html/main/cart.html';
    }, 2000);
  } catch (error) {
    console.error("Error adding to cart:", error);
    handleAlert(`Failed to add item, because: ${error}. Please try again.", "toast`);
    button.disabled = false;
    button.innerHTML = 'Add to Cart';
  }
}

// Initialize both sections
document.addEventListener('DOMContentLoaded', () => {
  const language = navigator.language;
  const lang = language.toLowerCase().substring(0, 2);

  handleAudio(lang);

  const bookButtons = document.querySelectorAll("#preview button.get-copy");
  bookButtons?.forEach(btn => btn.addEventListener("click", showDetailsModal));

  const closeButton = document.querySelector("#details-div button.close-details");
  closeButton?.addEventListener("click", removeDetailsModal);

  handleAuthStateChange(async (user) => {
    const cartCount = document.querySelector(".details-top span.cart-count");
    if (user && cartCount) {
      const user = await getUserData(user.uid);
      const details = document.querySelector("#preview .details");
      const copyBTN = document.querySelector("#preview button.get-copy");


      if (user.bookPaid === true) {
        details.innerHTML = "";
        details.innerHTML = `<p> 🌹 Click <b>“START READING NOW”</b>.<br/> She has been waiting for you.</p>`;

        copyBTN.textContent = "START READING NOW";
        copyBTN.addEventListener("click", () => window.location.href("/html/main/ViewBook.html"));
      }

      const items = await getCartItems(user.uid);
      cartCount.textContent = items.length;
    } else if (cartCount) {
      cartCount.textContent = 0;
    }
  });
});



