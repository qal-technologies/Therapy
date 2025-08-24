

document.addEventListener('DOMContentLoaded', () => {
    const BOOK = {
        title: 'Compagnon Féminin',
        pages: [
            `<img src="/src/images/book1.jpg" alt="cover-page" class="cover-page"/>`,

`<p>---</p>`,
`
<div class="inner-content flex center-self text-center fx-top-30p  align-center">
    <h1 style="margin-bottom:-5px;">COMPAGNON FÉMININ</h1>
    <p class="text-center">A Journey Through Womanhood, Healing, and Hope</p>
</div>

    <div class="inner-content fx-btm-5p text-center justify-center align-center">
        AUTHOR
        <h3>Charlotte Casiraghi</h3>
</div>`,


            `
<br/>
<br/>
<p>
<b>Copyright, © 2025 by Charlotte Casiraghi.</b>
<br/>
<span style="font-style:italic;">All rights reserved.</span>
</p>


<br/>
<p>
<i>First Edition.</i> 
<br/>
No part of this book may be reproduced without permission. 



<br/>
<br/>
<br/>

<b>Published by Monaco Press,</b>
<br/>
Avenue du Palais, Monaco.
<br/>
<br/>

<b>Printed in France.</b>
<br/>
<i>Library of Congress Cataloging-in-Publication Data forthcoming.</i>
</p>
`,

            
            `
            <h1>DEDICATION</h1>

• To the silent ones. <br/>
• To the women who cry behind closed doors.<br/>
• To the ones who stayed strong for too long.<br/>
• To the souls whoever felt invisible, unloved, or forgotten.

<br/>
<br/>
This is your book.
<br/>
I wrote it with trembling hands and an open heart,for you.


            `,
            `
            <h1>EPIGRAPH</h1>
And the day came when the pain to remain the same was greater than the fear to change.
<br/>
— Anaïs Nin
            `,

            `<h1>Foreword</h1>

<p>
<b>by Gabriela Ramos</b>
<br/>
<i>Assistant Directorate<br/>
General for Social and Human Sciences, UNESCO
</i>
</p>

----
<br/>
<p>
When I first met Charlotte Casiraghi at UNESCO's World Philosophy Day, she spoke with such grace and conviction about the importance of inner growth that I felt immediately drawn to her vision. She sees philosophy not as an abstract pursuit, but as a living practice, one that can help each of us understand ourselves and heal. In <b>Compagnon Féminin</b>, Charlotte has channelled that vision into a profound companion for women at every stage of life.
</p>

As you turn these pages, you will feel the presence of a friend who understands your fears, honours your strength, and speaks to your deepest desires. 
`,
            `
            <p>Charlotte combines her scholarly insight with intimate storytelling, inviting readers into a shared space of reflection and growth. Whether she is drawing wisdom from ancient thinkers or recounting the lessons she learned in the quiet of early mornings, her words offer guidance and compassion in equal measure.
            </p>

            <p>In my work with UNESCO, I have seen how giving people especially young women access to knowledge and a sense of purpose can transform communities. That same spirit animates this book. Charlotte invites us to embrace our own stories, to find meaning in our struggles, and to cultivate resilience and joy. She speaks to us not as an expert on a pedestal, but as a fellow traveller. The result is a deeply personal and yet universal guide: a reminder that healing and empowerment are possible for everyone, regardless of our circumstances.
            </p>

May Compagnon Féminin be the gentle hand that accompanies you through your hardest days and your brightest mornings. I believe these pages will become a refuge, a source of courage, and a cherished companion for women everywhere.`,
            `
            <h1> Preface</h1>
This book was born from a place of inquiry and compassion—a desire to weave together the threads of my own experience into a companion that could travel with other women on their journeys. Over the years, I found myself asking the same question: how can we remain grounded in our own truth while navigating the complexities of modern womanhood? How can we honour our past, heal our pain, and create a life that is deeply our own?

<p>
I grew up in an extraordinary world of elegance and tradition, one forever marked by the early loss of my father. My childhood oscillated between the polished grandeur of royal halls and the quiet, dusty arenas where I learned to ride horses. Those horses became my sanctuary and teachers. In their eyes, I found a mirror for my own fears and strengths; in their gallop, I learned the discipline and grace that carry a woman through life.
</p>


            `,
`
<p>
Later, as I studied philosophy in Paris, the questions deepened. I realised that I realised that philosophy—a  discipline that seeks to make sense of life had the power to speak directly to the heart.
</p>
        
Rather than remaining a purely intellectual pursuit, philosophy became a lens through which I began to understand grief, love, courage, and the importance of listening to our inner voice. These explorations led me to co-found Les Rencontres Philosophiques de Monaco, an open forum for discussing ideas that matter. It also led me here, to these pages.

<p>
Throughout this book, I share lessons and reflections drawn from my own path and from the wisdom of thinkers, poets, and everyday heroines. My goal is not to prescribe a one-size-fits-all solution but to offer a companion for the many seasons of life. We will explore sorrow and joy, strength and vulnerability, solitude and connection. 
</p>
 `,

            `
<p>
We will walk through the forests of healing and emerge with tools to cultivate confidence and purpose. Most of all, I hope these chapters remind you that you are never alone—that your experiences, however difficult or hidden, are understood and shared by women across the world.
</p>

<p>
When I reflect on my journey so far-from the balmy evenings of Monaco Rose Ball to the early-morning arena runs, from the rigour of philosophy lectures to the quiet moments of parenting I see not a princess fleeing her destiny, but a woman embracing it on her own terms.
</p>

I see someone who sought freedom and found it not by escaping the past but by integrating it, transforming pain into wisdom and tradition into personal meaning.

<p>
If this book encourages you to do the same if it helps you to heal deeply, to live authentically, and to love boldly then I am grateful. My wish is for Compagnon Féminin to be a guide and a gentle friend, accompanying you through the peaks and valleys, holding space for your sorrow and celebrating your joy.</p>`,
            
            `
            <h1>Acknowledgments</h1>

I owe thanks to many who made this book possible:

<p>
<b>Family:</b> My mother, Princess Caroline, and my siblings Andrea, Pierre, and Alexandra, for their love and guidance; my grandmothers Grace and Jacqueline, whose legacies inspire me.
</p>

<p>
<b>Children:</b> My sons Raphaël and Balthazar, who bring daily purpose to my life.
</p>

<p>
<b>Mentors and Friends:</b> Albina du Boisrouvray (godmother) for her unwavering support of humanitarian causes; Julia Kristeva, whose friendship and mentorship in philosophy sustain me; Robert Maggiori, Joseph Cohen, and Raphaël Zagury-Orly, co-founders of our philosophical meetings; Anne Dufourmantelle, whose memory lives on in our letters and essays.
</p>

<p>
<b>Equestrian Team:</b> My trainers Jean-Michel and Thierry Rozier, and everyone at the Longines Global Champions Tour, for teaching me strength and humility in sport.
</p>
`,
            `
<p>
<b>Academic and Creative Collaborators:</b> Professors at the Sorbonne and Catholic Institute of Paris; the teams at AnOther Magazine, Above, and The Independent; Chanel’s communications team for believing in my voice; the editors at Éditions du Seuil who brought Archipel des Passions to life.
</p>

<p>
<b>Philanthropic Partners:</b> The organizations for which I am honored to work-UNAIDS, FXB France (founded by Albina du Boisrouvray), UNICEF Monaco-and all who joined me on the Ever Manifesto project with Stella McCartney.
</p>
<p>
<b>Readers:</b> To every person who has ridden alongside me in spirit - thank you.
</p>
`,
            `<h1>TABLE OF CONTENTS </h1>
            <div class="inner-content">
<h4 style="text-align:left;">Introduction</h4>
– A warm welcome and assurance that the reader is part of a sisterhood
<br/>
– A promise of transformation and healing<br/>
– The author’s personal journey and why she wrote this book<br/>
</div>

<div class="inner-content">
<h4 class="text-left">Part I – Understanding Our Struggles</h4>
<h4>Chapter 1:</h4>
<span>
<b style="font-style:italic;">The Weight of the World</b> – When Sadness and Depression Overwhelm
</span>
<span>
<b style="font-style:italic;">Understanding Depression</b> – what it is and how it feels
</span>

<span>
<b style="font-style:italic;">Why Depression Hits Women Hard </b> – societal and biological factors
</span>
<span>
<b style="font-style:italic;">Finding the Name for the Pain</b> – recognizing symptoms and acknowledging the struggle
</span>
<span>
<b style="font-style:italic;">You Are Not Alone in This Darkness</b> – stories of others who have faced similar battles
</span>
<span>
<b style="font-style:italic;">A Glimmer of Hope</b> – the first signs of healing and resilience
</span>

<span>
<b style="font-style:italic;">Key Takeaways</b> – summarizing the chapter’s essential lessons
</span>

<br/>
<br/>
<h4>Chapter 2:</h4>
<span>
<b style="font-style:italic;">Alone in a Crowded World</b> – Coping with Loneliness
</span>
</div>
            `,
            `
<div class="inner-content text-left align-flex-start">


<span>
<b style="font-style:italic;">Maria’s Story: Feeling Alone in a Sea of People</b> – a relatable narrative
</span>

<span>
<b style="font-style:italic;">The Paradox of Digital Connection and Isolation</b> – how technology can both help and harm
</span>

<span>
<b style="font-style:italic;">What Does Loneliness Really Mean? </b> – defining different types of loneliness
</span>

<span>
<b style="font-style:italic;">
Why We Feel Lonely: Common Causes in Women’s Lives </b> – life circumstances that contribute
</span>

<span>
<b style="font-style:italic;">A Glimmer of Hope</b> – the first signs of healing and resilience
</span>

<span>
<b style="font-style:italic;">The Toll Loneliness Takes: Mind, Body, and Soul</b> – physical and emotional effects
</span>

<span>
<b style="font-style:italic;">Loneliness as Part of the Human Condition</b> – an evolutionary perspective
</span>

<span>
<b style="font-style:italic;">From Loneliness to Solitude: First Step Toward Healing </b> – embracing nourishing solitude
</span>

<span>
<b style="font-style:italic;">Practical Ways to Nourish Yourself in Solitude </b> – self-care practices
</span>

<span>
<b style="font-style:italic;">
Reaching Out: Rebuilding Authentic Connections </b> – making community and micro‑connections
</span>

<span>
<b style="font-style:italic;">Key Takeaways </b> – practical summary and encouragement
</span>

<br/>
<br/>

<h4>Chapter 3:</h4>
<span>
<b style="font-style:italic;">Heartbreaks and Hope</b> – Navigating Relationship Pain
</span>

<span>
<b style="font-style:italic;">
The Pain of Letting Go</b> – grieving the end of relationships
</span>
</div>`,
            
            `
            <div class="inner-content text-left align-flex-start">


<span>
<b style="font-style:italic;">
Losing Yourself in Love</b> – codependency and loss of identity
</span>


<span>
<b style="font-style:italic;">
When Love Turns Toxic</b> – recognising manipulation and abuse
</span>


<span>
<b style="font-style:italic;">
Fears of Abandonment and Rejection</b> – understanding deep-seated insecurities
</span>


<span>
<b style="font-style:italic;">
Guilt and Shame in Love</b> – addressing mistakes and self-blame
</span>


<span>
<b style="font-style:italic;">
A Woman’s Heart: Unique Challenges, Resilient Spirit</b> – cultural pressures and strength
</span>


<span>
<b style="font-style:italic;">
Rebuilding After Heartbreak</b> – steps for emotional recovery
</span>


<span>
<b style="font-style:italic;">
Finding Yourself Again</b> – reconnecting with your authentic self
</span>


<span>
<b style="font-style:italic;">
Setting Healthy Boundaries and Recognizing Red Flags </b> – protecting yourself in future relationships
</span>


<span>
<b style="font-style:italic;">
Trusting Love Again Without Losing Yourself </b> – opening up while staying grounded
</span>


<span>
<b style="font-style:italic;">
Reclaiming Self‑Worth and Inner Stability</b> – cultivating inner security
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – consolidating insights and next steps</span>

<br/>
<br/>

<h4>Chapter 4:</h4>
<span>
<b style="font-style:italic;">The Mirror of Self‑Doubt </b>– Understanding Low Self‑Esteem
</span>

<span>
<b style="font-style:italic;">The Quiet Voice of Self‑Doubt: How Low Self‑Esteem Manifests </b> – inner dialogue and behaviours
</span>
</div>
            `,

            `

            <div class="inner-content text-left align-flex-start">
<span>
<b style="font-style:italic;">
Unraveling the Roots of Self‑Doubt: Why We Feel “Not Enough” </b> – societal and personal factors
</span>

<span>
<b style="font-style:italic;">
The Silent Saboteur: How Self‑Doubt Steals Joy, Love, and Peace </b> – consequences of low esteem
</span>

<span>
<b style="font-style:italic;">Turning the Mirror: From Self‑Criticism to Self‑Compassion</b> – shifting mindsets
</span>

<span>
<b style="font-style:italic;">
Meet Your Inner Critic and Challenge Her Lies </b>– identifying and confronting negative self‑talk
</span>

<span>
<b style="font-style:italic;">
The Power of Self‑Compassion and Inner Validation</b> – learning to be on your own side
</span>

<span>
<b style="font-style:italic;">
Rewriting Your Story</b> – Seeing Your True Worth – reframing your personal narrative
</span>

<span>
<b style="font-style:italic;">
Initial Steps to Nurture Your Self‑Worth</b> – journaling, affirmations, and mindfulness practices
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – main points and exercises to remember
</span>
</div>

<div class="inner-content">
<h4 class="text-left">Part II – Laying the Foundation for Change (Mindset Shift)</h4>


<h4>Chapter 5:</h4>
<span>
<b style="font-style:italic;"> The Power of Your Mind</b> – Transforming Thoughts and Beliefs
</span>

<span>
<b style="font-style:italic;"> Opening Story</b> – The Harsh Voice Within – meeting the inner critic
</span>

<span>
<b style="font-style:italic;"> Beliefs Shape Emotions and Behaviour</b> – how thoughts influence reality
</span>

</div>
            `,

            `
            <div class="inner-content text-left align-flex-start">
<span>
<b style="font-style:italic;"> The Inner Critic</b> – Taming Your Harsh Inner Voice – identifying negative patterns
</span>

<span>
<b style="font-style:italic;"> The Psychological Power of Thoughts</b> – understanding cognitive distortions
</span>

<span>
<b style="font-style:italic;"> Fixed Mindset vs. Growth Mindset</b> – adopting a growth-oriented approach
</span>

<span>
<b style="font-style:italic;"> Identifying and Reframing Negative Thoughts</b> – tools for awareness and change
</span>

<span>
<b style="font-style:italic;"> Cultivating a Kinder, More Encouraging Inner Voice</b> – developing self‑support
</span>

<span>
<b style="font-style:italic;">
Metaphor</b> – The Mind as a Garden – tending to your mental landscape
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – recap and actionable tips
</span>

<br/>
<br/>
<h4>Chapter 6:</h4>
<span>
<b style="font-style:italic;">
The Heart Knows the Way</b> – Embracing Emotional Healing</span>

<span>
<b style="font-style:italic;">
What Emotional Healing Really Means</b> – defining true healing
</span>

<span>
<b style="font-style:italic;">
Why Unhealed Emotional Pain Lingers and Resurfaces</b> – the impact of unresolved wounds
</span>

<span>
<b style="font-style:italic;">
The Importance of Feeling Every Feeling (Fully and Safely)</b> – allowing emotions to move through
</span>

<span>
<b style="font-style:italic;">
Common Defense Mechanisms That Block Healing</b> – numbing, perfectionism, over‑functioning, and more
</span>


            </div>
            `,
            `
            <div class="inner-content text-left align-flex-start">
            <span>
<b style="font-style:italic;">
Listening to Your Inner Wisdom</b> – The Guidance Within – trusting your inner compass
</span>

<span>
<b style="font-style:italic;">
Tools and Practices for Emotional Healing</b> – journaling, therapy, creative expression, rituals, and support groups
</span>

<span>
<b style="font-style:italic;">
The Healing Power of Forgiveness and Compassion</b> – letting go and cultivating kindness
</span>

<span>
<b style="font-style:italic;">Key Takeaways</b> – synthesising insights
</span>

<br/>
<br/>

<h4>Chapter 7:</h4>
<span>
<b style="font-style:italic;">
Finding Meaning in the Wounds</b> – Growth Through Adversity
</span>

<span>
<b style="font-style:italic;">
Opening Story</b> – A Path Through Pain – introducing the theme of transformation
</span>


<span>
<b style="font-style:italic;">
The Lens of Suffering: Searching for Purpose in Pain</b> – reframing suffering
</span>

<span>
<b style="font-style:italic;">
The Hero’s Journey</b> – Turning Hurt into Strength – a narrative framework for resilience
</span>

<span>
<b style="font-style:italic;">
The Power of Storytelling</b> – Rewriting Our Narrative – shaping your own story
</span>

<span>
<b style="font-style:italic;">
Resilience and Post‑Traumatic Growth</b> – evidence and strategies for thriving after trauma
</span>

<span>
<b style="font-style:italic;">
Recognising the Gifts Hidden in the Wounds</b> – lessons and unexpected blessings
</span>

<span>
<b style="font-style:italic;">
Steps to Create Meaning out of Pain</b> – practical exercises for discovering purpose
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – highlights and encouragement
</span>
</div>
            `,

            `
            <div class="inner-content text-left align-flex-start">

            <h4>Chapter 8: </h4>

<span>
<b style="font-style:italic;">
            Healing from Depression and Anxiety</b>
</span>

<span>
<b style="font-style:italic;">
Understanding Depression and Anxiety</b> – differentiating and recognising signs
</span>

<span>
<b style="font-style:italic;">
A Holistic Approach to Healing</b> – integrating mind, body, and spirit
</span>

<span>
<b style="font-style:italic;">
The Role of Professional Support</b> – therapy, medication, and other treatments
</span>

<span>
<b style="font-style:italic;">
Lifestyle Changes for Emotional Health </b> – nutrition, exercise, and sleep
</span>

<span>
<b style="font-style:italic;">
Mindfulness and Relaxation Techniques</b> – meditation, breathing, and grounding practices
</span>

<span>
<b style="font-style:italic;">
Building a Support System</b> – trusted allies, support groups, and community
</span>

<span>
<b style="font-style:italic;">
Relapse Prevention and Self‑Monitoring</b> – maintaining progress
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – summarising essential practices
</span>

<br/>
<br/>
<h4>Part III – Taking Action: Transforming Your Life</h4>

<h4>
Chapter 9:</h4>
<span>Overcoming Loneliness and Building Connection</span>

<span>
<b style="font-style:italic;">
The Root of Loneliness</b> – understanding its origin
</span>


            </div>
            `,

            `
            <div class="inner-content text-left align-flex-start">

<span>
<b style="font-style:italic;">
Why We Struggle to Connect</b> – social anxieties and systemic obstacles
</span>

<span>
<b style="font-style:italic;">
Making Peace with Solitude</b> – learning to enjoy your own company
</span>

<span>
<b style="font-style:italic;">
Steps to Build Social Support</b> – practical strategies for creating community
</span>

<span>
<b style="font-style:italic;">
Deepening Existing Relationships</b> – nurturing and strengthening bonds
</span>

<span>
<b style="font-style:italic;">
Building New Friendships</b> – meeting people and cultivating trust
</span>

<span>
<b style="font-style:italic;">
Engaging in Community and Service</b> – finding purpose through helping others
</span>

<span>
<b style="font-style:italic;">
Healthy Boundaries and Communication</b> – maintaining balance in relationships
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – summarised guidance
</span>

<br/>
<br/>
<h4>Chapter 10:</h4>

<span>Empowering Your Romantic Relationships</span>

<span>
<b style="font-style:italic;">
Foundations of Healthy Love</b> – respect, trust, and shared values
</span>

<span>
<b style="font-style:italic;">
Communication and Conflict Resolution</b> – listening and expressing yourself
</span>

<span>
<b style="font-style:italic;">
Balancing Independence and Intimacy</b> – maintaining autonomy within closeness
</span>
</div>
            `,

            `
             <div class="inner-content text-left align-flex-start">

<span>
<b style="font-style:italic;">
Recognising and Managing Relationship Patterns</b> – breaking unhealthy cycles
</span>

<span>
<b style="font-style:italic;">
Creating a Shared Vision for the Future </b>– aligning dreams and goals
</span>

<span>
<b style="font-style:italic;">
Setting Boundaries and Expectations</b> – protecting mutual well‑being
</span>

<span>
<b style="font-style:italic;">
Growing Together as Individuals</b> – personal growth within partnership
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – closing reflections
</span>

<br/>
<br/>

<h4>Chapter 11</h4>

<span>Strengthening Bonds with Family and Friends</span>

<span>
<b style="font-style:italic;">
Understanding Family Dynamics</b> – origins of closeness and conflict
</span>

<span>
<b style="font-style:italic;">
Healing Old Wounds</b> – forgiveness, reconciliation, and acceptance
</span>

<span>
<b style="font-style:italic;">
Setting Healthy Boundaries with Loved Ones</b> – honouring yourself and others
</span>

<span>
<b style="font-style:italic;">
Building Trust and Understanding</b> – empathy and honest conversation
</span>

<span>
<b style="font-style:italic;">
Communication Tools for Difficult Conversations</b> – navigating sensitive topics
</span>

<span>
<b style="font-style:italic;">
Creating Meaningful Rituals and Traditions</b> – fostering connection
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – reinforcement of strategies
</span>
            </div>
            `,

            `

             <div class="inner-content text-left align-flex-start">
            <h4>Chapter 12:</h4>
            <span>
             Finding Purpose and Passion
</span>

<span>
<b style="font-style:italic;">
Why Purpose Matters</b> – the link between meaning and happiness
</span>

<span>
<b style="font-style:italic;">
Discovering Your True Passions</b> – exploring interests and natural talents
</span>

<span>
<b style="font-style:italic;">
Overcoming Fear and Doubt</b> – courage to pursue the unknown
</span>

<span>
<b style="font-style:italic;">
Aligning Actions with Values</b> – integrity and authentic living
</span>

<span>
<b style="font-style:italic;">
Designing a Life of Meaning</b> – strategic planning for fulfilment
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – distilled wisdom and next steps
</span>

<br/>
<br/>

<h4>Chapter 13:</h4>

<span>Reclaiming Confidence and Self‑Worth</span>

<span>
<b style="font-style:italic;">
Recognising Your Inherent Value</b> – understanding self‑worth
</span>

<span>
<b style="font-style:italic;">
Tools for Building Confidence</b> – affirmations, achievements, and body language
</span>

<span>
<b style="font-style:italic;">
The Role of Self‑Compassion</b> – supporting yourself through setbacks
</span>

<span>
<b style="font-style:italic;">
Overcoming Perfectionism and Comparison</b> – embracing imperfection
</span>

<span>
<b style="font-style:italic;">
Taking Up Space and Owning Your Voice</b> – asserting yourself gracefully
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – summary and encouragement
</span>
</div>
            `,
            `
             <div class="inner-content text-left align-flex-start">
            <h4>Chapter 14:</h4>
            
            <span>Sustaining Growth Through Emotional Resilience</span>

<span>
<b style="font-style:italic;">
The Nature of Resilience</b> – what it is and why it matters
</span>

<span>
<b style="font-style:italic;">
Emotional Regulation Strategies</b> – managing stress and difficult feelings
</span>

<span>
<b style="font-style:italic;">
Coping with Setbacks</b> – bouncing back from challenges
</span>

<span>
<b style="font-style:italic;">
Creating a Supportive Environment </b>– building networks and resources
</span>

<span>
<b style="font-style:italic;">
Practising Self‑Care and Renewal</b> – maintaining mental and physical health
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – sustaining long‑term progress
</span>

<br/>
<br/>

<h4>Chapter 15:</h4>

<span>Living the Change, Becoming the Woman You Were Meant to Be</span>

<span>
<b style="font-style:italic;">
Integrating Your Lessons</b> – making change permanent
</span>

<span>
<b style="font-style:italic;">
Creating a Vision for Your Life</b> – mapping out your next chapter
</span>

<span>
<b style="font-style:italic;">
Committing to Continuous Growth</b> – lifelong learning and evolving
</span>

<span>
<b style="font-style:italic;">
Celebrating Your Journey</b> – acknowledging achievements and milestones
</span>

<span>
<b style="font-style:italic;">
Supporting Others</b> – being a light for fellow travellers
</span>

<span>
<b style="font-style:italic;">
Key Takeaways</b> – concluding reflections
</span>
</div>
            `,

            `
               <div class="inner-content text-left align-flex-start">

               <h4>Conclusion</h4>

<span>
<b style="font-style:italic;">
A Letter to My Dear Friend</b> – a heartfelt farewell and invitation to continue the journey
</span>
            </div>
            `,
            `
            <h1>Introduction: You Are Not Alone</h1>

            <div class="inner-content text-left align-flex-start">

<p>Do you feel invisible? Overwhelmed by sadness when you wake up? Lonely even in a crowd? Heartbroken or struggling in your relationships? If you are nodding silently, dear reader, you are not alone. In fact, you are part of a vast sisterhood of women who have felt these same aches in the soul. This book, Compagnon Féminin, was written for you – to be the gentle hand on your shoulder through the dark times and the encouraging voice that says, "Keep going, we will find the light together."</p>

<p>
From the very first page, I want you to feel a warm embrace, as if I'm right there with you. I may not know your name, but I know the pain and uncertainty that can fill a woman's heart, because I have lived through my own storms and have walked beside many women on their journeys.
</p>

<p>
As a philosopher and a mother, a friend and a lifelong student of life, I have seen how despair can turn into hope, how a seed of courage can crack open the hardest sorrow, and how no one is truly beyond healing. Consider this book your companion – one you can turn to on the loneliest nights or the hardest mornings. I promise, within these pages, you will find understanding, comfort, and real solutions.
</p>

            </div>
            `,
            `
             <h3>A Promise of Transformation</h3>
<p>
Let me start with a promise: change is possible, and you have more strength within you than you can imagine. No matter how deep a hole you feel stuck in right now, you can rise out of it. This book will guide you step by step, not with abstract theories but with tangible advice, exercises, and stories of others like you who found their way through. By the end of
</p>

<p>
our journey together, you will have not only healed wounds you once thought permanent, but also discovered new aspects of yourself – a stronger, more confident, more joyful you. This isn't an idle promise; I have seen it happen. I have seen women who thought their life was over bloom again like a phoenix rising from ashes. Your transformation can be just as real.
</p>

<p>
You might be thinking, "Is that really possible for me?" Or, "I've tried before and failed." It's natural to be skeptical – after all, life can be terribly hard. But sometimes the difference between those who overcome and those who remain stuck is not that one is more deserving or lucky, it's often having the right support and guidance. Think of this book as your support system in print form. I wrote it to be that trusty guide and friend you can
</p>

<p>
always carry with you. We will draw on deep insights from psychology and philosophy, but in a way that's easy to understand. More importantly, we will apply them to your daily life. With each chapter, you'll gain practical tools and comforting wisdom. It's like packing a toolkit for life's journey – and trust me, you'll want these tools when the road gets rough.
</p>

            `,

            `
            <h2>My Journey, Our Journey</h2>

<p>
Before we dive in, let me share a bit of why I’m here with you. As a young woman, I often faced my own demons of doubt and anxiety. There were days I looked in the mirror and did not recognize the smiling face I presented to the world; inside, I felt insecure and at times terribly alone. Coming from a well-known family and later engaging deeply with philosophy, people might assume I had it all figured out. But the truth is, every woman – no matter her background – encounters struggles. I have learned that pain is a universal human experience, uniting us in a way that transcends status or geography.
</p>

<span>In my life I sought answers in books, in conversations with wise mentors, and even in academic study of philosophy and psychology. But some of the most profound lessons came from personal experiences – falling and getting back up, losing and finding myself again, and witnessing the resilience of other women who shared their stories with me.
</span>

<p>
One such story stays with me: a dear friend (I’ll call her "A") who fell into a deep depression after losing her job – something she had tied her identity to for years. When we first talked, she whispered through tears that she felt like a failure and feared she would never feel happy again. But somewhere in that darkness, she found a tiny spark of fight. Together we explored small steps – a morning walk here, a journaling exercise there – and gradually, A found her way out of the fog. She not only recovered, she started a new career path that fulfilled her in ways her old job never did. Her story is just one example. Throughout this book, I will share more like it: of women who faced heartbreak, loneliness, self-doubt – and how they turned things around (to be detailed later)
</p>
            `,

            `
            <h1>Part I: Understanding Our Struggles</h1>
            <p>
<h3>Chapter 1</h3>
The Weight of the World – When Sadness and Depression Overwhelm
</p>

<p>
On a gray afternoon, Anna sat by her bedroom window, watching raindrops trail down the glass. It had been weeks since she lost her job – a career she had poured her soul into for nearly a decade. Since that day, something in Anna had crumbled. She woke each morning with a heavy ache in her chest, as if an invisible weight pressed down on her. The simplest tasks – brushing her hair, replying to a friend’s text – felt monumentally difficult. Instead of the ambitious, cheerful woman her friends once knew, Anna felt like a hollow shell of herself. One evening, her best friend called, concerned. Anna wanted to answer, but she just couldn’t find the energy. What’s wrong with me? she wondered, tears rolling silently. Why can’t I snap out of this?
</p>

<p>
Anna's story might resonate with you. Depression – often described as a "dark cloud" or a "deep hole" – can envelop even the brightest souls. It doesn’t always need a dramatic trigger; sometimes it creeps in slowly, other times it strikes after painful life events. What Anna felt – the numbness, the hopelessness, the exhaustion – these are common experiences for those living with depression. 
</p>

            `,

            `
            <div class="inner-content text-left align-flex-start">
If you have felt this way, take heart: you are far from alone, and nothing is wrong with you as a person. You are struggling with a condition that many others have faced.

            <p>In fact, women are about twice as likely as men to experience depression in their lifetime. This higher prevalence isn’t because women are “weaker” (a harmful myth) – it’s due to a mix of biological factors (like hormonal fluctuations) and social pressures (like the roles and stresses many women juggle).
            </p>


<h4>Understanding Depression</h4>
<p>
Depression is more than just feeling sad.

We all have sad days, days where we cry or feel down. Depression, however, is a persistent low mood and loss of interest or pleasure in things you used to enjoy, lasting for weeks or longer. It can also come with a variety of other symptoms: changes in appetite or weight (some people eat far less, others find themselves mindlessly snacking to escape their feelings), trouble sleeping (lying awake with anxious thoughts at 3 AM, or oversleeping and still feeling exhausted), difficulty concentrating or making decisions, and a general slowing down of your thoughts and movements. Some people describe it as moving through molasses – everything is effortful and nothing seems worth the effort. You might feel hopeless, as if nothing will ever get better, or helpless, as if you have no control.</p>

<p>In the worst moments, you might even wonder if life is worth living. If you have had thoughts of not wanting to exist or hurting yourself, please know that you matter, and those dark thoughts are symptoms of depression, not truths. </p>
</div>
            `,

            `
            <div class="inner-content text-left align-flex-start">
If they ever become intense, reach out for help – therapy, support groups, talking to friends – removing the stigma and loneliness of getting help.

<p>
            Depression can stem from many sources. Sometimes, like Anna, a specific event such as a job loss, a breakup, or grieving a loved one can trigger it. Other times it accumulates from smaller stresses – chronic pressure at work, caring for others without rest, or feeling unappreciated and unseen. There’s also a physiological side: changes in brain chemistry or hormones (for example, postpartum depression after childbirth is influenced by hormonal shifts). What’s important to remember is that depression is not your fault.
            </p>
            
            <p>You didn’t choose to feel this way, just as someone doesn’t choose to catch the flu or break a leg. Depression is a condition that can affect anyone – even those who “appear” to have a perfect life. Many famous artists, leaders, and yes, even princesses and philosophers, have struggled with it. It is not a sign of weakness or failure. In fact, recognizing that you’re depressed and getting through each day in spite of it is a sign of strength and resilience.
</p>

<p>Let’s return to Anna for a moment. As the days in her story passed, she stopped doing a lot of the things she used to love. She hadn’t touched her sketchbook in weeks. She ignored messages from friends because she felt she had nothing good to say. Depression has a way of isolating us – it tells us to withdraw, to hide, to be alone with our dark thoughts. Part of why it feels so heavy is because it convinces us that we are alone, that no one else can understand. If you hear that voice in your head, remember that it’s the depression talking, not reality. There are countless others feeling as you do right now.</p>
</div>
            `,

            `
            <div class="inner-content text-left align-flex-start">
<p>
In fact, according to mental health statistics, over 10% of women each year experience a major depressive episode. Think about that: out of every ten women you know, at least one (and likely more, since many never openly talk about it) is going through or has gone through something very similar. Millions of women globally are carrying that weight at this very moment. The faces you see smiling on social media might be hiding tears that were shed the night before. One beautiful (and heartbreaking) thing I’ve learned by talking to many women is how common our secret hurts are.
</p>

<p>
Depression often comes hand-in-hand with anxiety – those constant worries and fears that buzz in your mind. It’s not unusual if you find yourself anxious about the future or beating yourself up for the past; many women report a mix of depression and anxiety together. In Anna’s case, as her depression deepened, she also felt anxious about money, about whether she’d ever find another job, about how others were judging her. It’s like a one-two punch: the depression saps your energy and hope, and the anxiety needles you with fears.
</p>

<br/>
 <h4>Why Depression Hits Women Hard</h4>

<p>
It’s worth briefly exploring why women might be twice as likely to face depression. Part of it is biological – hormones can play a role in mood. Think of times like premenstrual days, postpartum period (after having a baby), and menopause; these are all moments of intense hormonal flux, and for some of us, mood swings or depression can be triggered then. There’s also the fact that women often shoulder enormous emotional burdens. Socially, women are often raised to be caretakers – we take care of children, partners, family members, often putting our own needs last. </p>
            </div>
            `,

            `
            <p>We might suppress anger or pain to avoid being seen as “difficult.” We may strive to meet high expectations at work while still being the primary caregiver at home. All this pressure can make one feel trapped and exhausted – a fertile ground for depression to take root if we don’t get support or relief.</p>


<p>
Society also sometimes sends messages that discourage women from prioritizing their mental health. You might have heard phrases like “stop being so emotional” or “she’s hysterical” used to dismiss women’s feelings. These unfair stereotypes might make you hesitate to seek help or talk about your sadness, for fear of seeming “weak” or “overly emotional.” Let’s set the record straight: emotions are human, and feeling deeply is not a flaw. Women often do express emotions more freely, which is actually a strength, not a weakness. It’s just that when those emotions become overwhelmingly painful, we need compassion and care, not judgment.
</p>
<p>
Another factor can be trauma. Unfortunately, many women experience some form of trauma in their lifetime – whether it's abuse, harassment, or violence. Such experiences can leave deep emotional scars that sometimes manifest as depression years later. If something bad happened to you and you’ve never really talked about it, it might be one piece of the puzzle in understanding your feelings. We will address healing from traumas in later chapters – you can heal, no matter how old the wound.
</p>
            `,

            `
            <div class="inner-content text-left align-flex-start">
            
            <h4>Finding the Name for the Pain</h4>
<p>
One of the first steps in easing the weight of depression is to acknowledge it and name it. When Anna finally admitted to herself, “I think I’m depressed,” it was a turning point. Up until then, she had been berating herself for being “lazy” and “weak.” She thought if she just tried harder, she could snap out of it. But you can’t muscle through depression by willpower alone – that’s like trying to lift a boulder with a broken arm. Once she recognized her condition for what it was, Anna began to treat herself with a bit more understanding. If you’ve been blaming yourself for feeling this way, try instead to speak to yourself as if you were talking to a beloved friend who is hurting. You wouldn’t tell your friend “Oh, just get over it, you’re so weak.” You’d likely say, “I’m sorry you’re going through this, I’m here for you. You will get through this.” You deserve the same kindness from yourself.
</p>

<p>
Sometimes reading about others’ experiences can bring a sense of relief. You might find yourself in descriptions of depression from literature or articles and think, That’s me, that’s exactly how I feel. It can be validating to know that this is a recognized condition with a name, and that others have felt the same despair, the same apathy, and have gotten better. Yes, depression is treatable. There are multiple paths to recovery – therapy, medication, lifestyle changes, social support, and self-help strategies (we’ll explore many of these in Part III when we focus on action). Many people who felt like life was not worth living at one point have gone on to rediscover joy and purpose. It doesn't mean they never feel sad again – sadness is part of life – but the overwhelming darkness can lift.
</p>
            </div>
            `,

            `
            <div class="inner-content text-left align-flex-start">

<h4>You Are Not Alone in This Darkness</h4>
<p>
Close your eyes for a moment and imagine all the other women who feel like you do. Maybe somewhere a young mother is sitting on the bathroom floor, feeling like she can’t handle another day. Maybe a college student is staring at her textbook, unable to focus past her tears. Perhaps an elderly woman in an empty house feels so lonely and down that she hasn’t eaten a proper meal in days. They may be different ages or backgrounds, but there’s a thread that connects all of you: a yearning for relief, for hope, for someone to say “I understand.” Consider this chapter and this book as that voice reaching out: I understand. So many of us do.
</p>
<p>
Even statistically, if depression affects about 5-6% of women worldwide at any given time, that’s tens of millions of women. Depression is one of the leading causes of disability for women in the world – meaning it’s not just you; it’s a societal and global health challenge that we all need to address openly and kindly. The reason I bring up these numbers is not to overwhelm you but to underline the point that you are truly not alone and that your suffering is seen, it’s real, and it matters.
</p>

<p>
Sometimes, knowing that what you’re feeling has a name and is shared by others can itself be a small relief. It’s not just "in your head" in the dismissive sense – though it is happening in your brain, it is a legitimate condition like any other. If you had asthma, you wouldn’t blame yourself for struggling to breathe; you’d hopefully get an inhaler or see a doctor. In the same way, depression might need some external help to improve – and there is absolutely no shame in that. In fact, asking for help when you’re hurting is a courageous act. 
</p>
</div>            
            `,

            `
            <div class="inner-content text-left align-flex-start">
            <p>We’ll talk more about how to reach out for professional help (like counseling or support groups) or peer support in the Action section of this book.</p>

<p>
            Before moving on, let's address a worry you may have: Will this sadness last forever? When you're in the depths of depression, it can feel eternal, like there's no light at the end of the tunnel. But depression is highly treatable, and even when it doesn’t disappear entirely, it can be managed to the point where you feel like yourself again and can enjoy life. The darkness does lift. Often it lifts gradually – small glimmers at first. You might find yourself laughing at something on TV and be surprised, "Wow, I laughed, maybe I can feel good for a moment." Or you wake up one day and realize you actually slept okay. These little improvements are signs of the dawn coming. With time, appropriate strategies, and support, people do emerge from depression. Think of it this way: every storm ends. The sky cannot rain forever.
            </p>

             <h4>A Glimmer of Hope</h4>
<p>Let’s peek ahead just a bit. Remember Anna, sitting in her dark room? Her story doesn’t end with tears by the window. In a later chapter, we will revisit Anna and see how she found a tiny spark of hope and followed it out of the darkness – step by step. *Spoiler alert* : she does not stay stuck forever. Not only does she find a new job, but more importantly, she finds herself again, piece by piece, and even discovers a new passion that she’d never pursued before. Her depression eventually became a chapter in her life, not the whole story.</p>
            </div>
            `,
            `
            <div class="inner-content text-left align-flex-start">
<p>For now, if you identify with Anna, I want you to do something small yet brave: promise yourself you will keep going. Even if it's one day at a time, or one hour at a time. You picked up this book, which tells me there is a part of you that hasn’t given up – a flicker of fight, however faint. I believe in that part of you. As we continue, we’ll build that flicker into a flame.
</p>

<p>
Before ending this chapter, take a moment to acknowledge how you feel. If you need to cry, let the tears come. Tears can be relieving; they’re not a sign of weakness but a natural way our bodies release emotion. You might even feel a bit lighter after a cry. If you have a journal or even a piece of paper, consider writing down a few of the thoughts that have been weighing on you. Sometimes getting them out of your head and onto paper can lessen their power. For example, you might write "I feel like I’m a burden to others," or "I’m scared I’ll never be happy again." Seeing these thoughts written down, you can start to question them gently (we’ll do more of that later). Are you truly a burden, or is that the depression making you underestimate your value? (Spoiler: you are absolutely not a burden – you are loved more than you likely know.) As for never being happy again – countless women who thought that during depression have later healed and felt joy return.
</p>

            </div>
            `,

            `
            <p>
            Each chapter in this first part will continue to unravel the tangle of feelings you might be experiencing. In the next chapter, we’ll talk about loneliness – which often goes hand in hand with depression. But before we go there, if all of this feels heavy, take a few slow, deep breaths now. Inhale for a count of four, hold for four, exhale for four. As you breathe out, imagine exhaling some of that heaviness. You are here, you are reading this, and you are taking steps – however small – towards healing. That, in itself, is a testament to your strength.
</p>
<br/>
            <div class="inner-content text-left align-flex-start">
<h4>Key Takeaways from Chapter 1:</h4>

<span>
Depression is a common and serious condition that many women experience; you are not alone or broken for feeling this way.
</span>

<span>
It often involves persistent sadness, loss of interest, fatigue, and negative thoughts that can distort how you see yourself and the world.
</span>

<span>
Women face unique pressures and biological factors that can contribute to depression, but depression is not your fault – it’s a condition that can be treated.
</span>

<span>
Naming what you’re going through (acknowledging “I am depressed and I need support”) is a courageous first step toward getting better.
</span>

<span>
There is hope. Depression is treatable, and many women who have felt as bad or worse than you do have recovered and found happiness again. This dark time is just one chapter, not your whole story.
</span>

            </div>
            `,

            `
<span>
With that gentle reminder, let's move forward. In the darkness of depression, loneliness often grows. In the next chapter, we will shine a light on loneliness – why we can feel utterly alone even in a connected world, and how understanding this feeling is the first step to overcoming it.
</span>
            
            `,

            `
            <p><h1>Chapter 2</h1> Alone in a Crowded World – Coping with Loneliness</p>

<h4 >
Maria’s Story: Feeling Alone in a Sea of People
</h4>

<p>
Maria steps onto the busy train platform at 8 AM. Commuters swirl around her – a blur of faces, earbuds, and hurried footsteps – yet Maria feels invisible. She clutches her phone, scrolling through social media feeds filled with smiling friends, happy couples, and family gatherings. How is it possible, she wonders, to be surrounded by so many people and still feel so utterly alone? The ache in her chest reminds her that despite the crowd, she has no one to truly talk to about her anxieties. Just last night she sat in her small apartment, the silence overwhelming, thinking “Is it just me? Why do I feel so lonely when everyone else seems connected?”</p>

<p>
Maria’s story may be fictional, but her experience is painfully real for so many of us. In today’s world, we can be physically shoulder-to-shoulder with others or digitally connected to thousands, and still feel isolated. Loneliness is a quiet epidemic lurking beneath our modern social bustle. We text and tweet and post, yet that deep sense of connection and belonging often remains out of reach.
Maria could be any woman – perhaps you, or someone you know – navigating the paradox of feeling alone in a crowded world.
</p>

            `,

            `
            <div class="inner-content text-left align-flex-start">
<p>
Her feelings highlight a profound truth: the presence of loneliness reflects the absence of connection, not the absence of people. You can feel lonely in a crowd, and in fact sometimes being surrounded by strangers only amplifies the feeling of isolation when you feel unseen.</p>

<h4>The Paradox of Digital Connection and Isolation</h4>

<p>
We live in an era of unprecedented digital connectivity. With a tap on a screen, we can connect with friends across the globe, follow countless lives, and never technically be “out of touch.” Yet many of us have never felt more alone. It’s the great paradox of our time: our phones ping constantly with notifications, but our hearts may ache with loneliness. Studies confirm what Maria sensed intuitively – more time spent on social media often correlates with greater feelings of loneliness and social isolation. One study found that the heaviest users of social media reported the highest levels of perceived social isolation. In other words, liking posts and scrolling feeds can’t fill the real need for companionship and understanding.</p>

<p>
Why would being more “connected” leave us feeling less connected emotionally? Part of the reason is that online interactions, while instant and plentiful, often lack the depth of face-to-face relationships. We present curated highlights of our lives online, which can inadvertently lead to comparisons and a sense of inadequacy. You might be chatting in group texts all day yet still miss having someone who truly listens and gets you. </p>
</div>
            
            `,
            `
            <div class ="inner-content text-left align-flex-start">

            <p>In this age when possibilities to connect are endless, many people ironically find themselves isolated and lonely, as the World Health Organization has noted. The Surgeon General of the United States put it poignantly: in our digitally connected world, we must ensure technology strengthens – not weakens – human connection.</p>

<p>
            For women especially, social media can become a double-edged sword. We might use it to keep up with friends and family, seeking community. Yet seeing constant images of others’ “perfect” lives can make us feel left out or “not enough,” heightening loneliness. A young woman scrolling through pictures of group outings she wasn’t invited to, or a new mother seeing posts of other moms who seem to be handling everything effortlessly, might withdraw further into feelings of isolation. The digital crowd can become a hall of mirrors that distorts reality: you see everyone but yourself having connections and happiness, which feeds the false belief that you’re the only one feeling lonely. In truth, you are far from alone – countless others are feeling exactly the same way, behind their own screens.</p>

            <h4>What Does Loneliness Really Mean?</h4>

            <p>
            Before we explore solutions, it’s important to understand what loneliness truly is – and isn’t. Loneliness does not simply mean being by yourself. You can feel intensely lonely in the company of others, or conversely, feel perfectly content alone on a quiet evening. Loneliness is best defined as the painful gap between the social connection you desire and what you feel you have. It’s an emotional state of disconnection. You might have many people around you, but if you feel that none of them really understand you or that you don’t belong, loneliness sets in.
            </p>
</div>
            `,

            `<div><p>the struggle continues. Resting now....</p></div>`,
            `<h1>About the Author</h1>
            
            <p>
            <b>Charlotte Casiraghi</b> (b. 1986) is a is a Monégasque public figure known for her diverse pursuits.  She serves on the boards of cultural and charitable organizations (including the Princess Grace Foundation and UNICEF Monaco) and is an advocate for youth education and women's empowerment.
            <br/>
            A former competitive show jumper, Charlotte also has a career in journalism and fashion media.  In 2015 she was appointed as an Ambassador for UNESCO's philosophy program.  She lives in Monaco and Paris with her two sons.
            </p>
            `,

            `<h1>
Other Works by the Author
            </h1>
            
<p>
<b>Archipel des Passions</b> (2018, essay dialogue on philosophy)
</p>

<p>
<b>Everlution</b> (2009, first issue of Ever Manifesto, co-founder)
</p>

<p>
<b>Ever Bamboo</b> (2011, second issue of Ever Manifesto)
(Note: Charlotte has written numerous articles for The Independent and AnOther Magazine and often pens prefaces for philosophical works.)
</p>
            `,
            `<div  class="cover-page"><p> This is the end page</p></div>`,
        ]
    };

    // DOM Elements
    const bookEl = document.getElementById('book');
    const leftEl = document.getElementById('leftPage').querySelector('.content');
    const rightEl = document.getElementById('rightPage').querySelector('.content');
    const pageIndicator = document.getElementById('pageInfo');
    const audioEl = document.getElementById('flipAudio');

    // ===== Responsive: single vs spread =====
    const mq = window.matchMedia('(min-width: 980px)');


    // helper methods:
    const qs = (sel, root = document) => root.querySelector(sel);
    const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];


    //////
    const PAGE_TURN_SOUND_SRC = '/src/audio/page-flip.mp3';
    const THUD_SOUND_SRC = '/src/audio/page-thud.mp3';
    const pageTurnSound = new Audio(PAGE_TURN_SOUND_SRC);
    const thudSound = new Audio(THUD_SOUND_SRC);


    const LAST = BOOK.pages.length - 1;
    const INTERIOR_COUNT = Math.max(0, BOOK.pages.length - 2);

    //state:
    let state = {
        page: 0,
        zoom: 1,
        soundOn: true,
        spread: mq.matches,
        bookmarks: [],
        total: BOOK.pages.length,
    };

    // Utils: =====>>>>>
    const clamp = (n, min, max) => {
        const number = Math.max(min, Math.min(max, n));
        return number;
    }
    const isCover = (idx) => idx === 0;
    const isEnd = (idx) => idx === LAST;


    // Configuration
    const NUM_PAGES = state.total;

    // --- State Management & Persistence ---
    function saveState() {
        localStorage.setItem('bookState', JSON.stringify(state));
    }

    function loadState() {
        const savedState = localStorage.getItem('bookState');
        if (!savedState) return;

        if (savedState) {
            state = { ...state, ...JSON.parse(savedState) };
        }
    }


    // creating pages======>
    function makePage(html, pageIdx) {
        const div = document.createElement('div');
        div.className = 'page-content content';
        const checks = isCover(pageIdx) || isEnd(pageIdx);
        
        const label = isCover(pageIdx) ? "" : isEnd(pageIdx) ? "" : `${pageIdx}`;
        const title = isCover(pageIdx) ? "" : isEnd(pageIdx) ? "" : BOOK.title;

        div.innerHTML = `
    ${!checks ?`<div class="page-top">
      <span class="chapter">${title}</span>
    </div>` : ""}

    ${checks? html :`<div class="page-middle">${html}</div>`}
    ${!checks ?`<div class="page-bottom">
      <span class="page-num">${label}</span>
    </div>` :""}
  `;
        return div;
    }

    // for indicators======>
    function setIndicator() {
        if (isCover(state.page)) {
            pageIndicator.textContent = "Cover Page";
            return;
        }
        if (isEnd(state.page)) {
            pageIndicator.textContent = "The End"
            return;
        }

        //for wider screen:=======>
        if (state.spread) {
            const leftIdx = state.page % 2 === 0 ? state.page + 2 : state.page + 1;
            const rightIdx = Math.min(LAST - 1, leftIdx + 1);

            const leftNum = leftIdx - 1;
            const rightNum = rightIdx - 1;

            pageIndicator.textContent = `${leftNum}-${rightNum} / ${INTERIOR_COUNT}`;
        } else {
            pageIndicator.textContent = `${state.page} / ${INTERIOR_COUNT}`;
        }
    }



    function applyLayout() {
        // loadState();
        state.spread = mq.matches;
        bookEl.classList.toggle('spread', state.spread);

        if (state.spread && !isCover(state.page) && !isEnd(state.page) && state.page % 2 === 0) {
            state.page = Math.min(LAST - 1, state.page + 1);
        }

        // First page is cover
        render();

    }


    // ===== Render pages =====
    function render() {
        leftEl.innerHTML = '';
        rightEl.innerHTML = '';
        bookEl.classList.remove('single-right', 'single-left');

        if (isCover(state.page)) {
            rightEl.appendChild(makePage(BOOK.pages[0], 0));
            bookEl.classList.add('single-right');
            setIndicator();
            return;
        }

        if (isEnd(state.page)) {
            leftEl.appendChild(makePage(BOOK.pages[LAST], LAST));
            bookEl.classList.add('single-left');
            setIndicator();
            return;
        }

        if (state.spread) {
            const leftIdx = (state.page % 2 === 0) ? state.page + 1 : state.page;
            const rightIdx = Math.min(LAST - 1, leftIdx + 1);

            leftEl.appendChild(makePage(BOOK.pages[leftIdx], leftIdx));
            rightEl.appendChild(makePage(BOOK.pages[rightIdx], rightIdx));
        } else {
            rightEl.appendChild(makePage(BOOK.pages[state.page], state.page));
            bookEl.classList.add('single-right');
        }

        setIndicator();
        document.documentElement.style.setProperty('--zoom', state.zoom);
    }

    function playTurnSound(isClosing) {
        if (!state.soundOn) return;
        const endSound = isCover(state.page) || isEnd(state.page);

        try {
            if (isClosing) {
                thudSound.currentTime = 0;
                thudSound.play();
            } else if (!isClosing && endSound) {
                return;
            } else if (!isClosing) {
                pageTurnSound.currentTime = 0;
                pageTurnSound.play();
            }
        } catch { }
    }

    // ===== Flip animation =====
    function flip(forward = true) {
        if (isCover(state.page) || isEnd(state.page)) return;


        const flip = document.createElement('div');
        flip.className = 'flip ';

        
        const front = document.createElement('div'); front.className = 'face front';
        const back = document.createElement('div'); back.className = 'face back';
        const shade = document.createElement('div'); shade.className = 'shade';

        const isSinglePage = bookEl.classList.contains("single-left") || bookEl.classList.contains("single-right") || !state.spread;

        flip.style.width = isSinglePage ? "100%" : "50%";

        if (forward) {
            flip.style.right = 0;
            flip.style.left = 'auto';
            flip.style.transformOrigin = "left center";
            flip.classList.add("anim-forward");

            const current = currentRightIndex();
            front.appendChild(makePage(BOOK.pages[current], current));


            const nextIdx = nextRightSnapshotIndex();
            back.appendChild(makePage(BOOK.pages[nextIdx], nextIdx));
        } else {
            flip.style.left = 0;
            flip.style.right = 'auto';
            flip.style.transformOrigin = "right center";
            flip.classList.add("anim-back");


            const current = currentLeftIndex();
            front.appendChild(makePage(BOOK.pages[current], current));


            const prevIdx = prevLeftSnapshotIndex();
            back.appendChild(makePage(BOOK.pages[prevIdx], prevIdx));

        }

        flip.append(front, back, shade);
        bookEl.appendChild(flip);

        flip.addEventListener('animationend', () => flip.remove(), { once: true });
    }

    // Helpers for snapshots
    function currentLeftIndex() {
        if (isCover(state.page)) return 0;
        if (isEnd(state.page)) return LAST;
        if (state.spread) return (state.page % 2 === 0) ? state.page + 1 : state.page;
        
        return Math.max(1, state.page - 1);
    }
    function currentRightIndex() {
        if (isCover(state.page)) return 0;
        if (isEnd(state.page)) return LAST;
        if (state.spread) {
            const leftIdx = (state.page % 2 === 0) ? state.page + 1 : state.page;
            return Math.min(LAST - 1, leftIdx + 1);
        }
        return state.page;
    }
    function nextRightSnapshotIndex() {
        // what content will appear "under" when turning right page forward
        if (isCover(state.page)) return Math.min(LAST - 1, 1); // next visible after cover
        if (state.spread) return Math.min(LAST - 1, currentRightIndex() + 2);
        return Math.min(LAST, state.page + 1);
    }
    function prevLeftSnapshotIndex() {
        // what content will appear when turning left page backward
        if (isEnd(state.page)) return Math.max(1, LAST - 1);
        if (state.spread) return Math.max(1, currentLeftIndex() - 2);
        return Math.max(0, state.page - 1);
    }

    // ===== Navigation (returns true if a "closing" move) =====
    function goNext() {
        if (isEnd(state.page)) return false; // already closed at end

        const wasCover = isCover(state.page);

        if (state.spread) {
            if (wasCover) {
                // open to first interior spread (1–2) -> set left=1
                state.page = 1;
            } else {
                // advance a leaf (2 pages)
                state.page = Math.min(LAST, state.page + 2);
                // if we hit LAST (end) or LAST-1+2 >= LAST -> close to end
                if (state.page >= LAST) {
                    state.page = LAST;
                    return true; // closing
                }
                // keep left odd
                if (state.page % 2 === 0) state.page += 1;
                state.page = Math.min(LAST - 1, state.page);
            }
        } else {
            // single page
            state.page = Math.min(LAST, state.page + 1);
            if (isEnd(state.page)) return true; // closing
        }
        return wasCover ? false : false;
    }

    function goPrev() {
        if (isCover(state.page)) return false; // already closed at cover

        const wasEnd = isEnd(state.page);

        if (state.spread) {
            if (wasEnd) {
                // open back to last interior spread
                state.page = Math.max(1, LAST - 1);
            } else {
                // go back a leaf (2 pages)
                state.page = Math.max(0, state.page - 2);
                if (state.page <= 0) {
                    state.page = 0; // cover
                    return true; // closing
                }
                // ensure left odd
                if (state.page % 2 === 0) state.page += 1;
                state.page = Math.max(1, state.page);
            }
        } else {
            // single page
            state.page = Math.max(0, state.page - 1);
            if (isCover(state.page)) return true; // closing
        }
        return wasEnd ? false : false;
    }

    function flipForward() {
        const closing = goNext();   
        playTurnSound(closing);
        flip(true);             
        render();
        saveState();
    }
    function flipBack() {
        const closing = goPrev(); 
        playTurnSound(closing);
        flip(false);            
        render();
        saveState();
    }

    // ===== Controls =====>>>>
    /*Sound toggle*/
    function toggleSound() {
        state.soundOn = !state.soundOn;
        const icon = state.soundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
      
        qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(b => (b.innerHTML = icon));
        saveState();
    }
qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(btn => btn.addEventListener('click', toggleSound));



    // Zoom
    function zoom(delta) {
        state.zoom = clamp(Number((state.zoom + delta).toFixed(2)), .6, 2.0);
        document.documentElement.style.setProperty('--zoom', state.zoom);
        saveState();
    }
    function toggleFullscreen() {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { });
        else document.exitFullscreen();
    }
    qsa('#fullscreenBtn, [data-hook="fullscreen"]').forEach(btn => btn.addEventListener('click', toggleFullscreen));

    qsa('#zoomIn, #zoomInBottom, [data-hook="zoom-in"]').forEach(btn => btn.addEventListener('click', () => zoom(0.1)));
    qsa('#zoomOut, #zoomOutBottom, [data-hook="zoom-out"]').forEach(btn => btn.addEventListener('click', () => zoom(-0.1)));

    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') flipForward();
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') flipBack();
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) zoom(0.1);
        if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) zoom(-0.1);
    });

    // Swipe (mobile)
    let touchStartX = 0;
    const SWIPE_MIN = 40;
    bookEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    bookEl.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (dx <= -SWIPE_MIN) flipForward();
        else if (dx >= SWIPE_MIN) flipBack();
    }, { passive: true });

    ///event listerners:
    document.getElementById('prevBtn').addEventListener('click', flipBack);
    document.getElementById('nextBtn').addEventListener('click', flipForward);


    // Toggle bookmark
    function toggleBookmark() {
        let btn = document.getElementById('bookmarkBtn');
        let isBookmarked = state.bookmarks.includes(state.page);

        const icon = isBookmarked ?
            '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';

        qsa('#bookmarkBtn, #bookmark, [data-hook="bookmark"]').forEach(btn => btn.innerHTML = icon);
    }

    qsa('#bookmarkBtn, #bookmark, [data-hook="bookmark"]').forEach(btn => btn.addEventListener('click', toggleBookmark));

    function saveBookmark(number) {
        const page = number;
        if (state.bookmarks.includes(page)) {
            state.bookmarks = state.bookmarks.filter(b => b !== page);
        } else {
            state.bookmarks.push(page);
        }
        localStorage.setItem("bookmarkPages", JSON.stringify(number));
        toggleBookmark();
        saveState();
    }

    function loadBookmark() {
        const saved = localStorage.getItem('bookmarkPage');
        if (!saved) return;

        const p = parseInt(saved);

        console.log("loaded", p);
        return Number.isFinite(p) ? p : null;
    }

    qsa('#bookmarkBtn, #bookmarkBtnBottom, [data-hook="bookmark"]').forEach(btn => btn.addEventListener('click', () => saveBookmark(state.page)));


    /////
    //////
    // for menu and expandablesss:

    // Menu panel (top) and bottom three-dots
    const menuBtn = document.getElementById('menuBtn');
    const menuPanel = document.getElementById('menuPanel');
    menuBtn.addEventListener('click', () => {
        const open = !menuPanel.classList.contains('open');
        menuPanel.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
        if (!menuPanel.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
            menuPanel.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Search
    const searchBar = document.getElementById('search');
    searchBar.addEventListener('change', () => {
        const value = searchBar.value.trim();
        searchBar.value = '';
        if (!value) return;
        if (value.toLowerCase().includes("e")) {
            let direction = true;
            value.toLowerCase().includes("cover") ? [state.page = 0, direction = false]
                : value.toLowerCase().includes("end") ? [state.page = LAST, direction = true]
                    : "";

            flip(direction);
            playTurnSound(true);
            render();
            saveState();
        }

        
        const pageNum = parseInt(value, 10);
        if (!Number.isFinite(pageNum) || pageNum < 0) return;

        const idx = clamp(pageNum, 1, LAST - 1); 
        state.page = idx;
        flip(true);
        playTurnSound(false);
        render();
        saveState();
    });

    mq.addEventListener('change', applyLayout);

    // Init
    (function init() {
        // Title & search placeholder
        document.getElementById('bookTitle').textContent = BOOK.title;

        document.getElementById('search').placeholder = `Search page – ${BOOK.title}`;

        // Start from last read, otherwise bookmark;
        loadState();
        const bm = loadBookmark();
state.zoom = 1;

        if (bm && !Number.isFinite(parseInt(localStorage.getItem('bookState') || ''))) state.page = bm;

        applyLayout();
    })();

});
