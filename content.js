/* ============================================================
   YOUR PORTFOLIO CONTENT — this is the only file you edit.

   HOW IT WORKS
   - Every word on your page comes from this file.
   - Change text here, save, double-click index.html to preview,
     then double-click publish.cmd to put it online.

   TEXT TIPS
   - **like this**  makes text bold on the page.
   - Keep the quotes around text. If your text itself needs a
     quote mark, use the other kind: "it's fine" or 'he said "hi"'.
   - A comma after every item. Do not delete the } ] brackets.

   PICTURES
   - Put picture files in the assets folder.
   - Then write "assets/my-picture.png" in an image field.
   - "builtin:..." images are custom drawings made in code.
     Ask Claude to change those.
   ============================================================ */

window.SITE = {

  /* ---------- TOP OF THE PAGE ---------- */
  hero: {
    tag: "// AI & Automation Engineer · Australia",
    titleLine1: "I build AI that runs",
    titleLine2: "on the factory floor.",          // this half shows in grey
    intro: "I'm **Felix Ho**. I take machine learning from first idea to production: **computer vision** watching live manufacturing lines, **LLM tools** people use at work, and the **industrial control** that connects them to real machines.",
    buttons: [
      { text: "See the work", link: "#work", style: "primary" },
      { text: "GitHub",   link: "https://github.com/felixhorobot" },
      { text: "LinkedIn", link: "https://linkedin.com/in/homingho" }
    ],
    /* value must be a plain number to get the counting animation */
    stats: [
      { value: "12",    unit: "",      label: "camera feeds in production" },
      { value: "20-35", unit: "ms",    label: "average inference latency" },
      { value: "20",    unit: "h/day", label: "production coverage" }
    ]
  },

  /* ---------- CASE STUDIES ---------- */
  caseIntro: {
    label: "Case studies",
    title: "Three problems, end to end",
    text: "Real production systems at a heavy timber processing plant in Australia. I designed, built, deployed and still run them."
  },
  /* Each case study: number, title, story paragraphs, one result line,
     small skill chips, and a visual.
     visual can be:  "builtin:architecture"  "builtin:latency"  "builtin:terminal"
     or your own picture:  "assets/my-photo.png"  */
  caseStudies: [
    {
      number: "01",
      title: "A vision platform watching 12 live camera feeds",
      paragraphs: [
        "The plant needed automated inspection across its production lines, and nothing off the shelf fitted. I built the platform in **Python**: up to **12 simultaneous camera feeds**, each loading its own model, averaging **20-35 ms per inference** on edge industrial PCs I specified and built myself.",
        "The models are **YOLO** and **Detectron2**: object detection, instance segmentation, multi-label classification and deep learning OCR. To feed them I wrote a **custom annotation app** with frame extraction, box, polygon and OCR labelling, and one-click training export.",
        "Inference does not stop at a dashboard. Results flow into a **Rockwell PLC program I wrote**, so a model output can stop a line, raise an alarm or adjust equipment. A **Flask** web app streams every camera with detection overlays and serves a REST API. Docker containers, automated startup and self-recovery keep it running across two shifts, 20 hours a day, without anyone touching it."
      ],
      result: "Runs unattended in production today, covering two full shifts a day, five days a week.",
      chips: ["Python", "YOLO", "Detectron2", "Docker", "Flask", "Rockwell PLC", "Ignition SCADA", "SQL"],
      visual: "builtin:architecture"
    },
    {
      number: "02",
      title: "The GPU that quietly got 6x slower",
      paragraphs: [
        "Two trigger-mode cameras normally answered in 40-80 ms. One day they sat at about **135 ms**, and the obvious suspect, a newly added feature, turned out to be innocent: it was disabled, and its code was newer than the process that was running. The evidence cleared it.",
        "The logs pointed somewhere stranger. An always-on model had been removed as cleanup, and it had been doing two jobs nobody knew about: feeding the health watchdog, and **keeping the GPU clocks awake**. Without it the GPU dropped to its idle state between triggers: memory clock **405 MHz instead of 13,801 MHz, a 34x drop**, and YOLO inference is memory-bandwidth bound.",
        "The fix is a **keep-alive inference**: a dummy frame through the real model whenever the line goes quiet for a quarter second. Every parameter was chosen by measurement, not guesswork: a small frame only got latency to 111 ms, so the dummy frame is full size; 1 per second was unstable, 4 per second reached 18.9 ms, 10 per second gained nothing more."
      ],
      result: "131.6 ms down to 22.1 ms, and 137.1 down to 19.6. Cost: about 10 W. Faster than the system had ever run, because the keep-alive warms the model that does the real work.",
      chips: ["root cause analysis", "GPU profiling", "YOLO", "performance", "production debugging"],
      visual: "builtin:latency"
    },
    {
      number: "03",
      title: "Teaching myself an ABB robot nobody could fix",
      paragraphs: [
        "A robotic stacking line kept failing: dropped picks, stack collisions, unplanned stoppages. The plant had always called the vendor for robot faults, so when I was asked to fix it, **nobody could tell me how**. I had never programmed an industrial robot.",
        "I researched the ABB controller, connected to it over Ethernet, extracted the program and **taught myself to read RAPID**, ABB's robot language. Inside it I traced three real faults: a positioning error, a height limit, and timing that did not match the new sensor.",
        "I reprogrammed the logic and added an **ultrasonic feedback sensor**, chosen over a laser after testing showed laser misreads darker and wet timber. Ultrasonic responds more slowly, so I allowed for that delay in the robot logic instead of pretending it was not there."
      ],
      result: "Unplanned downtime on that line fell by **90%**. Robot faults are now fixed in house.",
      chips: ["ABB RAPID", "self-taught", "sensors", "commissioning", "reverse engineering"],
      visual: "builtin:terminal"
    }
  ],

  /* ---------- PROJECTS ---------- */
  projectIntro: {
    label: "Projects",
    title: "Things I ship",
    text: "Personal products and work systems. Real users on every one of them."
  },
  /* Each project card:
     name        the project name
     link        a web address; makes the name clickable. "" = no link.
                 (Slim: paste your App Store link here!)
     badge       small label at the top right, "" = no badge
     badgeColor  "green" or "orange"
     image       "builtin:loreforge", "builtin:slim", "assets/your-picture.png",
                 or "" for a text-only card
     text        the description, **bold** works
     tags        the small blue line at the bottom
     To ADD a project: copy one whole { ... } block including the comma,
     paste it in the list, and change the words. */
  projects: [
    {
      name: "LoreForge",
      link: "",
      badge: "BETA · IN USE",
      badgeColor: "orange",
      image: "builtin:loreforge",
      text: "AI game asset tool used by an indie game production team. Integrates the Claude, OpenAI and Gemini APIs through **MCP tool calling**, so an AI agent can operate the software itself and guide the user through it. The Tripo API generates, rigs and animates 3D assets. Engine export to Unity, Godot and Unreal is on the roadmap.",
      tags: "MCP · Claude API · OpenAI · Gemini · Tripo 3D"
    },
    {
      name: "Slim",
      link: "https://apps.apple.com/au/app/slim-photo-video-compress/id6778816811",
      badge: "APP STORE",
      badgeColor: "green",
      image: "builtin:slim",
      text: "Native iOS app in Swift: compress photos and videos on device, \"your memories, half the size\". No uploads, no account, nothing leaves the phone. Keeps capture dates, locations and Live Photo motion, and originals are only removed after the user confirms.",
      tags: "Swift · AVFoundation · on-device"
    },
    {
      name: "RAG documentation assistant",
      link: "",
      badge: "IN PRODUCTION",
      badgeColor: "green",
      image: "",
      text: "Staff ask questions over internal technical documentation in plain language. I built the whole pipeline: document ingestion, embeddings with text-embedding-3-small, vector search on Microsoft SQL Server, and response generation through the OpenAI API. In early production use at a manufacturing site.",
      tags: "RAG · embeddings · SQL Server · OpenAI API"
    },
    {
      name: "Virtual fencing & path planning",
      link: "",
      badge: "",
      badgeColor: "green",
      image: "",
      text: "Built in Unity and Python for a mining technology company's recruitment process. Outer work fences, inner exclusion zones, and automatic path planning that maximises coverage, simulating several machines working an area at once.",
      tags: "Unity · Python · path planning · simulation"
    },
    {
      name: "LLM staff trainer",
      link: "",
      badge: "",
      badgeColor: "green",
      image: "",
      text: "An LLM assistant that delivers internal training to new staff at a restaurant chain. Real new starters were trained with it. Built after assessing where LLMs actually help in the business and where they do not.",
      tags: "LLM · prompt design · real users"
    },
    {
      name: "Custom annotation app",
      link: "",
      badge: "",
      badgeColor: "green",
      image: "",
      text: "The tool behind the vision platform: frame extraction from production video, bounding box, polygon and OCR annotation, and one-click export into training. Purpose-built, so labelling fits the factory's data instead of the other way around.",
      tags: "Python · tooling · training pipeline"
    }
  ],

  /* ---------- SKILLS ---------- */
  skillIntro: {
    label: "Skills",
    title: "The stack I actually use",
    text: "Everything listed here has shipped in a real system, at work or in a released project."
  },
  skills: [
    {
      group: "Machine learning & vision",
      items: ["PyTorch", "YOLO v8-v11", "Detectron2", "OpenCV", "ONNX", "TensorFlow / Keras", "scikit-learn", "MLflow", "Databricks", "Roboflow", "deep learning OCR", "instance segmentation"]
    },
    {
      group: "LLMs & agents",
      items: ["Anthropic Claude API", "OpenAI API", "Gemini API", "MCP tool calling", "RAG", "vector search", "prompt & context design", "AI-assisted development"]
    },
    {
      group: "Software",
      items: ["Python", "Swift", "TypeScript", "Flask", "REST APIs", "SQL", "Docker", "Git / GitHub", "Linux", "n8n", "Power Automate"]
    },
    {
      group: "Industrial & engineering",
      items: ["Rockwell Studio 5000", "EtherNet/IP", "Ignition SCADA", "ABB RAPID", "industrial cameras", "sensors & VFDs", "SolidWorks (CSWP)", "Ansys FEA", "Power BI"]
    }
  ],

  /* ---------- ABOUT ---------- */
  about: {
    label: "About",
    title: "Mechanical engineer, retrained into AI, still on the tools",
    paragraphs: [
      "I started as a **mechanical engineer** and moved into AI the practical way: a production line needed machine vision, so I learned it, built it and put it into service. Since then my work has been the full span between a model and a machine: training the network, containerising it, wiring the sensor, writing the PLC logic that acts on the result.",
      "That background changes how I build software. I ask the questions physical industries ask: what happens when it fails, who fixes it at 5 am, is it safe. My systems ship with monitoring, self-recovery and operator guides, because production does not forgive software that needs babysitting.",
      "Away from work I build products: an iOS app on the App Store, an AI game asset tool in beta with a real game team. I use Claude Code, Codex and Gemini in daily development, and I review, test and fix what they generate. Currently completing a **Master of IT (Artificial Intelligence)** while working full time.",
      "Based in Tasmania, Australia. Open to relocating. Fluent in English, Mandarin and Cantonese."
    ],
    educationTitle: "Education & certifications",
    education: [
      { title: "Master of IT (Artificial Intelligence)", sub: "QUT · in progress · GPA 6.8 / 7" },
      { title: "BEng (Mechanical) with Honours", sub: "University of Tasmania" },
      { title: "CSWP · SolidWorks Professional", sub: "plus CSWA" },
      { title: "Rockwell ControlLogix Maintenance", sub: "plus Cognex In-Sight training" },
      { title: "Google AI Essentials", sub: "plus Data Analytics & Project Management" }
    ]
  },

  /* ---------- CONTACT ---------- */
  contact: {
    label: "Contact",
    title: "Building something with AI and real machines?",
    text: "I answer email. Tell me what you are building and where it is stuck.",
    email: "homing.felix.ho@gmail.com",
    links: [
      { text: "GitHub",   link: "https://github.com/felixhorobot" },
      { text: "LinkedIn", link: "https://linkedin.com/in/homingho" }
    ]
  },

  footer: "felixhorobot.github.io · built by hand, no framework"
};
