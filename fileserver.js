const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("."))

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Risk assessment API endpoint
app.post("/api/risk-assessment", async (req, res) => {
  try {
    const data = req.body

    // Check if OpenAI API key is available
    const hasOpenAIKey = process.env.OPENAI_API_KEY

    let result

    if (hasOpenAIKey) {
      try {
        // AI-powered risk assessment
        result = await getAIRiskAssessment(data)
      } catch (aiError) {
        console.error("AI analysis failed:", aiError)
        result = calculateBasicRisk(data)
      }
    } else {
      console.log("OpenAI API key not available, using basic risk calculation")
      result = calculateBasicRisk(data)
    }

    // Validate and sanitize the response
    const sanitizedResult = {
      overallRisk: result.overallRisk || "medium",
      stiRisk: Math.min(100, Math.max(0, result.stiRisk || 50)),
      pregnancyRisk: Math.min(100, Math.max(0, result.pregnancyRisk || 30)),
      explanation: result.explanation || "Risk assessment completed based on provided information.",
      recommendations: Array.isArray(result.recommendations)
        ? result.recommendations
        : ["Consult with a healthcare provider", "Consider regular STI testing", "Use protection consistently"],
      urgentActions: Array.isArray(result.urgentActions) ? result.urgentActions : [],
    }

    res.json(sanitizedResult)
  } catch (error) {
    console.error("Error in risk assessment:", error)
    res.status(500).json({ error: "Failed to calculate risk assessment" })
  }
})

// AI-powered risk assessment function
async function getAIRiskAssessment(data) {
  // This would use OpenAI API if available
  // For now, we'll use the basic calculation as fallback
  const { Configuration, OpenAIApi } = require("openai")

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not available")
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const prompt = `
    You are a medical AI assistant specializing in sexual health risk assessment. Analyze the following information and provide a comprehensive risk assessment:

    Sexual Health Information:
    - Protection used: ${data.protection}
    - Timing in menstrual cycle: ${data.timing}
    - Partner status: ${data.partner}
    - Age group: ${data.age}
    - Previous STI history: ${data.previousSTIs}
    - Current symptoms: ${data.symptoms.join(", ") || "None reported"}
    - Substance use during activity: ${data.substanceUse}
    - Regular STI testing: ${data.regularTesting}
    - Number of partners (last 6 months): ${data.partnerCount}

    Please provide:
    1. Overall risk level (low/medium/high)
    2. STI risk percentage (0-100)
    3. Pregnancy risk percentage (0-100)
    4. Detailed explanation of the risk factors
    5. Specific recommendations based on the assessment
    6. Any urgent actions needed

    Respond in JSON format with the following structure:
    {
      "overallRisk": "low|medium|high",
      "stiRisk": number,
      "pregnancyRisk": number,
      "explanation": "detailed explanation",
      "recommendations": ["recommendation1", "recommendation2", ...],
      "urgentActions": ["urgent1", "urgent2", ...] (if any)
    }
    `

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a medical AI assistant providing sexual health risk assessments. Always be professional, non-judgmental, and evidence-based. Prioritize user safety and encourage professional medical consultation when appropriate. Never provide specific medical diagnoses, only risk assessments and general guidance.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    })

    const responseText = completion.data.choices[0].message.content

    // Parse the AI response
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      } else {
        return JSON.parse(responseText)
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      throw parseError
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw error
  }
}

// Basic risk calculation function
function calculateBasicRisk(data) {
  let stiRisk = 10
  let pregnancyRisk = 5

  // Protection factor
  if (data.protection === "none") {
    stiRisk += 40
    pregnancyRisk += 60
  } else if (data.protection === "withdrawal") {
    stiRisk += 30
    pregnancyRisk += 40
  } else if (data.protection === "condom") {
    stiRisk += 5
    pregnancyRisk += 10
  } else if (data.protection === "birth-control") {
    pregnancyRisk += 2
    stiRisk += 25 // Birth control doesn't protect against STIs
  }

  // Partner factors
  if (data.partner === "multiple" || data.partner === "unknown") {
    stiRisk += 25
  }

  // Partner count factor
  if (data.partnerCount === "4-5" || data.partnerCount === "6-plus") {
    stiRisk += 20
  }

  // Previous STI history
  if (data.previousSTIs === "treated" || data.previousSTIs === "recent" || data.previousSTIs === "multiple") {
    stiRisk += 15
  }

  // Symptoms
  if (data.symptoms.length > 0 && !data.symptoms.includes("None of the above")) {
    stiRisk += 30
  }

  // Timing
  if (data.timing === "ovulation" || data.timing === "fertile") {
    pregnancyRisk += 25
  }

  // Age factor
  if (data.age === "under-18" || data.age === "18-24") {
    pregnancyRisk += 5
    stiRisk += 5
  }

  // Testing frequency
  if (data.regularTesting === "never" || data.regularTesting === "occasional") {
    stiRisk += 15
  }

  const overallRisk =
    Math.max(stiRisk, pregnancyRisk) > 50 ? "high" : Math.max(stiRisk, pregnancyRisk) > 25 ? "medium" : "low"

  return {
    overallRisk,
    stiRisk: Math.min(100, stiRisk),
    pregnancyRisk: Math.min(100, pregnancyRisk),
    explanation:
      "Risk assessment completed using clinical guidelines and evidence-based factors. This assessment considers protection methods, partner factors, symptoms, and timing to provide an estimated risk level.",
    recommendations: [
      "Consult with a healthcare provider for personalized advice",
      "Consider regular STI testing based on your activity level",
      "Use barrier protection consistently to reduce STI risk",
      "Monitor for any new or worsening symptoms",
      ...(stiRisk > 40 ? ["Schedule STI testing within 1-2 weeks"] : []),
      ...(pregnancyRisk > 40 ? ["Consider emergency contraception if within 72 hours"] : []),
    ],
    urgentActions: [
      ...(stiRisk > 70 ? ["Seek medical attention for STI testing and evaluation"] : []),
      ...(pregnancyRisk > 70 ? ["Consider emergency contraception immediately"] : []),
      ...(data.symptoms.some((s) => s.includes("pain") || s.includes("bleeding"))
        ? ["Consult healthcare provider about symptoms"]
        : []),
    ],
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
