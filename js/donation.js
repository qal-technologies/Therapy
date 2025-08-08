
//Audio source:
const audioSrc = {
    session: {
        "en": "/src/audio/donation-audio.mp3",
        "fr": "/src/audio/donation-audio.mp3",
    }
};

//categoriess:
const categories = [
    { name: "Medical", image: "/src/svg/heart-pulse-fill.svg" },
    { name: "Memorial", image: "/src/svg/candle-heart-love-svgrepo-com.svg" },
    { name: "Education", image: "/src/svg/education.svg" },
    { name: "Animal", image: "/src/svg/animal.svg" },
    { name: "Faith", image: "/src/svg/cloud.svg" },
    { name: "Family", image: "/src/svg/family.svg" },
    { name: "Environment", image: "/src/svg/environment.svg" },
    { name: "Community", image: "/src/svg/community.svg" },
];

const stories = [
  {
    name: "Medical",
    stories: [
      {
        images: ["/src/images/medical/01/IMG-20250807-WA0054.jpg", "/src/images/medical/01/IMG-20250807-WA0055.jpg", "/src/images/medical/01/IMG-20250807-WA0056.jpg", "/src/images/medical/01/IMG-20250807-WA0057.jpg", "/src/images/medical/01/IMG-20250807-WA0058.jpg"], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: `My name is Joshua Blood, and I’m reaching out to ask for support for my incredible wife, Jessie. Jessie has been diagnosed with Interstitial Lung Disease, caused by Mixed Connective Tissue Disease, a rare and aggressive condition that continues to destroy her lungs even with treatment. Despite her strength and determination, her lung function has dropped below 45%, and doctors have confirmed that she will need a double lung transplant within the next year to survive.

Jessie is a devoted mother to our 8-year-old daughter, and a loving stepmom to our 12 and 14-year-old children. Without this transplant, she may never get to see them graduate, go to prom, or walk down the aisle. We are fighting with everything we have to give her that chance.

A transplant is just the beginning of a long and demanding recovery journey. Jessie and I will need to relocate near the Mayo Clinic for 3 to 4 months after surgery for intensive follow-up care, physical therapy, and constant medical monitoring. During this time:
• Jessie will be unable to work, and we will lose a major portion of our household income.
• We will still be responsible for our regular household bills back home.
• We will face costs for temporary housing, medications, fuel, childcare, and co-pays for frequent medical appointments.

We humbly ask for your support in this fight. Every donation—no matter the size—will help us breathe a little easier and focus on what truly matters: giving Jessie a future.

If you’re unable to give, please share our story. Your kindness and prayers mean more than we can express.

From the bottom of our hearts, thank you.

— Josh, Jessie & family`, organizer: "Josh Blood", just: {
          number: 74,
          top: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },

            { name: "Amber Hodges", amount: "1,200", rank: "Top donation", time: "1 hr" },

            { name: "Anonymous", amount: "100", rank: "First donation", time: "30 mins" },
          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [
            
          ]
        }
      },
      {
        images: ["/src/images/medical/02/IMG-20250807-WA0066.jpg", "/src/images/medical/02/IMG-20250807-WA0067.jpg", "/src/images/medical/02/IMG-20250807-WA0068.jpg", "/src/images/medical/02/IMG-20250807-WA0072.jpg"], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
        percentage: "96%", description: "Very long description", organizer: "Mike Warywoda", just: {
          number: 91,
          top: [
            { name: "Stacey Snead-Peterson", amount: "25", rank: "Recent donation", time: "30 mins" },
            { name: "Heather Cope", amount: "500", rank: "Top donation", time: "16 mins" },

            { name: "Madison Hickman", amount: "100", rank: "First donation", time: "1 hr" },

          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [

          ]
        }
      },
      {
        images: ["/src/images/medical/03/IMG-20250807-WA0070.jpg", "/src/images/medical/03/IMG-20250807-WA0065.jpg", "/src/images/medical/03/IMG-20250807-WA0065.jpg", "/src/images/medical/03/IMG-20250807-WA0071.jpg", "/src/images/medical/03/IMG-20250807-WA0073.jpg" ], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
        percentage: "89%", description: "Very long description", organizer: "Stacey Forcke", just: {
          number: 178,
          top: [
            { name: "Elizabeth Ann Kuhns-Boyle", amount: "200", rank: "First donation", time: "16 mins" },

            { name: "Emily Branch", amount: "100", time: "30 mins" },

            { name: "Thomas Layman", amount: "25", time: "1 hr" },
          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [

          ]
        }
      },
      {
        images: ["/src/images/medical/04/IMG-20250807-WA0076.jpg", "/src/images/medical/04/IMG-20250807-WA0077.jpg", "/src/images/medical/04/IMG-20250807-WA0078.jpg"], location: "New York, NY", title: "Support Sheila Jordan's Hospice Care", target: "120K", raised: "118,147", donations: "1.1K",
        percentage: "98%", description: `Very long description`, organizer: "Tracy Jordan", just: {
          number: 0,
          top: [
            { name: "Ben Ruben-Schnirman", amount: "5", rank: "First donation", time: "16 mins" },

            { name: "Francis Dance", amount: "10", time: "27 mins" },

            { name: "Emilie Conway", amount: "115", time: "36 mins" },
          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [

          ]
        }
      },
    ]
  },
  {
    name: "Memorial",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Honey Hill Mobile Home Park, FL", title: "Honor Grandma Madie's Legacy and Wishes", target: "24K", raised: "20,345", donations: "625",
        percentage: "85%", description: `Very long description`, organizer: "Shanika Bradshaw", just: {
          number: 299,
          top: [
            { name: "Brandolyn Jones", amount: "20", rank: "Recent donation", time: "16 mins" },

            { name: "Andrea Bland", amount: "25", time: "24 mins" },

            { name: "Sabrina Philips", amount: "100", time: "33 mins" },
          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [

          ]
        }
      },
      {
        images: ["/src/images/memory/02/IMG-20250807-WA0085.jpg", "/src/images/memory/02/IMG-20250807-WA0084.jpg", "/src/images/memory/02/IMG-20250807-WA0083.jpg", "/src/images/memory/02/IMG-20250807-WA0086.jpg"], location: "Santa Ana, CA", title: "In Memory of Leticia Placencia Alvarado: Funeral Fund", target: "24K", raised: "13,062", donations: "290",
        percentage: "54%", description: `Very long description`, organizer: "Wendy Perez", just: {
          number: 288,
          top: [
            { name: "Jose Fontao", amount: "100", rank: "First donation", time: "30 mins" },
            { name: "Darlene Fuertes", amount: "10", time: "20 mins" },

            { name: "Ricardo De Los Keyes", amount: "50", time: "26 mins" },
          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [

          ]
        }
      },
      {
        images: ["/src/images/memory/04/IMG-20250807-WA0093.jpg", "/src/images/memory/04/IMG-20250807-WA0091.jpg", "/src/images/memory/04/IMG-20250807-WA0092.jpg"], location: "Centennial, CO", title: "In Memory of Naomi Alene: Funeral Support", target: "65K", raised: "56,380", donations: "402",
        percentage: "87%", description: `Very long description`, organizer: "Dawit Agonafer", just: {
          number: 90,
          top: [
            { name: "Dawit Agonafer", amount: "1000", rank: "First donation", time: "16 mins" },

            { name: "Anonymous", amount: "50", time: "2 hrs" },

            { name: "Anonymous", amount: "50", time: "3 hrs" },
          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [

          ]
        }
      },
      {
        images: ["/src/images/memory/03/IMG-20250807-WA0089.jpg", "/src/images/memory/03/IMG-20250807-WA0090.jpg", "/src/images/memory/03/IMG-20250807-WA0094.jpg"], location: "Stamford, CT", title: "Help Lay Rest 12 year old Brisley Reyes", target: "45K", raised: "31,698", donations: "628",
        percentage: "70%", description: `Very long description`, organizer: "Olga Reyes Gramajo and BRISLY REYES", just: {
          number: 244,
          top: [
            { name: "Justin Duarte", amount: "100", rank: "First donation", time: "16 mins" },

            { name: "Anonymous", amount: "25", time: "35 mins" },

            { name: "Strawberry Hill PTO", amount: "200", time: "3 hrs" },
          ],
          upper: [
            { name: "Jennifer Hall", amount: "50", rank: "Recent donation", time: "16 mins" },
            { name: "Edythe Synder Sanders", amount: "25", rank: "Recent donation", time: "36 mins" },
            { name: "Christopher Parsons", amount: "10", rank: "Recent donation", time: "40 mins" },
            { name: "Christopher Youngman", amount: "25", rank: "Recent donation", time: "50 mins" },
          ],
          others: [

          ]
        }
      },
     
    ]
  },
];

function handleAudio(lang) {
    const audioMessage = document.querySelector('.banner .message audio#audio-message');

    audioMessage.src = audioSrc.session[lang] || "/src/audio/donation-audio.mp3";

    const listenBTN = document.querySelector(".banner .message button#play");

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

function renderCategory() {
    const categoryFlex = document.querySelector(".category .category-flex");

    if (!categoryFlex) return;
    
    categoryFlex.innerHTML = "";
    
    categories.forEach(div => {
        const cartegory = document.createElement("div");
        cartegory.classList.add("category-div");
        cartegory.dataset.id = div.name;
        
        cartegory.innerHTML = `
            <div class="category-image"><img src="${div.image}"  alt="${div.image}"></div>

            <p class="category-name">${div.name}</p>
       `
        
        categoryFlex.appendChild(cartegory);
    });
}

function handleStories() {
  const storiesSection = document.querySelector("section.stories");

  storiesSection.innerHTML = "";
  
  stories.forEach(category => {
    const title = `${category.name} Fundraisers`;
    const preview = category.stories.slice(0, 3);

    const parent = document.createElement("div");
    parent.classList.add("story-category");


    parent.innerHTML = `
                <h2 class="story-category-title">${title}</h2>

                <div class="stories">
${ preview.map(el => {
        const story = `<div class="story">
                        <div class="story-image"><img src="${el.images[0] || "/src/images/logo.jpg"}" alt=""></div>

                        <div class="story-info">
                            <p class="story-location">${el.location}</p>
                            <p class="story-title">${el.title}</p>
                            <div class="wrapper">
                                <div class="meter" style="width:${el.percentage}"></div>
                            </div>

                            <p class="story-amount-raised">$${el.raised} raised</p>
                        </div>
                    </div>`
        return story;
}).join("")
}
                </div>

                <button class="see-more" title="See More">See more   ></button>
            </div>`;
    
    storiesSection.appendChild(parent)
  })

}

document.addEventListener('DOMContentLoaded', () => {
    const language = navigator.language;
    const lang = language.toLowerCase().substring(0, 2);

    handleAudio(lang);
  renderCategory();
  handleStories();
});