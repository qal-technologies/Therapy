//Audio source:
const audioSrc = {
  session: {
    "en": "/src/audio/book-audio.mp3",
    "fr": "/src/audio/book-audio.mp3",
  }
};

function handleAudio(lang) {
  const audioMessage = document.querySelector('#banner audio#book-audio-message');


  audioMessage.src = audioSrc.session[lang] || "/src/audio/book-audio.mp3";

  const listenBTN = document.querySelector("#banner button#play");

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
    price: "20.00",
    status: "Sold Out",
    description: `
A book that speaks to every woman you have been,and every woman you are becoming. You see her on the cover.
Half of her is young, glowing, full of dreams.
The other half carries years, stories, and scars.

<br/>
She is you.
All of you 
the girl you once were,
the woman you are now,
and the one you are still becoming.
<br/>
<br/>

The Moment This Book Was Born
<br/>
I began writing this book on a night when I sat alone on my kitchen floor, holding a cup of cold tea I’d forgotten to drink. I had been strong for everyone else,again,and no one noticed I was crumbling inside.
<br/>
That night, I promised myself: If I ever find the way back to myself, I will leave a map for other women.
<br/>
This book is that map.
<br/>
This Is Not Just a Book
<br/>

It is a companion for your soul,through heartbreak, through silence, through the nights you’ve forgotten how to breathe.
<br/>
<br/>

It was written for:
<br/>
The woman who holds everyone else together, but has no one to hold her.
Therapists in Paris, Milan, and Rome call this emotional overfunctioning,giving without replenishment. You fear that if you let go, everything will collapse. And yet you quietly wonder: If I disappeared, would anyone notice?
<br/>
<br/>

The woman who has loved until she is empty and been left with nothing.
This is affective exhaustion,pouring out love until there is nothing left for you. You’ve mistaken self-erasure for devotion, and when they left, all that remained was the echo of your own absence.

<br/>
<br/>

The woman who hides her pain behind a perfect smile.
In France, it’s la façade impeccable. In Italy, il sorriso di resistenza. You’ve mastered the art of looking fine while storms rage inside. But the armor is heavy, and you long for someone who loves the woman without the smile.
<br/>

The woman who feels time slipping through her fingers.
Therapists call it temporal anxiety,the fear that the “right time” for love, children, career, or adventure has already passed. The years slip like sand through your hands, and you whisper in the dark: Did I live, or did I just wait?

<br/>
<br/>
Inside These 412 Pages, You Will:
<br/>

> Meet yourself again, before the disappointments, before the doubt.
<br/>

> Heal wounds you didn’t even know you still carried.
<br/>

> Release the guilt, the shame, and the voices that told you you weren’t enough.
<br/>

> Reclaim your softness without losing your strength.
<br/>

> Finally understand why you have felt lost,and exactly how to come home to yourself.

<br/>
<br/>

Every word is written like a hand reaching for yours in the dark.
Every chapter is a mirror, showing you your fragility and your power.
Every page is proof that someone finally, truly sees you.

<br/>
<br/>
<br/>

💬 Women are saying:
<br/>

> “The book I didn’t know I was waiting for my whole life.”
<br/>

> “It saved me without trying to fix me.”
<br/>

> “I bought one for myself,then six more for every woman I love.”
<br/>

<br/>
<br/>

Why You Can’t Walk Away Without It
<br/>

If you leave this page without this book, life will go on,but you will keep carrying the weight you were never meant to bear alone.
<br/>

This is your mirror.
Your healing.
Your reminder that you were never broken,only buried under the years.
<br/>

Compagnon Féminin will not just sit on your shelf.
It will live on your nightstand, travel in your bag, and rest in your hands on the days you feel like disappearing.
<br/>

It is more than a book.
<br/>

It is the voice you needed when you thought you had no one.
<br/>
<br/>
<br/>

🌹 Click “Add to cart.”
<br/>

She has been waiting for you.`,
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

  modal.classList.toggle("fadeOut");
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

function handleAlert(message) {
  const parent = document.querySelector("#details-div .alert-message");
  const text = document.querySelector("#details-div .alert-message .alert-text");

  const contains = parent.classList.contains("fadeOut");
  contains && parent.classList.remove("fadeOut");

  parent.style.display = "flex";
  text.textContent = message;

  setTimeout(() => {
    parent.classList.add("fadeOut");

    text.textContent = "";
    parent.style.display = "none";
  }, 4000);
}

function handleCartUpdate(count) {
  const cartParent = document.querySelector(".details-top a.open-cart");
  const cartCount = document.querySelector(".details-top span.cart-count");

  cartCount.textContent = count;
  cartParent.classList.add("bounce");

  setTimeout(() => {
    cartParent.classList.remove("bounce");
  }, 1000);
}

function handleCartAnimation( count) {
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

      <div class="book-downloads">
      <div class="download-stars">★★★★★</div>
      <p class="download-text">${book.downloads}</p>
      </div>
      <div class="book-format">
        <div class="format-div">
        <input type="radio" name=${book.formats[0]} id=${book.formats[0]}>
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
        <p class="quantity-text">Qty</p>
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
    handleAlert("Temporarily Unavailable. Only eBook Available now.");
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


          handleAlert(`${book.quantity} ${book.quantity > 1 ? 'copies' : 'copy'} of "${book.title}" added to cart!`);

          // Reset quantity after adding to cart
          book.quantity = 1;
          handleCartAnimation(count);
          renderBookCollection(book);
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
    handleAlert('Please select a format before adding to cart');
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


