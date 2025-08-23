// Language data
const languageData = {
  en: "English",
  hi: "हिंदी",
  pa: "ਪੰਜਾਬੀ",
  te: "తెలుగు",
}

// Current language
let currentLanguage = "en"

// Remedy data for detailed modal content
const remedyDetails = {
  skincare: {
    1: {
      en: {
        title: "Turmeric Face Mask",
        ingredients: ["1 tsp turmeric powder", "2 tbsp yogurt", "1 tsp honey"],
        method:
          "Mix all ingredients to form a smooth paste. Apply on clean face and leave for 15-20 minutes. Rinse with lukewarm water.",
        benefits:
          "Turmeric has anti-inflammatory and antibacterial properties that help reduce acne, brighten skin, and provide a natural glow.",
      },
      hi: {
        title: "हल्दी का फेस मास्क",
        ingredients: ["1 चम्मच हल्दी पाउडर", "2 बड़े चम्मच दही", "1 चम्मच शहद"],
        method: "सभी सामग्री को मिलाकर एक चिकना पेस्ट बनाएं। साफ चेहरे पर लगाएं और 15-20 मिनट के लिए छोड़ दें। गुनगुने पानी से धो लें।",
        benefits:
          "हल्दी में सूजन रोधी और जीवाणु रोधी गुण होते हैं जो मुंहासों को कम करने, त्वचा को निखारने और प्राकृतिक चमक प्रदान करने में मदद करते हैं।",
      },
      pa: {
        title: "ਹਲਦੀ ਦਾ ਫੇਸ ਮਾਸਕ",
        ingredients: ["1 ਚਮਚ ਹਲਦੀ ਪਾਊਡਰ", "2 ਵੱਡੇ ਚਮਚ ਦਹੀਂ", "1 ਚਮਚ ਸ਼ਹਿਦ"],
        method: "ਸਾਰੀਆਂ ਸਮੱਗਰੀਆਂ ਨੂੰ ਮਿਲਾ ਕੇ ਇੱਕ ਨਿਰਵਿਘਨ ਪੇਸਟ ਬਣਾਓ। ਸਾਫ਼ ਚਿਹਰੇ 'ਤੇ ਲਗਾਓ ਅਤੇ 15-20 ਮਿੰਟ ਲਈ ਛੱਡੋ। ਗੁਨਗੁਨੇ ਪਾਣੀ ਨਾਲ ਧੋਵੋ।",
        benefits:
          "ਹਲਦੀ ਵਿੱਚ ਸੋਜ਼ ਰੋਧੀ ਅਤੇ ਬੈਕਟੀਰੀਆ ਰੋਧੀ ਗੁਣ ਹਨ ਜੋ ਮੁਹਾਸਿਆਂ ਨੂੰ ਘਟਾਉਣ, ਚਮੜੀ ਨੂੰ ਨਿਖਾਰਨ ਅਤੇ ਕੁਦਰਤੀ ਚਮਕ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।",
      },
      te: {
        title: "పసుపు ముఖ మాస్క్",
        ingredients: ["1 టీస్పూన్ పసుపు పొడి", "2 టేబుల్ స్పూన్లు పెరుగు", "1 టీస్పూన్ తేనె"],
        method: "అన్ని పదార్థాలను కలిపి మృదువైన పేస్ట్ చేయండి. శుభ్రమైన ముఖంపై రాసి 15-20 నిమిషాలు వదిలేయండి. గోరువెచ్చని నీటితో కడుక్కోండి.",
        benefits:
          "పసుపులో వాపు నిరోధక మరియు బ్యాక్టీరియా నిరోధక లక్షణాలు ఉన్నాయి, ఇవి మొటిమలను తగ్గించడంలో, చర్మాన్ని ప్రకాశవంతం చేయడంలో మరియు సహజ మెరుపును అందించడంలో సహాయపడతాయి.",
      },
    },
    2: {
      en: {
        title: "Rose Water Toner",
        ingredients: ["Fresh rose petals", "Distilled water"],
        method:
          "Boil rose petals in distilled water for 10-15 minutes. Strain and let it cool. Store in a clean bottle and use as a toner twice daily.",
        benefits:
          "Rose water helps balance skin pH, reduces redness, hydrates the skin, and provides a refreshing feeling.",
      },
      hi: {
        title: "गुलाब जल टोनर",
        ingredients: ["ताजी गुलाब की पंखुड़ियां", "आसुत जल"],
        method:
          "गुलाब की पंखुड़ियों को आसुत जल में 10-15 मिनट तक उबालें। छान लें और ठंडा होने दें। साफ बोतल में स्टोर करें और दिन में दो बार टोनर के रूप में उपयोग करें।",
        benefits:
          "गुलाब जल त्वचा के pH को संतुलित करने, लालिमा कम करने, त्वचा को हाइड्रेट करने और तरोताजा एहसास प्रदान करने में मदद करता है।",
      },
      pa: {
        title: "ਗੁਲਾਬ ਜਲ ਟੋਨਰ",
        ingredients: ["ਤਾਜ਼ੀਆਂ ਗੁਲਾਬ ਦੀਆਂ ਪੱਤੀਆਂ", "ਡਿਸਟਿਲਡ ਪਾਣੀ"],
        method:
          "ਗੁਲਾਬ ਦੀਆਂ ਪੱਤੀਆਂ ਨੂੰ ਡਿਸਟਿਲਡ ਪਾਣੀ ਵਿੱਚ 10-15 ਮਿੰਟ ਤੱਕ ਉਬਾਲੋ। ਛਾਣੋ ਅਤੇ ਠੰਡਾ ਹੋਣ ਦਿਓ। ਸਾਫ਼ ਬੋਤਲ ਵਿੱਚ ਸਟੋਰ ਕਰੋ ਅਤੇ ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ ਟੋਨਰ ਵਜੋਂ ਵਰਤੋ।",
        benefits:
          "ਗੁਲਾਬ ਜਲ ਚਮੜੀ ਦੇ pH ਨੂੰ ਸੰਤੁਲਿਤ ਕਰਨ, ਲਾਲੀ ਘਟਾਉਣ, ਚਮੜੀ ਨੂੰ ਹਾਈਡ੍ਰੇਟ ਕਰਨ ਅਤੇ ਤਾਜ਼ਗੀ ਦਾ ਅਹਿਸਾਸ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
      },
      te: {
        title: "గులాబీ నీటి టోనర్",
        ingredients: ["తాజా గులాబీ రేకులు", "డిస్టిల్డ్ వాటర్"],
        method:
          "గులాబీ రేకులను డిస్టిల్డ్ వాటర్‌లో 10-15 నిమిషాలు ఉడకబెట్టండి. వడపోసి చల్లార చేయండి. శుభ్రమైన సీసాలో నిల్వ చేసి రోజుకు రెండుసార్లు టోనర్‌గా వాడండి.",
        benefits:
          "గులాబీ నీరు చర్మ pH సమతుల్యతను కాపాడటంలో, ఎరుపును తగ్గించడంలో, చర్మానికి తేమను అందించడంలో మరియు రిఫ్రెష్ అనుభవాన్ని అందించడంలో సహాయపడుతుంది.",
      },
    },
    // Add more remedy details as needed
  },
  haircare: {
    1: {
      en: {
        title: "Coconut Oil Massage",
        ingredients: ["2-3 tbsp coconut oil", "Few drops of essential oil (optional)"],
        method:
          "Warm the coconut oil slightly. Massage gently into scalp and hair. Leave for 30 minutes to 2 hours. Wash with mild shampoo.",
        benefits:
          "Coconut oil penetrates hair shaft, reduces protein loss, moisturizes scalp, and promotes healthy hair growth.",
      },
      hi: {
        title: "नारियल तेल मसाज",
        ingredients: ["2-3 बड़े चम्मच नारियल तेल", "कुछ बूंदें आवश्यक तेल (वैकल्पिक)"],
        method: "नारियल तेल को हल्का गर्म करें। स्कैल्प और बालों में धीरे से मसाज करें। 30 मिनट से 2 घंटे तक छोड़ें। हल्के शैम्पू से धो लें।",
        benefits:
          "नारियल तेल बालों के शाफ्ट में प्रवेश करता है, प्रोटीन की हानि को कम करता है, स्कैल्प को मॉइस्चराइज़ करता है और स्वस्थ बाल विकास को बढ़ावा देता है।",
      },
      pa: {
        title: "ਨਾਰੀਅਲ ਤੇਲ ਮਸਾਜ",
        ingredients: ["2-3 ਵੱਡੇ ਚਮਚ ਨਾਰੀਅਲ ਤੇਲ", "ਕੁਝ ਬੂੰਦਾਂ ਜ਼ਰੂਰੀ ਤੇਲ (ਵਿਕਲਪਿਕ)"],
        method: "ਨਾਰੀਅਲ ਤੇਲ ਨੂੰ ਹਲਕਾ ਗਰਮ ਕਰੋ। ਸਿਰ ਦੀ ਚਮੜੀ ਅਤੇ ਵਾਲਾਂ ਵਿੱਚ ਹੌਲੀ ਹੌਲੀ ਮਸਾਜ ਕਰੋ। 30 ਮਿੰਟ ਤੋਂ 2 ਘੰਟੇ ਤੱਕ ਛੱਡੋ। ਹਲਕੇ ਸ਼ੈਂਪੂ ਨਾਲ ਧੋਵੋ।",
        benefits:
          "ਨਾਰੀਅਲ ਤੇਲ ਵਾਲਾਂ ਦੇ ਸ਼ਾਫਟ ਵਿੱਚ ਪ੍ਰਵੇਸ਼ ਕਰਦਾ ਹੈ, ਪ੍ਰੋਟੀਨ ਦੇ ਨੁਕਸਾਨ ਨੂੰ ਘਟਾਉਂਦਾ ਹੈ, ਸਿਰ ਦੀ ਚਮੜੀ ਨੂੰ ਨਮੀ ਦਿੰਦਾ ਹੈ ਅਤੇ ਸਿਹਤਮੰਦ ਵਾਲਾਂ ਦੇ ਵਾਧੇ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਦਾ ਹੈ।",
      },
      te: {
        title: "కొబ్బరి నూనె మసాజ్",
        ingredients: ["2-3 టేబుల్ స్పూన్లు కొబ్బరి నూనె", "కొన్ని చుక్కలు ఎసెన్షియల్ ఆయిల్ (ఐచ్ఛికం)"],
        method:
          "కొబ్బరి నూనెను కొద్దిగా వేడిమి చేయండి. తల చర్మం మరియు జుట్టులో మెల్లగా మసాజ్ చేయండి. 30 నిమిషాల నుండి 2 గంటల వరకు వదిలేయండి. తేలికపాటి షాంపూతో కడుక్కోండి.",
        benefits:
          "కొబ్బరి నూనె జుట్టు షాఫ్ట్‌లోకి చొచ్చుకుపోతుంది, ప్రోటీన్ నష్టాన్ని తగ్గిస్తుంది, తల చర్మానికి తేమను అందిస్తుంది మరియు ఆరోగ్యకరమైన జుట్టు పెరుగుదలను ప్రోత్సహిస్తుంది.",
      },
    },
    // Add more haircare remedies
  },
  // Add more categories as needed
}

// DOM elements
const langToggle = document.getElementById("langToggle")
const languageDropdown = document.querySelector(".language-dropdown")
const languageOptions = document.querySelectorAll(".lang-option")
const modal = document.getElementById("remedyModal")
const modalTitle = document.getElementById("modalTitle")
const modalContent = document.getElementById("modalContent")
const closeBtn = document.querySelector(".close-btn")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeLanguage()
  initializeNavigation()
  initializeModal()
  initializeCardNavigation()
})

// Language functionality
function initializeLanguage() {
  // Language toggle dropdown
  langToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    languageDropdown.classList.toggle("active")
  })

  // Language option selection
  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang")
      changeLanguage(selectedLang)
      languageDropdown.classList.remove("active")
    })
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    languageDropdown.classList.remove("active")
  })
}

function changeLanguage(lang) {
  currentLanguage = lang

  // Update language button text
  const langText = document.querySelector(".lang-text")
  langText.textContent = languageData[lang]

  // Update active language option
  languageOptions.forEach((option) => {
    option.classList.remove("active")
    if (option.getAttribute("data-lang") === lang) {
      option.classList.add("active")
    }
  })

  // Update all text elements
  updatePageLanguage(lang)
}

function updatePageLanguage(lang) {
  const elements = document.querySelectorAll(`[data-${lang}]`)
  elements.forEach((element) => {
    const text = element.getAttribute(`data-${lang}`)
    if (text) {
      element.textContent = text
    }
  })
}

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-links a")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Modal functionality
function initializeModal() {
  // Close modal when clicking close button
  closeBtn.addEventListener("click", closeModal)

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal()
    }
  })

  // Add click listeners to remedy cards
  const remedyCards = document.querySelectorAll(".remedy-card")
  remedyCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      const id = this.getAttribute("data-id")
      openModal(category, id)
    })
  })
}

function openModal(category, id) {
  const remedy = remedyDetails[category] && remedyDetails[category][id]

  if (remedy && remedy[currentLanguage]) {
    const data = remedy[currentLanguage]

    modalTitle.textContent = data.title

    let content = ""

    if (data.ingredients) {
      content += `<div class="ingredients">
                <h3>${getTranslation("ingredients")}</h3>
                <ul>`
      data.ingredients.forEach((ingredient) => {
        content += `<li>${ingredient}</li>`
      })
      content += `</ul></div>`
    }

    if (data.method) {
      content += `<div class="method">
                <h3>${getTranslation("method")}</h3>
                <p>${data.method}</p>
            </div>`
    }

    if (data.benefits) {
      content += `<div class="benefits">
                <h3>${getTranslation("benefits")}</h3>
                <p>${data.benefits}</p>
            </div>`
    }

    modalContent.innerHTML = content
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  } else {
    // Fallback content for remedies without detailed data
    const cardTitle = document.querySelector(`[data-category="${category}"][data-id="${id}"] h3`).textContent
    const cardDescription = document.querySelector(`[data-category="${category}"][data-id="${id}"] p`).textContent

    modalTitle.textContent = cardTitle
    modalContent.innerHTML = `
            <div class="benefits">
                <h3>${getTranslation("benefits")}</h3>
                <p>${cardDescription}</p>
            </div>
            <div class="method">
                <h3>${getTranslation("note")}</h3>
                <p>${getTranslation("consult_note")}</p>
            </div>
        `
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function closeModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

function getTranslation(key) {
  const translations = {
    ingredients: {
      en: "Ingredients",
      hi: "सामग्री",
      pa: "ਸਮੱਗਰੀ",
      te: "పదార్థాలు",
    },
    method: {
      en: "Method",
      hi: "विधि",
      pa: "ਵਿਧੀ",
      te: "పద్ధతి",
    },
    benefits: {
      en: "Benefits",
      hi: "लाभ",
      pa: "ਫਾਇਦੇ",
      te: "ప్రయోజనాలు",
    },
    note: {
      en: "Note",
      hi: "नोट",
      pa: "ਨੋਟ",
      te: "గమనిక",
    },
    consult_note: {
      en: "Please consult with a healthcare professional before trying any new remedy, especially if you have allergies or medical conditions.",
      hi: "कृपया किसी भी नए उपचार को आजमाने से पहले स्वास्थ्य सेवा पेशेवर से सलाह लें, विशेष रूप से यदि आपको एलर्जी या चिकित्सा स्थितियां हैं।",
      pa: "ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਵੀ ਨਵਾਂ ਇਲਾਜ ਅਜ਼ਮਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਸਿਹਤ ਸੇਵਾ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ, ਖਾਸ ਕਰਕੇ ਜੇ ਤੁਹਾਨੂੰ ਐਲਰਜੀ ਜਾਂ ਮੈਡੀਕਲ ਸਥਿਤੀਆਂ ਹਨ।",
      te: "దయచేసి ఏదైనా కొత్త చికిత్సను ప్రయత్నించే ముందు ఆరోగ్య సంరక్షణ నిపుణుడిని సంప్రదించండి, ముఖ్యంగా మీకు అలెర్జీలు లేదా వైద్య పరిస్థితులు ఉంటే.",
    },
  }

  return translations[key] && translations[key][currentLanguage]
    ? translations[key][currentLanguage]
    : translations[key]["en"]
}

// Card navigation functionality
function initializeCardNavigation() {
  const sections = document.querySelectorAll(".remedy-section")

  sections.forEach((section) => {
    const prevBtn = section.querySelector(".prev-btn")
    const nextBtn = section.querySelector(".next-btn")
    const cardsWrapper = section.querySelector(".cards-wrapper")

    if (prevBtn && nextBtn && cardsWrapper) {
      prevBtn.addEventListener("click", () => scrollCards(cardsWrapper, -1))
      nextBtn.addEventListener("click", () => scrollCards(cardsWrapper, 1))
    }
  })
}

function scrollCards(wrapper, direction) {
  const cardWidth = wrapper.querySelector(".remedy-card").offsetWidth + 20 // card width + gap
  const scrollAmount = cardWidth * direction

  wrapper.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll-based navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".remedy-section")
  const navLinks = document.querySelectorAll(".nav-links a")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add touch support for mobile card navigation
let startX = 0
let scrollLeft = 0

document.querySelectorAll(".cards-wrapper").forEach((wrapper) => {
  wrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - wrapper.offsetLeft
    scrollLeft = wrapper.scrollLeft
  })

  wrapper.addEventListener("touchmove", (e) => {
    if (!startX) return
    e.preventDefault()
    const x = e.touches[0].pageX - wrapper.offsetLeft
    const walk = (x - startX) * 2
    wrapper.scrollLeft = scrollLeft - walk
  })

  wrapper.addEventListener("touchend", () => {
    startX = 0
  })
})
