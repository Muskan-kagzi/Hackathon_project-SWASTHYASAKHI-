// Global variables
let scene, camera, renderer, controls
let anatomicalGroup, leftHandGroup, rightHandGroup, leftBreastMesh, rightBreastMesh
let currentStep = 0
let isPlaying = false
let isRotating = true
let isMuted = false
let progress = 0
let speechRate = 0.8
let speechPitch = 1.0
let selectedVoice = 0
let availableVoices = []
let isSpeaking = false
let currentUtterance = null
let progressInterval = null

// Examination steps data
const examinationSteps = [
  {
    title: "Visual Inspection - Arms Down",
    description:
      "Stand in front of a mirror with your arms at your sides. Look for any changes in size, shape, or skin texture.",
    details: "Look for dimpling, puckering, or changes in the nipple. Check for any asymmetry between breasts.",
    voiceText:
      "Step one: Visual inspection with arms down. Stand in front of a mirror with your arms relaxed at your sides. Carefully examine both breasts, looking for any changes in size, shape, or skin texture. Pay special attention to dimpling, puckering, or any changes around the nipple area. Notice if there's any asymmetry between your breasts that wasn't there before.",
    duration: 30,
  },
  {
    title: "Visual Inspection - Arms Raised",
    description: "Raise your arms overhead and look for the same changes. This helps reveal any dimpling or puckering.",
    details: "Pay attention to how the breasts move and whether they move together symmetrically.",
    voiceText:
      "Step two: Visual inspection with arms raised. Now raise both arms high above your head and look for the same changes. This position helps reveal any dimpling or puckering that might not be visible with arms down. Watch how your breasts move and check if they move together symmetrically.",
    duration: 30,
  },
  {
    title: "Palpation - Left Breast",
    description: "Lie down and use your right hand to examine your left breast using circular motions.",
    details: "Use light, medium, and firm pressure. Cover the entire breast area from collarbone to bra line.",
    voiceText:
      "Step three: Palpation of the left breast. Lie down comfortably and use your right hand to examine your left breast. Use the pads of your three middle fingers to make small circular motions. Start with light pressure, then medium, then firm pressure at each spot. Cover the entire breast area from your collarbone down to your bra line, and from your armpit to your breastbone.",
    duration: 60,
  },
  {
    title: "Palpation - Right Breast",
    description: "Use your left hand to examine your right breast using the same circular motion technique.",
    details: "Don't forget to check the armpit area and above the collarbone for any lumps or swelling.",
    voiceText:
      "Step four: Palpation of the right breast. Now use your left hand to examine your right breast using the same circular motion technique. Remember to use light, medium, and firm pressure at each location. Don't forget to check your armpit area and the area above your collarbone for any lumps, thickening, or swelling.",
    duration: 60,
  },
  {
    title: "Final Check",
    description: "Check both nipples for any discharge by gently squeezing the nipple area.",
    details: "Any unusual discharge should be reported to your healthcare provider immediately.",
    voiceText:
      "Step five: Final nipple check. Gently squeeze the area around each nipple to check for any discharge. Use your thumb and index finger to apply gentle pressure. Any unusual discharge, especially if it's bloody, clear, or occurs without squeezing, should be reported to your healthcare provider immediately.",
    duration: 30,
  },
]

// Import Three.js
const THREE = window.THREE

// Initialize the application
function init() {
  initThreeJS()
  initUI()
  initVoices()
  createAnatomicalModel()
  updateStepsOverview()
  animate()
}

// Initialize Three.js scene
function initThreeJS() {
  const canvas = document.getElementById("threeCanvas")
  const container = canvas.parentElement

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  // Camera
  camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.set(-10, -10, -5)
  scene.add(pointLight)

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 3
  controls.maxDistance = 8

  // Handle resize
  window.addEventListener("resize", onWindowResize)
}

// Create the anatomical model
function createAnatomicalModel() {
  anatomicalGroup = new THREE.Group()

  // Create female body
  createFemaleBody()

  // Create ribcage
  createRibcage()

  // Create breasts
  createBreasts()

  // Create lymph nodes
  createLymphNodes()

  // Create hands
  createHands()

  scene.add(anatomicalGroup)
}

function createFemaleBody() {
  // Main torso - more feminine shape
  const torsoGeometry = new THREE.CylinderGeometry(1.0, 1.3, 2.5, 16)
  const torsoMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5d5c8,
    transparent: true,
    opacity: 0.9,
  })
  const torso = new THREE.Mesh(torsoGeometry, torsoMaterial)
  torso.position.set(0, 0, 0)
  anatomicalGroup.add(torso)

  // Chest area
  const chestGeometry = new THREE.BoxGeometry(1.8, 1.2, 0.8)
  const chestMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5d5c8,
    transparent: true,
    opacity: 0.8,
  })
  const chest = new THREE.Mesh(chestGeometry, chestMaterial)
  chest.position.set(0, 0.8, 0.2)
  anatomicalGroup.add(chest)

  // Shoulders
  const shoulderGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.8, 8)
  const shoulderMaterial = new THREE.MeshStandardMaterial({ color: 0xf5d5c8 })

  const leftShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial)
  leftShoulder.position.set(-0.9, 1.2, 0)
  leftShoulder.rotation.z = 0.3
  anatomicalGroup.add(leftShoulder)

  const rightShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial)
  rightShoulder.position.set(0.9, 1.2, 0)
  rightShoulder.rotation.z = -0.3
  anatomicalGroup.add(rightShoulder)

  // Neck
  const neckGeometry = new THREE.CylinderGeometry(0.25, 0.3, 0.6, 8)
  const neckMaterial = new THREE.MeshStandardMaterial({ color: 0xf5d5c8 })
  const neck = new THREE.Mesh(neckGeometry, neckMaterial)
  neck.position.set(0, 1.8, 0)
  anatomicalGroup.add(neck)
}

function createRibcage() {
  for (let i = 0; i < 6; i++) {
    const ribGeometry = new THREE.TorusGeometry(0.9 + i * 0.08, 0.015, 6, 12)
    const ribMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e8e8,
      transparent: true,
      opacity: 0.6,
    })
    const rib = new THREE.Mesh(ribGeometry, ribMaterial)
    rib.position.set(0, 1.0 - i * 0.25, 0)
    anatomicalGroup.add(rib)
  }
}

function createBreasts() {
  // Left breast
  const leftBreastGeometry = new THREE.SphereGeometry(0.4, 20, 20)
  const leftBreastMaterial = new THREE.MeshStandardMaterial({ color: 0xfdbcb4 })
  leftBreastMesh = new THREE.Mesh(leftBreastGeometry, leftBreastMaterial)
  leftBreastMesh.position.set(-0.45, 0.9, 0.9)
  anatomicalGroup.add(leftBreastMesh)

  // Left nipple
  const leftNippleGeometry = new THREE.CylinderGeometry(0.03, 0.04, 0.02, 8)
  const nippleMaterial = new THREE.MeshStandardMaterial({ color: 0xd4a574 })
  const leftNipple = new THREE.Mesh(leftNippleGeometry, nippleMaterial)
  leftNipple.position.set(-0.45, 0.9, 1.25)
  anatomicalGroup.add(leftNipple)

  // Right breast
  const rightBreastGeometry = new THREE.SphereGeometry(0.4, 20, 20)
  const rightBreastMaterial = new THREE.MeshStandardMaterial({ color: 0xfdbcb4 })
  rightBreastMesh = new THREE.Mesh(rightBreastGeometry, rightBreastMaterial)
  rightBreastMesh.position.set(0.45, 0.9, 0.9)
  anatomicalGroup.add(rightBreastMesh)

  // Right nipple
  const rightNipple = new THREE.Mesh(leftNippleGeometry, nippleMaterial)
  rightNipple.position.set(0.45, 0.9, 1.25)
  anatomicalGroup.add(rightNipple)
}

function createLymphNodes() {
  const lymphGeometry = new THREE.SphereGeometry(0.06, 8, 8)
  const lymphMaterial = new THREE.MeshStandardMaterial({
    color: 0xff9999,
    transparent: true,
    opacity: 0.7,
  })

  const leftLymph = new THREE.Mesh(lymphGeometry, lymphMaterial)
  leftLymph.position.set(-0.9, 0.6, 0.4)
  anatomicalGroup.add(leftLymph)

  const rightLymph = new THREE.Mesh(lymphGeometry, lymphMaterial)
  rightLymph.position.set(0.9, 0.6, 0.4)
  anatomicalGroup.add(rightLymph)
}

function createHands() {
  leftHandGroup = new THREE.Group()
  rightHandGroup = new THREE.Group()

  // Create hand geometry
  const handGeometry = createHandGeometry()

  leftHandGroup.add(handGeometry.clone())
  rightHandGroup.add(handGeometry.clone())

  leftHandGroup.position.set(-1.5, 0, 1)
  rightHandGroup.position.set(1.5, 0, 1)

  anatomicalGroup.add(leftHandGroup)
  anatomicalGroup.add(rightHandGroup)
}

function createHandGeometry() {
  const handGroup = new THREE.Group()

  // Palm
  const palmGeometry = new THREE.BoxGeometry(0.15, 0.25, 0.08)
  const handMaterial = new THREE.MeshStandardMaterial({ color: 0xf0c4a0 })
  const palm = new THREE.Mesh(palmGeometry, handMaterial)
  handGroup.add(palm)

  // Fingers
  for (let i = 0; i < 4; i++) {
    const fingerGroup = new THREE.Group()
    fingerGroup.position.set((i - 1.5) * 0.04, 0.15, 0)

    // Finger segments
    const segment1Geometry = new THREE.CylinderGeometry(0.015, 0.02, 0.12, 6)
    const segment1 = new THREE.Mesh(segment1Geometry, handMaterial)
    segment1.position.set(0, 0.08, 0)
    fingerGroup.add(segment1)

    const segment2Geometry = new THREE.CylinderGeometry(0.012, 0.015, 0.08, 6)
    const segment2 = new THREE.Mesh(segment2Geometry, handMaterial)
    segment2.position.set(0, 0.18, 0)
    fingerGroup.add(segment2)

    const segment3Geometry = new THREE.CylinderGeometry(0.01, 0.012, 0.06, 6)
    const segment3 = new THREE.Mesh(segment3Geometry, handMaterial)
    segment3.position.set(0, 0.24, 0)
    fingerGroup.add(segment3)

    handGroup.add(fingerGroup)
  }

  // Thumb
  const thumbGroup = new THREE.Group()
  thumbGroup.position.set(-0.08, 0.05, 0.03)
  thumbGroup.rotation.z = -0.5

  const thumb1Geometry = new THREE.CylinderGeometry(0.018, 0.022, 0.08, 6)
  const thumb1 = new THREE.Mesh(thumb1Geometry, handMaterial)
  thumb1.position.set(0, 0.04, 0)
  thumbGroup.add(thumb1)

  const thumb2Geometry = new THREE.CylinderGeometry(0.015, 0.018, 0.06, 6)
  const thumb2 = new THREE.Mesh(thumb2Geometry, handMaterial)
  thumb2.position.set(0, 0.1, 0)
  thumbGroup.add(thumb2)

  handGroup.add(thumbGroup)

  return handGroup
}

// Initialize UI event listeners
function initUI() {
  // Control buttons
  document.getElementById("startBtn").addEventListener("click", startExamination)
  document.getElementById("pauseBtn").addEventListener("click", pauseExamination)
  document.getElementById("resetBtn").addEventListener("click", resetExamination)
  document.getElementById("repeatBtn").addEventListener("click", repeatCurrentStep)
  document.getElementById("nextStepBtn").addEventListener("click", nextStep)

  // Settings buttons
  document.getElementById("rotateBtn").addEventListener("click", toggleRotation)
  document.getElementById("settingsBtn").addEventListener("click", toggleVoiceSettings)
  document.getElementById("muteBtn").addEventListener("click", toggleMute)

  // Voice settings
  document.getElementById("speedRange").addEventListener("input", updateSpeechRate)
  document.getElementById("pitchRange").addEventListener("input", updateSpeechPitch)
  document.getElementById("voiceSelect").addEventListener("change", updateSelectedVoice)
}

// Initialize voice synthesis
function initVoices() {
  if ("speechSynthesis" in window) {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      const englishVoices = voices.filter(
        (voice) =>
          voice.lang.startsWith("en") &&
          (voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("woman") ||
            voice.name.toLowerCase().includes("samantha") ||
            voice.name.toLowerCase().includes("karen") ||
            !voice.name.toLowerCase().includes("male")),
      )

      availableVoices = englishVoices.length > 0 ? englishVoices : voices.filter((v) => v.lang.startsWith("en"))

      const voiceSelect = document.getElementById("voiceSelect")
      voiceSelect.innerHTML = ""
      availableVoices.forEach((voice, index) => {
        const option = document.createElement("option")
        option.value = index
        option.textContent = `${voice.name} (${voice.lang})`
        voiceSelect.appendChild(option)
      })
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
  }
}

// Speech synthesis function
function speakText(text, isIntroduction = false) {
  if (!("speechSynthesis" in window) || isMuted) return

  speechSynthesis.cancel()
  setIsSpeaking(false)

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = speechRate
  utterance.pitch = speechPitch
  utterance.volume = 1

  if (availableVoices.length > 0 && availableVoices[selectedVoice]) {
    utterance.voice = availableVoices[selectedVoice]
  }

  utterance.onstart = () => setIsSpeaking(true)
  utterance.onend = () => setIsSpeaking(false)
  utterance.onerror = () => setIsSpeaking(false)

  currentUtterance = utterance
  speechSynthesis.speak(utterance)
}

// Animation loop
function animate() {
  requestAnimationFrame(animate)

  const time = Date.now() * 0.001

  // Rotate model if enabled
  if (isRotating && anatomicalGroup) {
    anatomicalGroup.rotation.y += 0.005
  }

  // Animate hands based on current step
  if (leftHandGroup && rightHandGroup) {
    // Reset positions
    leftHandGroup.position.set(-1.5, 0, 1)
    rightHandGroup.position.set(1.5, 0, 1)
    leftHandGroup.rotation.set(0, 0, 0)
    rightHandGroup.rotation.set(0, 0, 0)

    if (currentStep === 3) {
      // Left breast examination - right hand demonstrates
      rightHandGroup.position.set(-0.4 + Math.cos(time * 2) * 0.3, 0.8 + Math.sin(time * 2) * 0.2, 1.2)
      rightHandGroup.rotation.set(-0.3, 0, Math.sin(time * 3) * 0.2)
    } else if (currentStep === 4) {
      // Right breast examination - left hand demonstrates
      leftHandGroup.position.set(0.4 + Math.cos(time * 2) * 0.3, 0.8 + Math.sin(time * 2) * 0.2, 1.2)
      leftHandGroup.rotation.set(-0.3, 0, Math.sin(time * 3) * -0.2)
    } else if (currentStep === 5) {
      // Nipple check - both hands
      leftHandGroup.position.set(0.4, 0.8, 1.3)
      rightHandGroup.position.set(-0.4, 0.8, 1.3)
      leftHandGroup.rotation.set(-0.5, 0, 0)
      rightHandGroup.rotation.set(-0.5, 0, 0)
    }
  }

  // Update breast highlighting
  if (leftBreastMesh && rightBreastMesh) {
    const highlightColor = new THREE.Color(0xff6b9d)
    const normalColor = new THREE.Color(0xfdbcb4)

    if (currentStep === 1 || currentStep === 2) {
      leftBreastMesh.material.color = highlightColor
      rightBreastMesh.material.color = highlightColor
    } else if (currentStep === 3) {
      leftBreastMesh.material.color = highlightColor
      rightBreastMesh.material.color = normalColor
    } else if (currentStep === 4) {
      leftBreastMesh.material.color = normalColor
      rightBreastMesh.material.color = highlightColor
    } else if (currentStep === 5) {
      leftBreastMesh.material.color = highlightColor
      rightBreastMesh.material.color = highlightColor
    } else {
      leftBreastMesh.material.color = normalColor
      rightBreastMesh.material.color = normalColor
    }
  }

  controls.update()
  renderer.render(scene, camera)
}

// UI Control Functions
function startExamination() {
  currentStep = 1
  isPlaying = true
  progress = 0

  updateUI()

  const introText =
    "Welcome to the breast self-examination guide. This interactive session will walk you through each step of a proper breast self-examination. Please follow along carefully and take your time with each step."
  speakText(introText, true)

  setTimeout(() => {
    const step = examinationSteps[0]
    speakText(step.voiceText || `${step.title}. ${step.description}. ${step.details}`)
  }, 4000)

  startProgressTimer()
}

function pauseExamination() {
  isPlaying = false
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  updateUI()
}

function resetExamination() {
  currentStep = 0
  isPlaying = false
  progress = 0
  setIsSpeaking(false)

  if ("speechSynthesis" in window) {
    speechSynthesis.cancel()
  }

  if (progressInterval) {
    clearInterval(progressInterval)
  }

  updateUI()
}

function nextStep() {
  if (currentStep < examinationSteps.length) {
    currentStep++
    progress = 0

    if (currentStep <= examinationSteps.length) {
      const step = examinationSteps[currentStep - 1]
      speakText(step.voiceText || `${step.title}. ${step.description}. ${step.details}`)
      startProgressTimer()
    }
  } else {
    isPlaying = false
    currentStep = 0
    speakText(
      "Excellent! You have completed the breast self-examination. Remember to perform this examination monthly, ideally three to five days after your menstrual period. If you notice any changes, lumps, or unusual symptoms, please contact your healthcare provider promptly. Early detection is key to successful treatment. Thank you for taking charge of your health.",
    )
  }

  updateUI()
}

function repeatCurrentStep() {
  if (currentStep > 0) {
    const step = examinationSteps[currentStep - 1]
    speakText(step.voiceText || `${step.title}. ${step.description}. ${step.details}`)
  }
}

function toggleRotation() {
  isRotating = !isRotating
}

function toggleVoiceSettings() {
  const settings = document.getElementById("voiceSettings")
  settings.classList.toggle("hidden")
}

function toggleMute() {
  isMuted = !isMuted
  const muteBtn = document.getElementById("muteBtn")
  muteBtn.textContent = isMuted ? "🔇" : "🔊"

  if (isMuted && "speechSynthesis" in window) {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }
}

function updateSpeechRate() {
  const range = document.getElementById("speedRange")
  speechRate = Number.parseFloat(range.value)
  document.getElementById("speedValue").textContent = speechRate
}

function updateSpeechPitch() {
  const range = document.getElementById("pitchRange")
  speechPitch = Number.parseFloat(range.value)
  document.getElementById("pitchValue").textContent = speechPitch
}

function updateSelectedVoice() {
  const select = document.getElementById("voiceSelect")
  selectedVoice = Number.parseInt(select.value)
}

function setIsSpeaking(speaking) {
  isSpeaking = speaking
  const indicator = document.getElementById("speakingIndicator")
  if (speaking) {
    indicator.classList.remove("hidden")
  } else {
    indicator.classList.add("hidden")
  }
}

function startProgressTimer() {
  if (progressInterval) {
    clearInterval(progressInterval)
  }

  if (currentStep > 0) {
    const stepDuration = examinationSteps[currentStep - 1].duration * 1000

    progressInterval = setInterval(() => {
      progress += 100 / (stepDuration / 1000)

      if (progress >= 100) {
        progress = 100
        clearInterval(progressInterval)
        setTimeout(() => {
          if (isPlaying) {
            nextStep()
          }
        }, 1000)
      }

      updateProgressBar()
    }, 1000)
  }
}

function updateProgressBar() {
  const progressFill = document.getElementById("progressFill")
  const progressPercent = document.getElementById("progressPercent")

  progressFill.style.width = `${progress}%`
  progressPercent.textContent = `${Math.round(progress)}%`
}

function updateUI() {
  // Control buttons
  const startBtn = document.getElementById("startBtn")
  const pauseBtn = document.getElementById("pauseBtn")
  const repeatBtn = document.getElementById("repeatBtn")
  const progressSection = document.getElementById("progressSection")
  const currentStepCard = document.getElementById("currentStepCard")

  if (isPlaying) {
    startBtn.classList.add("hidden")
    pauseBtn.classList.remove("hidden")
  } else {
    startBtn.classList.remove("hidden")
    pauseBtn.classList.add("hidden")
  }

  if (currentStep > 0) {
    repeatBtn.classList.remove("hidden")
    progressSection.classList.remove("hidden")
    currentStepCard.classList.remove("hidden")

    // Update step info
    document.getElementById("stepInfo").textContent = `Step ${currentStep} of ${examinationSteps.length}`

    // Update current step details
    const step = examinationSteps[currentStep - 1]
    document.getElementById("stepTitle").textContent = step.title
    document.getElementById("stepDescription").textContent = step.description
    document.getElementById("stepDetails").textContent = step.details

    const nextBtn = document.getElementById("nextStepBtn")
    nextBtn.textContent = currentStep < examinationSteps.length ? "Next Step" : "Complete Examination"

    // Update step indicator
    updateStepIndicator()
    updateTechniqueIndicator()
  } else {
    repeatBtn.classList.add("hidden")
    progressSection.classList.add("hidden")
    currentStepCard.classList.add("hidden")

    // Hide indicators
    document.getElementById("stepIndicator").classList.add("hidden")
    document.getElementById("techniqueIndicator").classList.add("hidden")
  }

  updateStepsOverview()
  updateProgressBar()
}

function updateStepIndicator() {
  const indicator = document.getElementById("stepIndicator")

  if (currentStep > 0) {
    indicator.classList.remove("hidden")
    indicator.innerHTML = `
            <h4>Step ${currentStep}</h4>
            ${
              currentStep >= 3 && currentStep <= 5
                ? `
                <p>
                    ${currentStep === 3 ? "Watch the right hand demonstrate circular motions on left breast" : ""}
                    ${currentStep === 4 ? "Watch the left hand demonstrate circular motions on right breast" : ""}
                    ${currentStep === 5 ? "Watch both hands demonstrate gentle nipple examination" : ""}
                </p>
            `
                : ""
            }
        `
  } else {
    indicator.classList.add("hidden")
  }
}

function updateTechniqueIndicator() {
  const indicator = document.getElementById("techniqueIndicator")

  if (currentStep === 3 || currentStep === 4) {
    indicator.classList.remove("hidden")
    indicator.innerHTML = `
            <h5>Circular Motion</h5>
            <p>Light → Medium → Firm pressure</p>
        `
  } else {
    indicator.classList.add("hidden")
  }
}

function updateStepsOverview() {
  const overview = document.getElementById("stepsOverview")
  overview.innerHTML = ""

  examinationSteps.forEach((step, index) => {
    const stepItem = document.createElement("div")
    stepItem.className = "step-item"

    if (currentStep === index + 1) {
      stepItem.classList.add("active")
    } else if (currentStep > index + 1) {
      stepItem.classList.add("completed")
    }

    stepItem.innerHTML = `
            <div class="step-item-header">
                <div class="step-number ${currentStep === index + 1 ? "active" : currentStep > index + 1 ? "completed" : ""}">
                    ${currentStep > index + 1 ? "✓" : index + 1}
                </div>
                <div class="step-info">
                    <h4>${step.title}</h4>
                    <p>${step.duration}s duration</p>
                </div>
            </div>
        `

    overview.appendChild(stepItem)
  })
}

function onWindowResize() {
  const canvas = document.getElementById("threeCanvas")
  const container = canvas.parentElement

  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
}

// Initialize the application when the page loads
window.addEventListener("load", init)
