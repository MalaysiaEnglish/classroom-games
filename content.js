/* ================================================================
   CLASSROOM GAMES — Custom Content
   Edit this file to add your own sentences and words.
   
   HOW TO USE:
   - sentences: used by Grammar Auction
   - words:     used by Hangman (alongside built-in lists)
   
   topic:  the grammar point or theme  (e.g. "passive voice")
   year:   the year group              (e.g. "Year 10")
   
   In Grammar Auction, filter by topic AND/OR year before starting.
   In Hangman, your custom words appear as extra word lists.
   ================================================================ */

window.CUSTOM_CONTENT = {

  sentences: [

    // ── Passive Voice ──────────────────────────────────────────
    { text: "The letter was written by the student.",          correct: true,  topic: "Passive Voice" },
    { text: "The cake was ate by the children.",               correct: false, topic: "Passive Voice" },
    { text: "English is spoken all over the world.",           correct: true,  topic: "Passive Voice" },
    { text: "The window was broke by the ball.",               correct: false, topic: "Passive Voice" },
    { text: "The report will be finished by tomorrow.",        correct: true,  topic: "Passive Voice" },
    { text: "The prize was gave to the winner.",               correct: false, topic: "Passive Voice" },
    { text: "The rules must be followed at all times.",        correct: true,  topic: "Passive Voice" },
    { text: "The homework should been done before class.",     correct: false, topic: "Passive Voice" },
    { text: "The books were returned to the library.",         correct: true,  topic: "Passive Voice" },
    { text: "The car has been drove to the garage.",           correct: false, topic: "Passive Voice" },

    // ── Present Tense ──────────────────────────────────────────
    { text: "She goes to school every day.",                   correct: true,  topic: "Present Tense" },
    { text: "He don't like spicy food.",                       correct: false, topic: "Present Tense" },
    { text: "They are playing football right now.",            correct: true,  topic: "Present Tense" },
    { text: "I am agree with you.",                            correct: false, topic: "Present Tense" },
    { text: "She doesn't know the answer.",                    correct: true,  topic: "Present Tense" },
    { text: "We go always to the market on Sunday.",           correct: false, topic: "Present Tense" },
    { text: "He is having a car.",                             correct: false, topic: "Present Tense" },

    // ── Past Tense ─────────────────────────────────────────────
    { text: "We went to the cinema last night.",               correct: true,  topic: "Past Tense" },
    { text: "She didn't came to class yesterday.",             correct: false, topic: "Past Tense" },
    { text: "They were playing when it started raining.",      correct: true,  topic: "Past Tense" },
    { text: "I catched the bus just in time.",                 correct: false, topic: "Past Tense" },
    { text: "He had already eaten before we arrived.",         correct: true,  topic: "Past Tense" },
    { text: "Did you went to the party?",                      correct: false, topic: "Past Tense" },
    { text: "We didn't saw him at the shop.",                  correct: false, topic: "Past Tense" },

    // ── Conditionals ───────────────────────────────────────────
    { text: "If it rains, we will stay inside.",               correct: true,  topic: "Conditionals" },
    { text: "If I would have money, I will buy a car.",        correct: false, topic: "Conditionals" },
    { text: "She would travel more if she had more time.",     correct: true,  topic: "Conditionals" },
    { text: "If he studies hard, he would pass.",              correct: false, topic: "Conditionals" },
    { text: "If they had left earlier, they wouldn't have missed the bus.", correct: true,  topic: "Conditionals" },
    { text: "I would have helped if you would have asked.",    correct: false, topic: "Conditionals" },
    { text: "Unless you hurry, we will be late.",              correct: true,  topic: "Conditionals" },

    // ── Reported Speech ────────────────────────────────────────
    { text: "She said that she was tired.",                    correct: true,  topic: "Reported Speech" },
    { text: "He told me he will come tomorrow.",               correct: false, topic: "Reported Speech" },
    { text: "They asked if I had seen the film.",              correct: true,  topic: "Reported Speech" },
    { text: "She said me that she liked the food.",            correct: false, topic: "Reported Speech" },
    { text: "She asked where did I live.",                     correct: false, topic: "Reported Speech" },
    { text: "They said they had already finished.",            correct: true,  topic: "Reported Speech" },
    { text: "He told that he was feeling unwell.",             correct: false, topic: "Reported Speech" },

    // ── Articles ───────────────────────────────────────────────
    { text: "She is a honest person.",                         correct: false, topic: "Articles" },
    { text: "He plays the guitar every evening.",              correct: true,  topic: "Articles" },
    { text: "I had a egg for breakfast.",                      correct: false, topic: "Articles" },
    { text: "The sun rises in the east.",                      correct: true,  topic: "Articles" },
    { text: "She gave him an useful advice.",                  correct: false, topic: "Articles" },

    // ── Comparatives ───────────────────────────────────────────
    { text: "She is more taller than her sister.",             correct: false, topic: "Comparatives" },
    { text: "This is the most expensive phone in the shop.",   correct: true,  topic: "Comparatives" },
    { text: "This book is more better than that one.",         correct: false, topic: "Comparatives" },
    { text: "She is the cleverest student I know.",            correct: true,  topic: "Comparatives" },
    { text: "It was the most worst day of my life.",           correct: false, topic: "Comparatives" },

    // ── Figurative Language ────────────────────────────────────
    { text: "The classroom was a zoo — noisy and chaotic.",    correct: true,  topic: "Figurative Language" },
    { text: "Time is a thief that steals our years.",          correct: true,  topic: "Figurative Language" },
    { text: "The wind whispered secrets through the trees.",   correct: true,  topic: "Figurative Language" },
    { text: "The metaphor said the moon is like a silver coin.", correct: false, topic: "Figurative Language" },
    { text: "She simile ran as fast as a cheetah.",            correct: false, topic: "Figurative Language" },
    { text: "Life is a journey with no map.",                  correct: true,  topic: "Figurative Language" },
    { text: "The old house groaned under the weight of its memories.", correct: true, topic: "Figurative Language" },

  ],

  words: [

    // ── Literary Devices ───────────────────────────────────────
    { word: "METAPHOR",        topic: "Literary Devices" },
    { word: "SIMILE",          topic: "Literary Devices" },
    { word: "ALLITERATION",    topic: "Literary Devices" },
    { word: "ONOMATOPOEIA",    topic: "Literary Devices" },
    { word: "PERSONIFICATION", topic: "Literary Devices" },
    { word: "HYPERBOLE",       topic: "Literary Devices" },
    { word: "FORESHADOWING",   topic: "Literary Devices" },
    { word: "JUXTAPOSITION",   topic: "Literary Devices" },
    { word: "SYMBOLISM",       topic: "Literary Devices" },
    { word: "ANAPHORA",        topic: "Literary Devices" },

    // ── Grammar Terms ──────────────────────────────────────────
    { word: "CONJUNCTION",     topic: "Grammar Terms" },
    { word: "PREPOSITION",     topic: "Grammar Terms" },
    { word: "ADJECTIVE",       topic: "Grammar Terms" },
    { word: "ADVERB",          topic: "Grammar Terms" },
    { word: "SUBORDINATE",     topic: "Grammar Terms" },
    { word: "PARTICIPLE",      topic: "Grammar Terms" },
    { word: "INFINITIVE",      topic: "Grammar Terms" },
    { word: "PASSIVE VOICE",   topic: "Grammar Terms" },

    // ── IGCSE Vocabulary ───────────────────────────────────────
    { word: "CHARACTERISATION", topic: "IGCSE English" },
    { word: "PROTAGONIST",      topic: "IGCSE English" },
    { word: "ANTAGONIST",       topic: "IGCSE English" },
    { word: "ATMOSPHERE",       topic: "IGCSE English" },
    { word: "INFERENCE",        topic: "IGCSE English" },
    { word: "CONNOTATION",      topic: "IGCSE English" },
    { word: "NARRATIVE",        topic: "IGCSE English" },
    { word: "RHETORIC",         topic: "IGCSE English" },

  ]

};
