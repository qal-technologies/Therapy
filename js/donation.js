let pageState = {
  clickedDonation: null,
};

const BASE_PATHS = {
  images: "/src/images",
  svg: "/src/svg",
  audio: "/src/audio"
};

//Audio source:
const audioSrc = {
  session: {
    "en": `${BASE_PATHS.audio}/donation-english.mp3`,
    "fr": `${BASE_PATHS.audio}/donation-french.mp3`,
    "es": `${BASE_PATHS.audio}/donation-spanish.mp3`,
    "de": `${BASE_PATHS.audio}/donation-german.mp3`,
    "it": `${BASE_PATHS.audio}/donation-italian.mp3`
  }
};

//categoriess:
const categories = [
  { name: "Medical", image: `${BASE_PATHS.svg}/heart-pulse-fill.svg` },
  { name: "Memorial", image: `${BASE_PATHS.svg}/candle-heart-love-svgrepo-com.svg` },
  { name: "Education", image: `${BASE_PATHS.svg}/education.svg` },
  { name: "Animal", image: `${BASE_PATHS.svg}/animal.svg` },
  { name: "Faith", image: `${BASE_PATHS.svg}/cloud.svg` },
  { name: "Family", image: `${BASE_PATHS.svg}/family.svg` },
  { name: "Environment", image: `${BASE_PATHS.svg}/environment.svg` },
  { name: "Community", image: `${BASE_PATHS.svg}/community.svg` },
];

const stories = [
  {
    name: "Medical",
    stories: [
      {
        images: [`${BASE_PATHS.images}/medical/01/IMG-20250807-WA0054.jpg`, `${BASE_PATHS.images}/medical/01/IMG-20250807-WA0055.jpg`, `${BASE_PATHS.images}/medical/01/IMG-20250807-WA0056.jpg`, `${BASE_PATHS.images}/medical/01/IMG-20250807-WA0057.jpg`, `${BASE_PATHS.images}/medical/01/IMG-20250807-WA0058.jpg`], location: `Tallahassee, FL`, title: `Being Weezy Ain't Easy - Help Jessie Get New Lungs`, target: `50K`, raised: `233,563`, donations: `7.7K`,
        percentage: `99%`, description: `My name is Joshua Blood, and I’m reaching out to ask for support for my incredible wife, Jessie. Jessie has been diagnosed with Interstitial Lung Disease, caused by Mixed Connective Tissue Disease, a rare and aggressive condition that continues to destroy her lungs even with treatment. Despite her strength and determination, her lung function has dropped below 45%, and doctors have confirmed that she will need a double lung transplant within the next year to survive.
<br/>
<br/>

Jessie is a devoted mother to our 8-year-old daughter, and a loving stepmom to our 12 and 14-year-old children. Without this transplant, she may never get to see them graduate, go to prom, or walk down the aisle. We are fighting with everything we have to give her that chance.
<br/>
<br/>

A transplant is just the beginning of a long and demanding recovery journey. Jessie and I will need to relocate near the Mayo Clinic for 3 to 4 months after surgery for intensive follow-up care, physical therapy, and constant medical monitoring. During this time:
<br/>

• Jessie will be unable to work, and we will lose a major portion of our household income.
<br/>

• We will still be responsible for our regular household bills back home.
<br/>
• We will face costs for temporary housing, medications, fuel, childcare, and co-pays for frequent medical appointments.
<br/>
<br/>

We humbly ask for your support in this fight. Every donation—no matter the size—will help us breathe a little easier and focus on what truly matters: giving Jessie a future.
<br/>
<br/>

If you’re unable to give, please share our story. Your kindness and prayers mean more than we can express.
<br/>
<br/>

From the bottom of our hearts, thank you.
<br/>
<br/>

— Josh, Jessie & family`, organizer: `Josh Blood`, just: {
          number: 74,
          top: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },

            { name: `Amber Hodges`, amount: `1,200`, rank: `Top donation`, time: `1 hr` },

            { name: `Anonymous`, amount: `100`, rank: `First donation`, time: `30 mins` },
          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
          ],
          others: [

          ]
        }
      },
      {
        images: [`${BASE_PATHS.images}/medical/02/IMG-20250807-WA0066.jpg`, `${BASE_PATHS.images}/medical/02/IMG-20250807-WA0067.jpg`, `${BASE_PATHS.images}/medical/02/IMG-20250807-WA0068.jpg`, `${BASE_PATHS.images}/medical/02/IMG-20250807-WA0072.jpg`], location: `Monoroeville, PA`, title: `Support Tracey's Fight Against Severe Illness`, target: `25K`, raised: `24,086`, donations: `314`,
        percentage: `96%`, description: `My name is Mike, and I’m starting this fundraiser for my wife, Tracey.
<br/>
<br/>

Just a few weeks ago, we were living our normal life—raising our kids, working, doing what families do. Then, everything changed. Tracey became seriously ill and was hospitalized. What started as a suspected neurological issue quickly escalated into a life-threatening medical crisis.
<br/>
<br/>
She is now in the ICU, receiving treatment for a rare condition called transverse myelitis, and most recently severe complications affecting her heart—including myocarditis. She is on IV medications, a dopamine drip, and potentially life-saving immunosuppressants.
<br/>
<br/>

We are trying to stay hopeful, but we are also preparing for the long road ahead. Whether she stays in the hospital for weeks or comes home needing in-home care or rehabilitation and we’re just getting started.
<br/>
<br/>

I never thought I’d be doing something like this I’m trying to keep as much pride as possible, but we will need help. If you feel moved to support us—whether it’s $5 or simply by sharing this page—we are so grateful. Your help allows me to focus on my wife and our children during the most difficult time of our lives.
<br/>
<br/>
From the bottom of my heart, thank you.

<br/>

—Mike`, organizer: `Mike Warywoda`, just: {
          number: 91,
          top: [
            { name: `Stacey Snead-Peterson`, amount: `25`, rank: `Recent donation`, time: `30 mins` },
            { name: `Heather Cope`, amount: `500`, rank: `Top donation`, time: `16 mins` },

            { name: `Madison Hickman`, amount: `100`, rank: `First donation`, time: `1 hr` },

          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
          ],
          others: [

          ]
        }
      },
      {
        images: [`${BASE_PATHS.images}/medical/03/IMG-20250807-WA0070.jpg`, `${BASE_PATHS.images}/medical/03/IMG-20250807-WA0065.jpg`, `${BASE_PATHS.images}/medical/03/IMG-20250807-WA0071.jpg`, `${BASE_PATHS.images}/medical/03/IMG-20250807-WA0073.jpg`], location: `Goochland, VA`, title: `Support Parker Forcke's Fight Against Stage 4 Colon Cancer`, target: `40K`, raised: `35,483`, donations: `332`,
        percentage: `89%`, description: `On June 18th, our lives were turned upside down. My 23-year-old son, <b>Parker Forcke</b>, was diagnosed with Stage 4 colon cancer. It has metastasized to his liver, lymph nodes, and 3 of his bones. He has a huge fight ahead of him. We never thought in a million years that we would ever have to ask for help. It has truly humbled us.
<br/>

We don’t know what the future holds, but we know one thing: Parker is going to fight like hell. He is a believer, and he knows that God has him no matter what. Anyone who knows him knows he is one amazing human being. He has been through a lot in his short life. His father passed unexpectedly when he was only 4 years old. He grew up always wanting to take care of me and his little sister. He has grown into such a wonderful young man. Parker is a hard worker; he is kind, compassionate, and would give the shirt off his back to anyone in need.
<br/>
<br/>

We know there will be expenses that we cannot afford. Cancer treatments are incredibly expensive, involving chemotherapy, targeted therapy, surgeries, immunotherapy, and more. My insurance is not the greatest, so this fund will help us to pay for things that are not covered, copays, high deductibles, and medication expenses. He has already made one trip to New York City to meet with a top colon cancer doctor from Cornell University, who has agreed to take Parker on. Flights for us, hotel rooms, meals, etc., will add up quickly. We are hoping his treatments and scans will continue to be performed locally by another center that the Cornell doctor has agreed to work with. At this time, we believe anything surgical will be performed in New York. We are working through the details of what will be covered in-network and what won’t. The important thing is for my son to get the best possible care we can find, no matter the cost.
<br/>

As most of you know, Parker is a successful business owner of Forcke Enterprises. Landscaping and Property Management is his passion. He takes his work very seriously and, with the help of his team, he plans to keep things operating throughout his journey. Please continue to reach out to him for your property service needs, which will also help to support him and his team while he is battling this.
<br/>
<br/>

We truly believe that Parker will beat this thing. God has something greater planned for him. He is going to have one heck of a testimony to share with others when this is over. If you are able to help with this fundraiser, we will be forever grateful. If not, that’s okay too. We just ask that everyone please keep him, his girlfriend Rylee, and our family in your prayers during the biggest fight of his life… and please share this with anyone and everyone you know.
<br/>
<br/>

May God bless you and your family with good health, as I hope and pray that none of you are ever faced with this horrible disease. Thank you.`, organizer: `Stacey Forcke`, just: {
          number: 178,
          top: [
            { name: `Elizabeth Ann Kuhns-Boyle`, amount: `200`, rank: `First donation`, time: `16 mins` },

            { name: `Emily Branch`, amount: `100`, time: `30 mins` },

            { name: `Thomas Layman`, amount: `25`, time: `1 hr` },
          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
          ],
          others: [

          ]
        }
      },
      {
        images: [`${BASE_PATHS.images}/medical/04/IMG-20250807-WA0076.jpg`, `${BASE_PATHS.images}/medical/04/IMG-20250807-WA0077.jpg`, `${BASE_PATHS.images}/medical/04/IMG-20250807-WA0078.jpg`], location: `New York, NY`, title: `Support Sheila Jordan's Hospice Care`, target: `120K`, raised: `118,147`, donations: `1.1K`,
        percentage: `98%`, description: `Dear Friends, Jazz Family & Colleagues,
As you may have heard, my mom, <b>NEA Jazzmaster Sheila Jordan</b>, is not doing well. She is no longer at the Actors Fund Nursing Home, where she received 100 days of excellent round-the-clock care. It truly is a wonderful organization. She is now at home under hospice care through her Medicare coverage. Unfortunately, Medicare only provides 10 hours of Home Hospice Care Aide services per week. Per WEEK!
<br/>
<br/>

As a result, we have been paying out of pocket for a private Home Care Aide to come during the day for a few hours, and I've been spending the remainder of the time nursing my mom since July 7th. The emotional toll of watching my mom's health decline is immense, and I'm physically and emotionally exhausted while being financially drained.
<br/>
<br/>
<br/>

A few of my mom’s friends have been incredibly supportive, either by donating funds or offering to spend a few nights or afternoons with her, or both. I am deeply grateful for these recent donations. But unfortunately, it’s not enough.
<br/>
<br/>
The healthcare system in our country is broken. Medicare limits her health-care coverage and doesn’t come close to covering our expenses.
<br/>
<br/>

My mom is a living bridge to the great musicians who created Bebop and beyond, and she has treated her legacy with deep respect and generously passed on her transformative message to thousands of grateful people.
<br/>
<br/>

At this point in her long and full life, she now needs us to show her our love. Your support could make a significant difference in my mom's life, ensuring she receives the best care possible. Thank you in advance for your time and consideration.`, organizer: `Tracy Jordan`, just: {
          number: 0,
          top: [
            { name: `Ben Ruben-Schnirman`, amount: `5`, rank: `First donation`, time: `16 mins` },

            { name: `Francis Dance`, amount: `10`, time: `27 mins` },

            { name: `Emilie Conway`, amount: `115`, time: `36 mins` },
          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
          ],
          others: [

          ]
        }
      },
    ]
  },
  {
    name: `Memorial`,
    stories: [
      {
        images: [`${BASE_PATHS.images}/memory/01/IMG-20250808-WA0026.jpg`, `${BASE_PATHS.images}/memory/01/IMG-20250808-WA0025.jpg`,], location: `Honey Hill Mobile Home Park, FL`, title: `Honor Grandma Madie's Legacy and Wishes`, target: `24K`, raised: `20,345`, donations: `625`,
        percentage: `85%`, description: `I am Shanika, the granddaughter of 107-year-old Madie. Many of you may know her as Grandma Madie, a very well-known social media sensation. She has gone viral in several videos on TikTok, Facebook, and Instagram. Madie was born in December of 1917. Yes! That would make her 107, and if it’s God’s will, in December she will be 108. Madie was a woman who worked all her life and retired at the age of 85. She loved working. My grandma had one child who preceded her in death many, many years ago. That left her to raise me and my three brothers by herself. She did this without a complaint, and she was 76 years old starting all over again. That didn’t stop her from showing us love and support until we were able to do for ourselves.
<br/>
<br/>

However, within the last week, Madie has been facing some health challenges. She has been in and out of the hospital, which has now led her to be in hospice care at home 24/7. As her health has now been on the decline, I want to start preparing for her transition. Madie has insurance, but unfortunately, it’s not enough to fulfill her wishes of getting her back home to Vidalia, GA, where she was born, to be buried next to her mother, whom she loved so much. I am praying that the Lord touches the hearts of the people who genuinely loved my grandma to help her fulfill her wishes.`, organizer: `Shanika Bradshaw`, just: {
          number: 299,
          top: [
            { name: `Brandolyn Jones`, amount: `20`, rank: `Recent donation`, time: `16 mins` },

            { name: `Andrea Bland`, amount: `25`, time: `24 mins` },

            { name: `Sabrina Philips`, amount: `100`, time: `33 mins` },
          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
          ],
          others: [

          ]
        }
      },
      {
        images: [`${BASE_PATHS.images}/memory/02/IMG-20250807-WA0085.jpg`, `${BASE_PATHS.images}/memory/02/IMG-20250807-WA0084.jpg`, `${BASE_PATHS.images}/memory/02/IMG-20250807-WA0083.jpg`, `${BASE_PATHS.images}/memory/02/IMG-20250807-WA0086.jpg`], location: `Santa Ana, CA`, title: `In Memory of Leticia Placencia Alvarado: Funeral Fund`, target: `24K`, raised: `13,062`, donations: `290`,
        percentage: `54%`, description: `Hello Everyone,

<br/>

It is with heavy hearts that we share the tragic passing of our beloved Leticia Placencia Alvarado, aka Letita, a daughter, wife, cousin and friend. Letita was taken from us far too soon.
<br/>
<br/>

On August 4th, 2025, at approximately 6:30 PM, Letita was just five minutes away from home when her vehicle was struck head-on by a grey BMW driving in the wrong lane. Tragically, she was pronounced deceased at the scene. Her sudden loss has left our family completely devastated.
<br/>
<br/>

Letita was full of life, love, and kindness. She had a smile that could light up any room and a heart that was always ready to help others. Her sudden passing left in void that words cannot fill.
<br/>
<br/>

We are asking for your help to cover the the funeral and memorial expenses during this incredibly difficult time. Any amount, no matter how small, will help us honor her memory and say goodbye in the way she deserves.
<br/>
<br/>

Thank you for all your love, prayers and support.
<br/>
<br/>

With Gratitude & Love,
<br/>

The Alvarado, Placencia, Hernandez Family.`, organizer: `Wendy Perez`, just: {
          number: 288,
          top: [
            { name: `Jose Fontao`, amount: `100`, rank: `First donation`, time: `30 mins` },
            { name: `Darlene Fuertes`, amount: `10`, time: `20 mins` },

            { name: `Ricardo De Los Keyes`, amount: `50`, time: `26 mins` },
          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
          ],
          others: [

          ]
        }
      },
      {
        images: [`${BASE_PATHS.images}/memory/04/IMG-20250807-WA0093.jpg`, `${BASE_PATHS.images}/memory/04/IMG-20250807-WA0091.jpg`, `${BASE_PATHS.images}/memory/04/IMG-20250807-WA0092.jpg`], location: `Centennial, CO`, title: `In Memory of Naomi Alene: Funeral Support`, target: `65K`, raised: `56,380`, donations: `402`,
        percentage: `87%`, description: `With heavy hearts, we mourn the passing of our beloved <b>Naomi Alene</b>, daughter of Ketema Alene and Solome Tsehay, and sister to Nazrawi, Nehemiah, and Nava. Naomi was a bright light: loving, full of life, and cherished by all who knew her. Though her time with us was brief, we treasure the beautiful memories we shared with her and the gift from God she was to us all.
<br/>
<br/>

We are raising funds to help cover funeral and related expenses during this difficult time. Any contribution, big or small, is deeply appreciated.
<br/>
<br/>
May the Father of mercies and the God of all comfort be near to all who are devastated by this tragic and untimely loss.`, organizer: `Dawit Agonafer`, just: {
          number: 90,
          top: [
            { name: `Dawit Agonafer`, amount: `1000`, rank: `First donation`, time: `16 mins` },

            { name: `Anonymous`, amount: `50`, time: `2 hrs` },

            { name: `Anonymous`, amount: `50`, time: `3 hrs` },
          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
          ],
          others: [

          ]
        }
      },
      {
        images: [`${BASE_PATHS.images}/memory/03/IMG-20250807-WA0089.jpg`, `${BASE_PATHS.images}/memory/03/IMG-20250807-WA0090.jpg`, `${BASE_PATHS.images}/memory/03/IMG-20250807-WA0094.jpg`], location: `Stamford, CT`, title: `Help Lay Rest 12 year old Brisley Reyes`, target: `45K`, raised: `31,698`, donations: `628`,
        percentage: `70%`, description: `Help Lay 12-Year-Old <b>Brisley Reyes</b> to Rest After Tragic Accident
<br/>
<br/>

It is with broken hearts that we share the devastating loss of 12-year-old Brisley Reyes, a kind and hard-working boy whose life was tragically cut short on August 2nd, 2025 after being struck by a vehicle while riding his electric bike with his dad.
<br/>
<br/>


We are asking for your support to help Brisley’s grieving family with funeral and burial expenses during this unimaginable time. No parent should ever have to bury their child, and the burden of unexpected funeral costs only deepens the pain.
<br/>
<br/>

All funds raised will go directly to Brisley’s family to cover funeral arrangements, burial costs, and support them in the days ahead as they navigate this tragic loss.
<br/>
<br/>
<br/>

If you’re unable to donate, please consider sharing this page and keeping Brisley’s family in your prayers.`, organizer: `Olga Reyes Gramajo and BRISLY REYES`, just: {
          number: 244,
          top: [
            { name: `Justin Duarte`, amount: `100`, rank: `First donation`, time: `16 mins` },

            { name: `Anonymous`, amount: `25`, time: `35 mins` },

            { name: `Strawberry Hill PTO`, amount: `200`, time: `3 hrs` },
          ],
          upper: [
            { name: `Jennifer Hall`, amount: `50`, rank: `Recent donation`, time: `16 mins` },
            { name: `Edythe Synder Sanders`, amount: `25`, rank: `Recent donation`, time: `36 mins` },
            { name: `Christopher Parsons`, amount: `10`, rank: `Recent donation`, time: `40 mins` },
            { name: `Christopher Youngman`, amount: `25`, rank: `Recent donation`, time: `50 mins` },
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

  audioMessage.src = audioSrc.session[lang] || `${BASE_PATHS.audio}/donation-english.mp3`;

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

let timer;
function handleAlert(message) {
  const parent = document.querySelector(".alert-message");
  const div = document.querySelector(".alert-div");
  const text = document.querySelector(".alert-message .alert-text");
  const close = document.querySelector(".alert-message .alert-button");

  if (parent.classList.contains("fadeOut")) {
    parent.classList.remove("fadeOut");
    div.classList.remove("zoom-out");
  }

  parent.style.display = "flex";
  text.innerHTML = message;

  close.addEventListener("click", () => {
    clearTimeout(timer);

    const adding = div.classList.add("zoom-out");

    text.innerHTML = "";
    parent.classList.add("fadeOut");

    timer = adding && setTimeout(() => {
      parent.style.display = "none";
    }, 1000);
  })

}

function renderCategory() {
  const categoryFlex = document.querySelector(".category .category-flex");

  if (!categoryFlex) return;

  categoryFlex.innerHTML = "";

  categories.forEach(div => {
    const category = document.createElement("div");
    category.classList.add("category-div");
    category.dataset.id = div.name;

    category.innerHTML = `
            <div class="category-image"><img src="${div.image}"  alt="${div.image}"></div>

            <p class="category-name">${div.name}</p>
       `

    categoryFlex.appendChild(category);
    category.addEventListener("click", (e) => {
      if (category.dataset.id === "Memorial" || category.dataset.id == "Medical") {
        return;
      } else {
        handleAlert(`The needs here have already been met, lives have been touched, and hearts have been healed thanks to the kindness of people like you 
        <br/>
<span></span>
Tears have turned into smiles, and homes once heavy with worry now echo with hope. But life never stops calling for compassion. Soon, new stories will arrive - and your heart could be the first to answer them.
<br/>
<span></span>
Check back soon to meet the next story you can change.
`);
      }
    })
  });
}

function handleStoryClick(e) {
  const storyCategory = e.target.closest(".story-category");
  const storyDiv = e.target.closest(".story");

  if (!storyCategory || !storyDiv) return;

  const storyType = storyCategory.dataset.id;
  const titleDiv = storyDiv.querySelector(".story-info .story-title");

  if (!titleDiv) return;

  const storyTitle = titleDiv.textContent;

  const type = stories.find(cart => cart.name === storyType);

  if (!type) return;

  const story = type.stories.find(story => story.title === storyTitle);
  if (!story) return;

  viewDonation(story);
}

function renderStories() {
  const storiesSection = document.querySelector("section.stories");

  storiesSection.innerHTML = "";

  stories.forEach(category => {
    const title = `${category.name} Fundraisers`;
    const preview = category.stories.slice(0, 3);

    const parent = document.createElement("div");
    parent.classList.add("story-category");
    parent.dataset.id = category.name;

    parent.innerHTML = `
                <h2 class="story-category-title">${title}</h2>

                <div class="stories">
${preview.map(el => {
      const story = `<div class="story">
                        <div class="story-image"><img src="${el.images[0] || "${BASE_PATHS.images}/logo.jpg"}" alt=""></div>

                        <div class="story-info">
                            <p class="story-location">${el.location}</p>
                            <p class="story-title">${el.title}</p>
                            <div class="wrapper">
                                <div class="meter" style="width:${el.percentage}"></div>
                            </div>

                            <p class="story-amount-raised">€${el.raised} raised</p>
                        </div>
                    </div>`
      return story;
    }).join("")
      }
                </div>

                <button class="see-more" title="See More">See more   ></button>
            </div>`;

    storiesSection.appendChild(parent);
  })

  document.querySelectorAll(".story").forEach(story => {
    story.addEventListener("click", (e) => {
      handleStoryClick(e);
    })
  })

}

function handleScroll(element) {
  const parent = element;
  if (!parent) return;

  const container = parent.querySelector(".container");
  container.addEventListener("scroll", () => {

    const bottom = container.querySelector(".bottom-buttons");

    if (bottom) {
      const buttonDiv = container.querySelector(".donation-buttons");

      const rect = buttonDiv.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        bottom.style.display = "flex";
      } else {
        bottom.style.display = "none";
      }
    };
  });
}

function viewDonation(donation) {
  const modal = document.createElement("section");
  modal.classList.add("donation-viewer", "moveUp");

  //for just donated:
  // const contains = donation.donations.includes("K") ?
  //   donation.donations.slice(0, donation.donations.length - 1) : donation.donations;
  // const math = (parseInt(contains[0]) * 1000) + (parseInt(contains[2]) * 100);

  // const donations = donation.donations.includes("K") ? math : parseInt(donation.donations);

  
  //for donators preview:
  const preview = donation.just.top;
  const all = [preview, donation.just.upper, donation.just.others];
  console.log(preview);

  modal.innerHTML = `
    <div class="container">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="cancel" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"></path>
</svg>

        <div class="image">
            <img src="${donation.images[0]}" alt="" class="view-image">
        </div>

        <h2 class="title">${donation.title}</h2>

        <div class="donation-details">
            <div class="left">
<div class="upper">
            <p class="amount-raised">€${donation.raised} <span class="small">raised</span></p>
            </div>
            <div class="lower">
               <p class="goal">€${donation.target} goal</p> • <p class="donations">${donation.donations} donations</p>
                </div>
            </div>

            <div class="percentage-div">
                <svg>
                <circle cx="50%" cy="50%" r="35" class="progress-bg"/>
                <circle cx="50%" cy="50%" r="35" class="progress-bar" />
                </svg>
                <p class="percentage">${donation.percentage}</p>
            </div>
        </div>

        <div class="donation-buttons">
            <button class="share">Share</button>
            <button class="donate">Donate now</button>
        </div>

        <div class="organizer">
            <div class="user-svg"><img src="/src/svg/person.svg" alt="user svg"/></div>

            <p class="organizer-name">${donation.organizer} ${donation.organizer.includes(" and ") ? "are" : "is"} organizing this donation</p>
        </div>

        <div class="tag">
            <div class="inner">
                <div class="icon"><img src="/src/svg/shield2.png" alt="donation-protection svg"/></div>
                <p class="tag-text">Donation protected</p>
            </div>
        </div>

        <div class="donation-description">
            <p class="description-text">${donation.description}</p>
             <div class="read-more-div">
            <button class="read-more">Read more</button>
            </div>
        </div>

    <div class="second-section">
        <div class="reactions">
            <div class="add-reaction"><img src="/src/svg/Heart-Plus.svg" alt="add-reaction svg"/></div>

            <div class="reaction-emoji">
                <span class="hand">🙏</span>
                <span class="heart">❤️</span>
                <span class="love-green">💚</span>
                <span class="flower">🌹</span>
                <span class="clap">👏</span>
                <p class="react-numbers">31</p>
            </div>
        </div>

        <div class="gallery">
            ${donation.images.map(image => {
    return `<img src="${image}" alt="${donation.title}" class="view-image">`
  }).join("")}
        </div>

     <div class="image-buttons">
            <button class="donate">Donate</button>
            <button class="share">Share</button>
        </div>
    </div>
    
    <div class="donators-info">

        <div class="top">

            <p class="title">Donations <span class="donation-count">(${donation.donations})</span></p>

            <div class="see-top">
            <span class="star">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg></span>
            <p class="text">See top</p>
            </div>
        </div>

        <div class="others">
            <div class="top">
                <div class="trend">
<svg width="200%" height="200%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 18.5L11.5 10.5L13.5 14.5L20.5 6.5" stroke="var(--link)" stroke-width="3"/>
<path d="M20.5 11V6.5H16" stroke="var(--link)" stroke-width="3"/>
</svg></div>
                <p class-others-top-text">${donation.just.number} people just donated</p>
            </div>

        <div class="people">

        ${preview.map(div => {
         return `<div class="people-div">
                <div class="people-icon">
<svg class="svg-icon" style="width: 1.0498046875em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1075 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M0 409.648841a51.19593 51.19593 0 1 1 102.39186 0v563.155229a51.19593 51.19593 0 0 1-102.39186 0V409.648841z" fill="#313645" /><path d="M83.602954 589.192967A51.19593 51.19593 0 0 1 18.788906 509.941668L142.324685 408.77851a153.58779 153.58779 0 0 1 155.840411-23.14056L433.117567 441.287926c93.278984 40.598372 130.140054 112.119087 91.640715 195.670844-40.956744 89.080918-136.385957 92.920613-263.761431 32.765395a51.19593 51.19593 0 1 1 43.721324-92.562241c82.681427 39.011299 117.597051 37.629008 127.068298 16.945852 12.082239-26.109924 5.221985-39.420866-38.601731-58.516947L259.153797 480.299224a51.19593 51.19593 0 0 0-51.912673 7.67939l-123.63817 101.214353z" fill="#313645" /><path d="M837.36063 517.518665c69.524073-31.639085 130.856797-26.109924 167.66667 26.877863 44.386871 63.841325 20.273588 127.42667-37.219441 181.233592-21.143919 19.761629-129.372115 104.593285-331.852017 260.433696a153.58779 153.58779 0 0 1-144.577307 23.191756l-310.605706-109.047331a51.19593 51.19593 0 1 1 33.942901-96.606719l310.605707 109.04733a51.19593 51.19593 0 0 0 48.124174-7.679389c196.541175-151.232777 307.073188-237.958682 324.428608-254.187792 24.932418-23.294148 30.307991-37.475421 23.038168-47.919391-3.327735-4.812417-11.621476-5.631552-39.062494 6.860255l-297.85792 152.359088a51.19593 51.19593 0 0 1-38.908907 3.174147l-278.557055-89.080918a51.19593 51.19593 0 0 1 31.178322-97.528246l258.48825 82.63023 281.168047-143.758171zM752.938541 317.0866l97.272267-97.272267a68.756134 68.756134 0 1 0-97.272267-97.221071L716.743019 158.83998l-36.195523-36.246718a68.756134 68.756134 0 1 0-97.272266 97.272267l97.272266 97.272267c9.727227 9.727227 22.679797 14.949212 36.195523 14.949211a50.888754 50.888754 0 0 0 36.195522-15.000407zM922.601853 50.253413a171.147994 171.147994 0 0 1 0 242.054357l-97.272267 97.272266c-29.18168 29.18168-68.141783 44.950026-108.586567 44.950027s-79.456083-15.819542-108.586567-44.950027l-97.272267-97.272266A171.147994 171.147994 0 0 1 716.743019 22.505219a171.250386 171.250386 0 0 1 205.807638 27.696998z" fill="#313645" /></svg>
                </div>
                <div class="people-details">
                    <p class="people-name">${div.name}</p>
                    <p class="people-under">
                        <span class="people-price">€${div.amount}</span> • ${div.rank ? `<span class="status-type">${div.rank}</span>` : `<span class="status-time" > ${div.time}</span>`}
                    </p>
                </div>
            </div>`
        }).join("")}
        </div>

        </div>

        <button class="see-all-btn">See all</button>
    </div>
    
    <div class="bottom-buttons moveUp">
        <button class="share">Share</button>
        <button class="donate">Donate</button>
    </div>
</div>

    `;


  document.body.appendChild(modal);

  //for closing the donation viewer:
  let timer;
  document.querySelector(".container .cancel").addEventListener("click", () => {
    modal.classList.toggle("fadeOut");

    timer = setTimeout(() => {
      modal.remove();
    }, 1000);
  });

  //for donation percentage:
  const circle = document.querySelector("div.percentage-div");
  const bar = document.querySelector(".percentage-div circle.progress-bar");
  const text = document.querySelector(".percentage-div .percentage");
  const r = 35;
  const circumference = 2 * Math.PI * r;
  bar.style.strokeDasharray = circumference;
  bar.style.strokeDashoffset = circumference

  const number = parseInt(donation.percentage.slice(0, 2));

  const percent = Math.min(100, Math.max(0, number));
  //::::
  const dashOffset = circumference - (percent / 100) * circumference;

  bar.style.strokeDashoffset = dashOffset;
  text.textContent = `${percent}%`;


  //for reading more info:
  document.querySelector("button.read-more").addEventListener("click", (e) => {
    const des = modal.querySelector("p.description-text");

    const viewing = des.style.maxHeight == "max-content";

    if (!viewing) {
      des.style.maxHeight = "max-content";
      e.target.textContent = "Read Less"
    } else {
      des.style.maxHeight = "250px";
      e.target.textContent = "Read More";
    }
  });

  //for viewing images in full screen:
  modal.querySelectorAll("img.view-image").forEach(image => {
    image.addEventListener("click", (e) => {

      const src = e.target.src;
      const alt = e.target.alt;

      const imageDisplayer = document.createElement("div");
      imageDisplayer.classList.add("image-displayer", "moveUpNfadeIn");

      imageDisplayer.innerHTML = `
       <span class="cancel-display">X</span>
        <img src="${src}" alt="${alt}" class="display-image">
      `;

      document.body.insertAdjacentElement("beforebegin", imageDisplayer);

      document.querySelector("span.cancel-display").addEventListener("click", () => {
        imageDisplayer.remove();
      })
    });


  })

  // for bottom button animation:
  handleScroll(modal);
};

document.addEventListener('DOMContentLoaded', () => {
  const language = navigator.language;
  const lang = language.toLowerCase().substring(0, 2);

  handleAudio(lang);
  renderCategory();
  renderStories();
});