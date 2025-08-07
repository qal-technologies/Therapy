
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
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
    ]
  },
  {
    name: "Environment",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
    ]
  },
  {
    name: "Memorial",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
    ]
  },
  {
    name: "Education",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
    ]
  },
  {
    name: "Animal",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
    ]
  },
  {
    name: "Faith",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
    ]
  },
  {
    name: "Family",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
    ]
  }, {
    name: "Community",
    stories: [
      {
        images: ["/src/images/logo.jpg",], location: "Tallahassee, FL", title: "Being Weezy Ain't Easy - Help Jessie Get New Lungs", target: "50K", raised: "233,563", donations: "7.7K",
        percentage: "99%", description: "Very long description", organizer: "Josh Blood", just: {
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
        images: ["/src/images/logo.jpg",], location: "Monoroeville, PA", title: "Support Tracey's Fight Against Severe Illness", target: "25K", raised: "24,086", donations: "314",
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
        images: ["/src/images/logo.jpg",], location: "Goochland, VA", title: "Support Parker Forcke's Fight Against Stage 4 Colon Cancer", target: "40K", raised: "35,483", donations: "332",
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
                        <div class="story-image"><img src="${el.images || "/src/images/logo.jpg"}" alt=""></div>

                        <div class="story-info">
                            <p class="story-location">${el.location}</p>
                            <p class="story-title">${el.title}</p>
                            <div class="wrapper">
                                <div class="meter"></div>
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