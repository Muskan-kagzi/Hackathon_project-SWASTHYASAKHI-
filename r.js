// Risk calculation logic
const riskFactors = {
  protection: {
    none: 5,
    withdrawal: 4,
    "birth-control": 2,
    condom: 1,
    both: 0.5,
  },
  timing: {
    ovulation: 5,
    fertile: 4,
    unknown: 3,
    safe: 1,
    period: 0.5,
  },
  partner: {
    multiple: 5,
    unknown: 4,
    new: 3,
    "known-clean": 1,
  },
}

// DOM elements
const riskForm = document.getElementById("riskForm")
const resultsDiv = document.getElementById("results")
const panicExitBtn = document.getElementById("panicExit")
const pillModal = document.getElementById("pillModal")
const resourceModal = document.getElementById("resourceModal")

// Event listeners
riskForm.addEventListener("submit", calculateRisk)
panicExitBtn.addEventListener("click", panicExit)

// Calculate risk function
function calculateRisk(e) {
  e.preventDefault()

  const formData = new FormData(riskForm)
  const protection = formData.get("protection")
  const timing = formData.get("timing")
  const partner = formData.get("partner")

  // Calculate risk score
  const protectionScore = riskFactors.protection[protection] || 0
  const timingScore = riskFactors.timing[timing] || 0
  const partnerScore = riskFactors.partner[partner] || 0

  const totalScore = (protectionScore + timingScore + partnerScore) / 3

  // Determine risk level
  let riskLevel, riskColor, recommendations

  if (totalScore <= 2) {
    riskLevel = "Low Risk"
    riskColor = "low"
    recommendations = [
      "Continue using protection consistently",
      "Regular STI testing every 6 months",
      "Maintain open communication with partners",
      "Consider PrEP if at ongoing risk",
    ]
  } else if (totalScore <= 3.5) {
    riskLevel = "Medium Risk"
    riskColor = "medium"
    recommendations = [
      "Get tested for STIs within 2 weeks",
      "Consider emergency contraception if within 120 hours",
      "Use protection consistently in future",
      "Consult healthcare provider for advice",
      "Monitor for symptoms",
    ]
  } else {
    riskLevel = "High Risk"
    riskColor = "high"
    recommendations = [
      "Seek immediate medical attention",
      "Get emergency contraception ASAP (within 120 hours)",
      "Schedule STI testing within 1 week",
      "Consider PEP (Post-Exposure Prophylaxis) for HIV",
      "Follow up with healthcare provider",
      "Use protection consistently going forward",
    ]
  }

  // Display results
  displayResults(riskLevel, riskColor, recommendations)
}

function displayResults(riskLevel, riskColor, recommendations) {
  const riskIndicator = resultsDiv.querySelector(".risk-indicator")
  const riskText = resultsDiv.querySelector(".risk-text")
  const recommendationsList = document.getElementById("recommendations")

  // Update risk indicator
  riskIndicator.className = `risk-indicator ${riskColor}`
  riskText.textContent = riskLevel

  // Update recommendations
  recommendationsList.innerHTML = ""
  recommendations.forEach((rec) => {
    const li = document.createElement("li")
    li.textContent = rec
    recommendationsList.appendChild(li)
  })

  // Show results with animation
  resultsDiv.classList.remove("hidden")
  resultsDiv.scrollIntoView({ behavior: "smooth" })
}

// Emergency pill reminder
function showEmergencyPill() {
  pillModal.classList.remove("hidden")
}

function closePillModal() {
  pillModal.classList.add("hidden")
}

function setReminder() {
  // Check if browser supports notifications
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // Set reminder for 1 hour (for demo purposes)
        setTimeout(() => {
          new Notification("Emergency Contraception Reminder", {
            body: "Remember to take emergency contraception as soon as possible.",
            icon: "/favicon.ico",
          })
        }, 3600000) // 1 hour

        alert("Reminder set! You'll be notified in 1 hour.")
      } else {
        // Fallback to phone reminder
        const reminderTime = new Date(Date.now() + 3600000) // 1 hour from now
        const phoneReminder = `Set a phone reminder for ${reminderTime.toLocaleTimeString()} to take emergency contraception.`

        if (navigator.share) {
          navigator.share({
            title: "Emergency Contraception Reminder",
            text: phoneReminder,
          })
        } else {
          alert(phoneReminder)
        }
      }
    })
  } else {
    alert("Set a phone reminder to take emergency contraception as soon as possible (within 72-120 hours).")
  }

  closePillModal()
}

// Show abortion resources
function showAbortionResources() {
  const content = `
        <h3><i class="fas fa-hospital"></i> Safe Abortion Resources</h3>
        <div class="resource-list">
            <div class="resource-item">
                <h4>Planned Parenthood</h4>
                <p>Find local clinics and services</p>
                <a href="https://www.plannedparenthood.org" target="_blank" class="resource-link">Visit Website</a>
            </div>
            <div class="resource-item">
                <h4>National Abortion Federation</h4>
                <p>Hotline: 1-800-772-9100</p>
                <a href="tel:1-800-772-9100" class="resource-link">Call Now</a>
            </div>
            <div class="resource-item">
                <h4>Guttmacher Institute</h4>
                <p>State-by-state abortion laws and policies</p>
                <a href="https://www.guttmacher.org" target="_blank" class="resource-link">Learn More</a>
            </div>
        </div>
    `

  showResourceModal(content)
}

// Show NGO links
function showNGOLinks() {
  const content = `
        <h3><i class="fas fa-hands-helping"></i> Support Organizations</h3>
        <div class="resource-list">
            <div class="resource-item">
                <h4>All-Options</h4>
                <p>Pregnancy, parenting, abortion, and adoption support</p>
                <a href="https://www.all-options.org" target="_blank" class="resource-link">Get Support</a>
            </div>
            <div class="resource-item">
                <h4>Exhale</h4>
                <p>After-abortion support and counseling</p>
                <a href="https://exhaleprovoice.org" target="_blank" class="resource-link">Find Help</a>
            </div>
            <div class="resource-item">
                <h4>RAINN</h4>
                <p>Sexual assault support: 1-800-656-4673</p>
                <a href="tel:1-800-656-4673" class="resource-link">Call Hotline</a>
            </div>
            <div class="resource-item">
                <h4>Crisis Text Line</h4>
                <p>Text HOME to 741741 for crisis support</p>
                <a href="sms:741741&body=HOME" class="resource-link">Text Now</a>
            </div>
        </div>
    `

  showResourceModal(content)
}

function showResourceModal(content) {
  document.getElementById("modalContent").innerHTML = content
  resourceModal.classList.remove("hidden")
}

function closeResourceModal() {
  resourceModal.classList.add("hidden")
}

// Panic exit function
function panicExit() {
  // Clear any sensitive data
  riskForm.reset()
  resultsDiv.classList.add("hidden")

  // Redirect to a neutral page
  window.location.href = "../front/index2.html"
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === pillModal) {
    closePillModal()
  }
  if (e.target === resourceModal) {
    closeResourceModal()
  }
})

// Smooth scroll for internal links
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling behavior
  document.documentElement.style.scrollBehavior = "smooth"

  // Initialize any additional features
  console.log("STI & Pregnancy Risk Calculator loaded successfully")
})

// Add CSS for resource modal content
const additionalCSS = `
.resource-list {
    display: grid;
    gap: 20px;
    margin-top: 20px;
}

.resource-item {
    padding: 15px;
    border: 1px solid #e1bee7;
    border-radius: 8px;
    background: #fafafa;
}

.resource-item h4 {
    color: #8e44ad;
    margin-bottom: 8px;
}

.resource-item p {
    color: #666;
    margin-bottom: 10px;
}

.resource-link {
    background: linear-gradient(135deg, #e91e63, #8e44ad);
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    transition: all 0.3s ease;
}

.resource-link:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(233, 30, 99, 0.3);
}
`

// Inject additional CSS
const style = document.createElement("style")
style.textContent = additionalCSS
document.head.appendChild(style)
