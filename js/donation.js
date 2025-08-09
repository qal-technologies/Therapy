
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
        percentage: "96%", description: `My name is Mike, and I’m starting this fundraiser for my wife, Tracey.

Just a few weeks ago, we were living our normal life—raising our kids, working, doing what families do. Then, everything changed. Tracey became seriously ill and was hospitalized. What started as a suspected neurological issue quickly escalated into a life-threatening medical crisis.

She is now in the ICU, receiving treatment for a rare condition called transverse myelitis, and most recently severe complications affecting her heart—including myocarditis. She is on IV medications, a dopamine drip, and potentially life-saving immunosuppressants.

We are trying to stay hopeful, but we are also preparing for the long road ahead. Whether she stays in the hospital for weeks or comes home needing in-home care or rehabilitation and we’re just getting started.

I never thought I’d be doing something like this I’m trying to keep as much pride as possible, but we will need help. If you feel moved to support us—whether it’s $5 or simply by sharing this page—we are so grateful. Your help allows me to focus on my wife and our children during the most difficult time of our lives.

From the bottom of my heart, thank you.
—Mike`, organizer: "Mike Warywoda", just: {
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
        percentage: "89%", description: `On June 18th, our lives were turned upside down. My 23-year-old son, Parker Forcke, was diagnosed with Stage 4 colon cancer. It has metastasized to his liver, lymph nodes, and 3 of his bones. He has a huge fight ahead of him. We never thought in a million years that we would ever have to ask for help. It has truly humbled us.

We don’t know what the future holds, but we know one thing: Parker is going to fight like hell. He is a believer, and he knows that God has him no matter what. Anyone who knows him knows he is one amazing human being. He has been through a lot in his short life. His father passed unexpectedly when he was only 4 years old. He grew up always wanting to take care of me and his little sister. He has grown into such a wonderful young man. Parker is a hard worker; he is kind, compassionate, and would give the shirt off his back to anyone in need.

We know there will be expenses that we cannot afford. Cancer treatments are incredibly expensive, involving chemotherapy, targeted therapy, surgeries, immunotherapy, and more. My insurance is not the greatest, so this fund will help us to pay for things that are not covered, copays, high deductibles, and medication expenses. He has already made one trip to New York City to meet with a top colon cancer doctor from Cornell University, who has agreed to take Parker on. Flights for us, hotel rooms, meals, etc., will add up quickly. We are hoping his treatments and scans will continue to be performed locally by another center that the Cornell doctor has agreed to work with. At this time, we believe anything surgical will be performed in New York. We are working through the details of what will be covered in-network and what won’t. The important thing is for my son to get the best possible care we can find, no matter the cost.

As most of you know, Parker is a successful business owner of Forcke Enterprises. Landscaping and Property Management is his passion. He takes his work very seriously and, with the help of his team, he plans to keep things operating throughout his journey. Please continue to reach out to him for your property service needs, which will also help to support him and his team while he is battling this.

We truly believe that Parker will beat this thing. God has something greater planned for him. He is going to have one heck of a testimony to share with others when this is over. If you are able to help with this fundraiser, we will be forever grateful. If not, that’s okay too. We just ask that everyone please keep him, his girlfriend Rylee, and our family in your prayers during the biggest fight of his life… and please share this with anyone and everyone you know. May God bless you and your family with good health, as I hope and pray that none of you are ever faced with this horrible disease. Thank you.`, organizer: "Stacey Forcke", just: {
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
        percentage: "98%", description: `Dear Friends, Jazz Family & Colleagues,
As you may have heard, my mom, NEA Jazzmaster Sheila Jordan, is not doing well. She is no longer at the Actors Fund Nursing Home, where she received 100 days of excellent round-the-clock care. It truly is a wonderful organization. She is now at home under hospice care through her Medicare coverage. Unfortunately, Medicare only provides 10 hours of Home Hospice Care Aide services per week. Per WEEK!

As a result, we have been paying out of pocket for a private Home Care Aide to come during the day for a few hours, and I've been spending the remainder of the time nursing my mom since July 7th. The emotional toll of watching my mom's health decline is immense, and I'm physically and emotionally exhausted while being financially drained.

A few of my mom’s friends have been incredibly supportive, either by donating funds or offering to spend a few nights or afternoons with her, or both. I am deeply grateful for these recent donations. But unfortunately, it’s not enough.

The healthcare system in our country is broken. Medicare limits her health-care coverage and doesn’t come close to covering our expenses.

My mom is a living bridge to the great musicians who created Bebop and beyond, and she has treated her legacy with deep respect and generously passed on her transformative message to thousands of grateful people.

At this point in her long and full life, she now needs us to show her our love. Your support could make a significant difference in my mom's life, ensuring she receives the best care possible. Thank you in advance for your time and consideration.`, organizer: "Tracy Jordan", just: {
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
        percentage: "85%", description: `I am Shanika, the granddaughter of 107-year-old Madie. Many of you may know her as Grandma Madie, a very well-known social media sensation. She has gone viral in several videos on TikTok, Facebook, and Instagram. Madie was born in December of 1917. Yes! That would make her 107, and if it’s God’s will, in December she will be 108. Madie was a woman who worked all her life and retired at the age of 85. She loved working. My grandma had one child who preceded her in death many, many years ago. That left her to raise me and my three brothers by herself. She did this without a complaint, and she was 76 years old starting all over again. That didn’t stop her from showing us love and support until we were able to do for ourselves.

However, within the last week, Madie has been facing some health challenges. She has been in and out of the hospital, which has now led her to be in hospice care at home 24/7. As her health has now been on the decline, I want to start preparing for her transition. Madie has insurance, but unfortunately, it’s not enough to fulfill her wishes of getting her back home to Vidalia, GA, where she was born, to be buried next to her mother, whom she loved so much. I am praying that the Lord touches the hearts of the people who genuinely loved my grandma to help her fulfill her wishes.`, organizer: "Shanika Bradshaw", just: {
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
        percentage: "54%", description: `Hello Everyone,


It is with heavy hearts that we share the tragic passing of our beloved Leticia Placencia Alvarado, aka Letita, a daughter, wife, cousin and friend. Letita was taken from us far too soon.

On August 4th, 2025, at approximately 6:30 PM, Letita was just five minutes away from home when her vehicle was struck head-on by a grey BMW driving in the wrong lane. Tragically, she was pronounced deceased at the scene. Her sudden loss has left our family completely devastated.

Letita was full of life, love, and kindness. She had a smile that could light up any room and a heart that was always ready to help others. Her sudden passing left in void that words cannot fill.

We are asking for your help to cover the the funeral and memorial expenses during this incredibly difficult time. Any amount, no matter how small, will help us honor her memory and say goodbye in the way she deserves.

Thank you for all your love, prayers and support.

With Gratitude & Love,

The Alvarado, Placencia, Hernandez Family.`, organizer: "Wendy Perez", just: {
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
        percentage: "87%", description: `With heavy hearts, we mourn the passing of our beloved Naomi Alene, daughter of Ketema Alene and Solome Tsehay, and sister to Nazrawi, Nehemiah, and Nava. Naomi was a bright light: loving, full of life, and cherished by all who knew her. Though her time with us was brief, we treasure the beautiful memories we shared with her and the gift from God she was to us all.

We are raising funds to help cover funeral and related expenses during this difficult time. Any contribution, big or small, is deeply appreciated.

May the Father of mercies and the God of all comfort be near to all who are devastated by this tragic and untimely loss.`, organizer: "Dawit Agonafer", just: {
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
        percentage: "70%", description: `Help Lay 12-Year-Old Brisley Reyes to Rest After Tragic Accident

It is with broken hearts that we share the devastating loss of 12-year-old Brisley Reyes, a kind and hard-working boy whose life was tragically cut short on August 2nd, 2025 after being struck by a vehicle while riding his electric bike with his dad.

We are asking for your support to help Brisley’s grieving family with funeral and burial expenses during this unimaginable time. No parent should ever have to bury their child, and the burden of unexpected funeral costs only deepens the pain.

All funds raised will go directly to Brisley’s family to cover funeral arrangements, burial costs, and support them in the days ahead as they navigate this tragic loss.

If you’re unable to donate, please consider sharing this page and keeping Brisley’s family in your prayers.`, organizer: "Olga Reyes Gramajo and BRISLY REYES", just: {
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