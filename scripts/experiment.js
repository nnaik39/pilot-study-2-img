// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {
    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    // specify view order
    this.views_seq = [
        intro,
        botcaptcha,
        main,
        postTest,
        thanks
    ];

    const imageSeenBefore = new Map();

    main_trials = _.shuffle(main_trials)[0]

    health = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'health') {
            health.push(main_trials[i])
        }
    }

    health = _.sampleSize(health, 1);
    imageSeenBefore.set(health[0]['filename'], true)

    console.log("Health ", health)

    news_journals = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'news') {
            news_journals.push(main_trials[i])
        }
    }

    news_journals = _.sampleSize(news_journals, 1);

    while (imageSeenBefore[[news_journals[0]['filename']]]) {
        news_journals = _.sampleSize(news_journals, 1);
    }
    imageSeenBefore.set(news_journals[0]['filename'], true)

    console.log("news journals ", news_journals)

    science_journals = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'science_journals') {
            science_journals.push(main_trials[i])
        }
    }

    science_journals = _.sampleSize(science_journals, 1);
    console.log('science_journals chosen ', science_journals)

    while (imageSeenBefore[[science_journals[0]['filename']]]) {
        science_journals = _.sampleSize(science_journals, 1);
    }
    imageSeenBefore.set(science_journals[0]['filename'], true)

    travel = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'travel') {
            travel.push(main_trials[i])
        }
    }

    travel = _.sampleSize(travel, 1);
    console.log('travel chosen ', travel)    

    while (imageSeenBefore[[travel[0]['filename']]]) {
        travel = _.sampleSize(travel, 1);
    }
    imageSeenBefore.set(travel[0]['filename'], true)

    shopping = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'shopping') {
            shopping.push(main_trials[i])
        }
    }
    console.log('shopping! ', shopping)

    shopping = _.sampleSize(shopping, 1);
    console.log('shopping chosen 2 ', shopping)    
    console.log('science_journals chosen ', science_journals)

    while (imageSeenBefore[[shopping[0]['filename']]]) {
        shopping = _.sampleSize(shopping, 1);
    }
    imageSeenBefore.set(shopping[0]['filename'], true)

    social_media = [];

    for (let i = 0; i < main_trials.length; i++) {
        if (main_trials[i]['category'] == 'social_media') {
            social_media.push(main_trials[i])
        }
    }

    social_media = _.sampleSize(social_media, 1);
    console.log('social_media chosen ', social_media)    

    while (imageSeenBefore[[social_media[0]['filename']]]) {
        social_media = _.sampleSize(social_media, 1);
    }
    imageSeenBefore.set(social_media[0]['filename'], true)

    main_trials.length = 0
    main_trials.push(...health)
    main_trials.push(...news_journals)
    main_trials.push(...science_journals)
    main_trials.push(...travel)
    main_trials.push(...shopping)
    main_trials.push(...social_media)

    // randomize main trial order, but keep practice trial order fixed
    this.trial_info.main_trials = _.shuffle(main_trials);
    console.log("Number of stimuli");
    console.log(main_trials.length);
    console.log(this.trial_info.main_trials);

    // sample question order
    shopping = "Why did this image appear within this context?"
    travel = "You are browsing a <strong> travel website</strong>, with the goal of traveling to a new location."
    social_media = "You are browsing <strong> social media</strong>, with the goal of learning more about your connections."
    health = "You are browsing a <strong> health website</strong>, with the goal of learning how to live a healthier lifestyle."
    science_journals = "You are browsing <strong>science magazines</strong> (such as National Geographic), with the goal of learning more about recent science developments."
    news_journals = "You are browsing <strong>news websites</strong> (such as New York Times), with the goal of learning more about recent news developments."

    questions = _.shuffle([health, shopping, travel, social_media, science_journals, news_journals])
    this.trial_info.q1 = "Why do you think this image appears within this context?"
    this.trial_info.q2 = "What are two questions you'd want to have answered if you encountered this image when you were shopping? Each question should be more than 3 words. Please avoid questions that begin with Is there or How many."
    this.trial_info.q3 = "A seal lies on a beach, looking towards the camera"
    this.trial_info.q4 = "Write a question to fool an intelligent robot."
    this.trial_info.q5 = questions.pop()
    this.trial_info.q6 = questions.pop()

    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ["main"];
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = "default";
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};

// First, they'll be writing questions
// Then, they'll be writing answers to the questions that other people generated
// You'll need to generate questions and save them to an answer database