/* =====================================================================
   ALL CONTENT LIVES HERE. Edit text, save, refresh: the site updates.
   Plain text only (no HTML tags). "&" is fine; it is escaped for you.
   ===================================================================== */

/* ---------------------------------------------------------------------
   PROJECTS  (project cards, homepage "Selected Work" and detail panel)
   Fields:
     id        unique key (used by Experience "projects" lists)
     featured  true = also shown in homepage "Selected Work"
     name      card + panel title
     company   who the work was done for
     when      period shown on the card
     role      my role on this project
     platforms where it runs
     summary   one-line card description
     focus     2-3 short bullets shown on the card (main testing responsibilities)
     overview  paragraph: what the product is
     duties    "My Contribution" bullets
     coverage  "Testing Coverage": [ [category, [activities...]], ... ]
     types     "Testing Types"   (text)
     tools     "Tools"           (text)
     link      optional [url, label]
   --------------------------------------------------------------------- */
const PROJECTS = [
  { id:"bloxley", featured:true, name:"Bloxley — Mobile Banking", company:"Bloxley", when:"2025 – Present",
    role:"QA Lead", platforms:"Android · iOS",
    summary:"Mobile banking and money transfers, tested from development through release.",
    focus:["Onboarding, KYC and transfer flows","Test cases from PRDs and Figma designs","Bug tracking and release validation"],
    overview:"Bloxley is a fintech startup building a mobile financial platform designed to simplify everyday money management. I work with another QA teammate, developers, and the product team on the Android and iOS app.",
    duties:["Lead QA activities for the mobile app across Android and iOS","Design and execute test cases from PRDs and Figma designs","Manage bug reporting, tracking, and release validation","Collaborate with developers and the product team"],
    coverage:[
      ["Onboarding & KYC",["Registration and onboarding flow","Invalid input validation","OTP verification","KYC document submission","KYC rejection and resubmission","Break-flow and negative scenarios"]],
      ["Money Transfers",["Send money to Bloxley members","Internal, local, and international bank transfers","Amount input and currency compatibility","GIF, note, and custom reference","International fee calculation","OTP, passcode, Face ID / biometrics","Passcode reset during transfer","Balance deduction and end-to-end flow","Chat for sending money"]],
      ["Transaction History",["Home screen: account balance and currency selection","Recent list (7 latest) and full history","Search and filtering","Daily transaction amount calculations","Amount, currency, type, sender and receiver","Notes, GIFs, references","SWIFT, UKFPS, and SEPA methods","Help, resend, completion status, failed transfers"]],
      ["Request Money",["Request money from members","Accept or decline requests","Request through Chat","Request limits","Positive, negative, and edge cases"]],
      ["Payment Flows",["Top up through bank transfer","Positive, negative, and edge cases"]],
      ["Account Settings",["Account details, invite friends, inbox","Profile: membership, cards, personal info, documents","Help Center: FAQ, articles, support chat","App settings: theme, notifications, security & data privacy"]]
    ],
    types:"Functional · Regression · Smoke · Exploratory · Negative · Integration · End-to-End · Edge Case · API",
    tools:"Jira · TestRail · Qase · Postman · Figma" },

  { id:"scenes", name:"Butter Scenes", company:"Butter", when:"2024",
    role:"QA Manual Tester", platforms:"Web",
    summary:"Collaborative workspace platform: boards, brainstorms, and integrations.",
    focus:["Workspace, board and brainstorm features","Real-time collaboration","Google Docs and Miro integrations"],
    overview:"Butter Scenes is a collaborative workspace platform designed to help teams organize, share, and work together on ideas and projects.",
    duties:["Designed and executed test cases from Figma designs and project requirements","Supported testing from development through staging and production","Documented bugs and worked with developers on fixes"],
    coverage:[
      ["Dashboard",["Document search and navigation","Document sharing and menu management","Folder create, update, delete"]],
      ["Workspace",["Workspace creation and management","Notes, tasks, resources, files","Comments and discussions","Real-time collaboration"]],
      ["Pin-on Image",["Image upload","Pin placement and labeling","Zoom and image interaction","Comments on pins, activity history"]],
      ["Free & Structured Brainstorm",["Creating and sharing ideas","Stickers, images, links, files","Prompts, categories, participant responses","Real-time reactions and comments"]],
      ["Butterboard",["Board navigation and menus","Editor functionality","Section interactions","Real-time collaboration"]],
      ["Google Docs & Miro Integration",["Connection and linking","Importing content","Preview and editing","Sharing and collaboration"]],
      ["Onboarding",["Sign up and login","Email verification","Account setup","Invalid input handling","Browser and device compatibility"]]
    ],
    types:"Functional · Exploratory · Regression · Integration · Compatibility",
    tools:"Linear · Qase · Figma · Bird Eats Bug" },

  { id:"video", featured:true, name:"Butter Video", company:"Butter", when:"2022 – 2024",
    role:"QA Manual Tester", platforms:"Web · Desktop · Mobile",
    summary:"Video platform for meetings and workshops: pricing, scheduling, room setup, recaps.",
    focus:["Pricing, scheduling and room setup flows","Recaps and library features","API testing with Postman"],
    overview:"Butter Video is a collaborative video communication platform designed for virtual meetings, workshops, and brainstorming sessions.",
    duties:["Designed and executed test cases from Figma designs and requirements","Supported testing from development through staging and production","Investigated and followed up on customer-reported issues","API testing with Postman"],
    coverage:[
      ["Pricing",["Upgrade and downgrade flows","Positive and negative pricing scenarios","Grandfathered accounts","Third-party authentication","API testing with Postman","Old and new account behavior"]],
      ["Session Schedule",["Google Calendar integration","Session scheduling and invitations","Timezone handling","Inviter and invitee scenarios"]],
      ["Room Setup",["First-time user tutorial","Room Recaps list","Agenda creation","Collaborator settings","Image and sound uploads"]],
      ["Recaps",["Summaries, transcripts, highlights","Engagement analytics","Chat and notes history","Recorded resources: video, audio, GIFs","Recap sharing"]],
      ["Library",["Template CRUD and search","Saving items and template creation","Image uploads","Personal and public template permissions"]]
    ],
    types:"Functional · Exploratory · Integration · API",
    tools:"Linear · Qase · Figma · Postman" },

  { id:"jenius", name:"Jenius — Credit Card", company:"Mitrais", when:"2020 – 2022",
    role:"QA Tester", platforms:"Mobile",
    summary:"Digital banking credit card features inside the Jenius app.",
    focus:["Card creation and limit calculation","Split Pay and auto repayment","Billing, statement and payment flows"],
    overview:"Jenius Credit Card is a digital banking solution that provides credit card features through the Jenius app. Delivered during my time at Mitrais.",
    duties:["Designed and executed test cases from Figma designs and requirements","Supported testing from development through production","Collaborated with QA squads on test case reviews","Documented bugs and worked with developers on resolutions"],
    coverage:[
      ["Card Setup & Limits",["Onboarding flow","Card creation","Limit calculation"]],
      ["Rewards & Split Pay",["Yay Points reward","Split Pay function"]],
      ["Billing & Statements",["Billing summary & statement"]],
      ["Transactions & Payments",["Transaction flow","Auto repayment flow","Payment flow"]]
    ],
    types:"Functional · Regression · Integration · API",
    tools:"Jira · TestRail · Postman · Figma",
    link:["https://www.jenius.com/app/kredit/kartu-kredit","Jenius Credit Card (reference)"] },

  { id:"gameloft", name:"Gameloft — Mobile Game Testing", company:"Gameloft Indonesia", when:"2019 – 2020",
    role:"Manual Game Tester", platforms:"Android · iOS",
    summary:"Manual testing on two mobile games: The Love Boat: Puzzle Cruise and Modern Combat: Rebel Guns.",
    focus:["Checklist-based functional testing","Ad functionality and compatibility (PIC)","Daily testing reports"],
    overview:"Gameloft Indonesia is a mobile game development company. I worked as a Manual Game Tester on two projects: The Love Boat: Puzzle Cruise and Modern Combat: Rebel Guns.",
    duties:["Executed test cases from provided checklists","Performed functional testing and documented bugs","Tracked and resolved issues with developers","Delivered daily testing reports","Tested ad functionality and acted as PIC for compatibility testing"],
    coverage:[
      ["The Love Boat: Puzzle Cruise",["Puzzle-solving and match-3 mechanics","Level progression","Load times and gameplay performance","UI responsiveness and visual consistency","In-app purchases","Android and iOS compatibility"]],
      ["Modern Combat: Rebel Guns",["Manual game testing from provided test checklists","Bug documentation and developer collaboration"]]
    ],
    types:"Functional · Compatibility · Cross-Platform · Performance",
    tools:"QADB · Google Sheets · Internal tools" }
];

/* ---------------------------------------------------------------------
   EXPERIENCE  (company tabs)
     projects = ids from PROJECTS above (become "Related projects")
     points   = responsibilities
     contrib  = relevant contributions
   --------------------------------------------------------------------- */
const EXPERIENCE = [
  { co:"Bloxley", role:"QA Lead", dates:"January 2025 – Present", projects:["bloxley"],
    about:"A fintech startup building a secure and intuitive digital banking platform, focused on simplifying spending, saving, and budgeting.",
    points:["Design and execute test cases and plans from PRDs and Figma requirements","Perform functional, regression, smoke, exploratory, and API testing","Manage the bug lifecycle, reporting, tracking, and release validation"],
    contrib:["Lead QA activities for the mobile banking app across Android and iOS, alongside one QA teammate","Collaborate with developers and product teams to ensure product quality"] },
  { co:"Butter", role:"QA Tester", dates:"August 2022 – November 2024", projects:["video","scenes"],
    about:"A remote-first, fully distributed seed-stage startup building a video conferencing and collaboration tool that helps facilitators run more engaging sessions.",
    points:["Designed and executed test cases from PRDs and Figma requirements","Performed exploratory, functional, black-box, and API testing","Documented bugs and collaborated with developers on fixes"],
    contrib:["Investigated customer-reported issues and identified potential bugs","Tested across Web, Desktop, and Mobile (Android/iOS)"] },
  { co:"Mitrais", role:"Software Tester", dates:"February 2020 – August 2022", projects:["jenius"],
    about:"An established software and IT services company with remote and in-office work options. Project: Mobile Digital Banking, Credit Card.",
    points:["Designed test cases based on project and product owner requirements","Performed exploratory, functional, regression, integration, black-box, and API testing","Documented bugs and worked closely with developers on resolutions"],
    contrib:["Conducted mobile testing on Android and iOS","Collaborated with QA squads on test case reviews"] },
  { co:"Gameloft Indonesia", role:"Manual Game Tester", dates:"May 2019 – February 2020", projects:["gameloft"],
    about:"An established game development company specializing in mobile games, with hybrid and in-office work options.",
    points:["Executed tests based on provided checklists","Documented and tracked bugs with developers","Delivered daily testing reports"],
    contrib:["Tested ad functionality within the game","Acted as PIC for compatibility testing"] }
];

/* ---------------------------------------------------------------------
   SKILLS & TOOLS  (one row per category)
   Only items supported by the CV and project write-ups.
   --------------------------------------------------------------------- */
const SKILLS = [
  { name:"Manual Testing", items:["Test case design from PRDs and Figma designs","Exploratory","Black-box","Smoke","Negative and edge-case scenarios"] },
  { name:"Functional & Regression Testing", items:["Functional","Regression","Integration","End-to-End","Compatibility and cross-platform"] },
  { name:"API Testing", items:["Postman","Insomnia","Bruno"] },
  { name:"Test Management", items:["TestRail","Qase","Google Sheets checklists (game testing)"] },
  { name:"Bug Tracking", items:["Jira","Linear","ClickUp","Bird Eats Bug","QADB (game testing)"] },
  { name:"Test Automation", items:["Basic test automation"] },
  { name:"Design & Collaboration", items:["Figma","GitHub"] },
  { name:"Platforms & Environments", items:["Android","iOS","Web","Desktop","Remote-first and in-office teams"] }
];
