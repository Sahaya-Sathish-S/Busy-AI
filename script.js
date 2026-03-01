// ================== SELECT ELEMENTS ==================
const input = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".send-btn");
const chatBox = document.querySelector(".chat-box");

// ================== MEMORY SYSTEM ==================
let conversationMemory = {
    lastTopic: null,
    userBusinessType: null
};

// ================== KNOWLEDGE BASE ==================
const knowledgeBase = {

    greeting: [
        "Welcome to Strategic Business Intelligence. Let’s build scalable growth and sustainable profitability.",
        "Hello. I help businesses increase revenue, optimize operations, and dominate their market.",
        "Greetings. Let’s transform your vision into measurable financial success.",
        "Ready to scale? Tell me your business goal and I’ll provide a growth-focused strategy.",
        "Success requires strategy. What area of your business should we optimize today?"
    ],

    // =========================
    // SOCIAL MEDIA MARKETING
    // =========================

    social_media_marketing: [
        "Focus on platform-specific content strategy for higher engagement.",
        "Short-form video content drives the highest organic reach currently.",
        "Use analytics weekly to refine targeting and creative performance."
    ],

    instagram_marketing: [
        "Reels increase discoverability more than static posts.",
        "Use storytelling captions to improve retention.",
        "Post consistently at peak audience activity hours."
    ],

    facebook_ads: [
        "Split-test creatives before scaling budget.",
        "Use retargeting campaigns for higher conversion rates.",
        "Optimize for conversions, not just clicks."
    ],

    linkedin_marketing: [
        "Thought-leadership posts build authority in B2B.",
        "Use value-driven content rather than promotional messaging.",
        "Engage in comments to expand reach organically."
    ],

    youtube_marketing: [
        "Educational long-form videos build trust.",
        "Strong thumbnails increase CTR significantly.",
        "Consistency is key for algorithm growth."
    ],

    content_marketing: [
        "Create problem-solving content for your niche.",
        "SEO-optimized blogs generate long-term traffic.",
        "Repurpose content across multiple platforms."
    ],

    email_marketing: [
        "Email automation increases customer lifetime value.",
        "Segment your list for better personalization.",
        "Subject lines determine open rate success."
    ],

    influencer_marketing: [
        "Micro-influencers often provide better ROI.",
        "Track conversions using affiliate links.",
        "Align influencer audience with target market."
    ],

    // =========================
    // SALES & PRODUCT SELLING
    // =========================

    product_selling: [
        "Highlight benefits, not just features.",
        "Create urgency using limited-time offers.",
        "Use testimonials to increase trust."
    ],

    ecommerce: [
        "Optimize product pages for conversions.",
        "Reduce checkout friction.",
        "Use abandoned cart recovery emails."
    ],

    pricing_strategy: [
        "Value-based pricing increases perceived worth.",
        "Test price elasticity before finalizing.",
        "Bundle products to increase AOV."
    ],

    upselling: [
        "Offer premium versions at checkout.",
        "Use comparison charts to show value.",
        "Train team on consultative selling."
    ],

    negotiation: [
        "Focus on mutual value creation.",
        "Prepare data before negotiations.",
        "Never negotiate without clear margins."
    ],

    // =========================
    // STARTUP & BUSINESS GROWTH
    // =========================

    startup: [
        "Validate demand before scaling.",
        "Focus on MVP before full development.",
        "Manage runway carefully."
    ],

    product_market_fit: [
        "Listen to customer feedback early.",
        "Iterate quickly based on user behavior.",
        "Retention metrics indicate real demand."
    ],

    funding: [
        "Angel investors focus on vision and traction.",
        "VC funding requires scalable models.",
        "Prepare financial projections clearly."
    ],

    scaling: [
        "Automate repetitive processes.",
        "Build strong middle management.",
        "Invest in systems before expansion."
    ],

    business_model: [
        "Subscription models increase recurring revenue.",
        "Freemium attracts early users.",
        "Diversify revenue streams."
    ],

    competitive_analysis: [
        "Study competitor pricing models.",
        "Analyze their marketing channels.",
        "Identify gaps in their customer service."
    ],

    // =========================
    // EDUCATION BUSINESS
    // =========================

    education_business: [
        "Online courses scale faster than offline models.",
        "Certification increases perceived value.",
        "Community building improves retention."
    ],

    edtech: [
        "Gamification improves student engagement.",
        "AI-powered personalization boosts outcomes.",
        "Mobile-first learning increases reach."
    ],

    coaching: [
        "Position yourself as authority.",
        "Offer structured transformation roadmap.",
        "Use testimonials to increase enrollments."
    ],

    // =========================
    // BRANDING & POSITIONING
    // =========================

    branding: [
        "Strong positioning reduces competition.",
        "Consistent identity builds trust.",
        "Emotional branding increases loyalty."
    ],

    brand_storytelling: [
        "Stories create emotional connection.",
        "Show transformation, not just services.",
        "Highlight customer success journeys."
    ],

    personal_branding: [
        "Authority content builds trust.",
        "Consistency increases recognition.",
        "Share expertise generously."
    ],

    // =========================
    // FINANCE & PROFIT
    // =========================

    profit_optimization: [
        "Reduce operational waste.",
        "Increase customer lifetime value.",
        "Improve gross margins strategically."
    ],

    cash_flow: [
        "Positive cash flow sustains business.",
        "Track receivables regularly.",
        "Negotiate supplier terms."
    ],

    cost_reduction: [
        "Outsource non-core activities.",
        "Automate repetitive processes.",
        "Renegotiate vendor contracts."
    ],

    investment: [
        "Diversify risk across assets.",
        "Reinvest profits wisely.",
        "Maintain emergency reserves."
    ],

    // =========================
    // OPERATIONS & MANAGEMENT
    // =========================

    leadership: [
        "Strong leaders create accountability.",
        "Vision alignment improves performance.",
        "Delegate effectively."
    ],

    team_building: [
        "Hire for attitude and skill.",
        "Set clear KPIs.",
        "Reward performance consistently."
    ],

    productivity: [
        "Use time-blocking techniques.",
        "Automate routine tasks.",
        "Eliminate low-value meetings."
    ],

    automation: [
        "CRM systems improve sales tracking.",
        "Use chatbots for 24/7 support.",
        "Integrate tools for efficiency."
    ],

    ai_in_business: [
        "AI improves data-driven decisions.",
        "Predictive analytics enhances forecasting.",
        "Automation reduces human error."
    ],

    // =========================
    // DIGITAL & TECH GROWTH
    // =========================

    website_optimization: [
        "Improve page load speed.",
        "Clear CTA increases conversions.",
        "Mobile responsiveness is critical."
    ],

    seo: [
        "Target long-tail keywords.",
        "Build high-quality backlinks.",
        "Optimize on-page structure."
    ],

    analytics: [
        "Track key performance metrics.",
        "Measure ROI by channel.",
        "Make decisions based on data."
    ],

    // =========================
    // CUSTOMER STRATEGY
    // =========================

    customer_retention: [
        "Loyal customers increase profitability.",
        "Offer loyalty programs.",
        "Provide excellent support."
    ],

    customer_experience: [
        "Fast response time increases trust.",
        "Personalization improves satisfaction.",
        "Simplify user journey."
    ],

    market_research: [
        "Survey customers regularly.",
        "Analyze buying behavior.",
        "Track industry trends."
    ],

    // =========================
    // EXPANSION & STRATEGY
    // =========================

    global_expansion: [
        "Study local regulations.",
        "Adapt marketing culturally.",
        "Build local partnerships."
    ],

    partnerships: [
        "Strategic alliances increase reach.",
        "Choose complementary partners.",
        "Define revenue-sharing clearly."
    ],

    diversification: [
        "Reduce dependency on one product.",
        "Explore adjacent markets.",
        "Test before full investment."
    ],

    crisis_management: [
        "Act quickly and transparently.",
        "Communicate clearly with stakeholders.",
        "Maintain financial buffer."
    ],

    fallback: [
        "Please clarify your business objective so I can provide strategic advice.",
        "I specialize in marketing, sales, profit optimization, branding, startups, education, and digital growth.",
        "Specify whether your focus is growth, revenue, scaling, or operational efficiency."
    ],

    // ================= GROWTH & MARKETING =================

growth_hacking: [
    "Focus on rapid experimentation across marketing channels.",
    "Use viral loops to accelerate organic growth.",
    "Optimize onboarding to reduce drop-off rate.",
    "Track activation metrics closely."
],

performance_marketing: [
    "Run data-driven paid campaigns.",
    "Continuously A/B test creatives and audiences.",
    "Scale only profitable ad sets.",
    "Measure ROAS instead of just impressions."
],

affiliate_marketing: [
    "Partner with niche influencers for better ROI.",
    "Provide commission incentives for performance.",
    "Track conversions with unique affiliate links.",
    "Build long-term affiliate relationships."
],

conversion_rate_optimization: [
    "Improve landing page clarity and CTA.",
    "Reduce form fields to minimize friction.",
    "Use social proof to increase trust.",
    "Test headlines regularly."
],

// ================= FINANCE & STRATEGY =================

financial_planning: [
    "Set quarterly revenue targets.",
    "Plan expenses based on projected growth.",
    "Maintain emergency reserves.",
    "Align financial goals with business strategy."
],

unit_economics: [
    "Calculate Customer Acquisition Cost accurately.",
    "Measure Lifetime Value regularly.",
    "Ensure LTV is at least 3x CAC.",
    "Monitor contribution margins."
],

valuation: [
    "Revenue growth impacts valuation significantly.",
    "Strong recurring revenue increases company value.",
    "Market size influences investor interest.",
    "Profitability improves negotiation power."
],

break_even_analysis: [
    "Calculate fixed and variable costs.",
    "Determine minimum sales required to cover expenses.",
    "Improve margin to reach break-even faster.",
    "Track monthly financial performance."
],

// ================= SALES =================

b2b_sales: [
    "Focus on long-term relationship building.",
    "Understand client pain points deeply.",
    "Provide customized solutions.",
    "Follow structured sales pipeline."
],

closing_techniques: [
    "Create urgency without pressure.",
    "Handle objections confidently.",
    "Highlight ROI clearly.",
    "Ask directly for the decision."
],

sales_psychology: [
    "Use scarcity to increase action.",
    "Leverage authority positioning.",
    "Build emotional trust first.",
    "Reduce risk perception."
],

// ================= STARTUP =================

mvp_development: [
    "Launch minimum viable product quickly.",
    "Validate real customer demand.",
    "Collect feedback before scaling.",
    "Avoid overbuilding features."
],

funding_strategy: [
    "Bootstrap in early stages if possible.",
    "Prepare strong pitch deck.",
    "Show traction before approaching investors.",
    "Maintain clean financial records."
],

product_market_fit: [
    "Measure customer retention rate.",
    "Listen to user feedback actively.",
    "Iterate based on real usage data.",
    "Track repeat usage metrics."
],

// ================= E-COMMERCE =================

inventory_management: [
    "Avoid overstocking slow-moving items.",
    "Forecast demand using past sales data.",
    "Automate stock alerts.",
    "Negotiate bulk discounts."
],

product_launch: [
    "Build anticipation before launch.",
    "Use email list for early access.",
    "Offer limited-time discounts.",
    "Collect testimonials quickly."
],

subscription_model: [
    "Ensure recurring value delivery.",
    "Reduce churn with loyalty benefits.",
    "Offer tier-based pricing.",
    "Track monthly recurring revenue."
],

// ================= EDUCATION BUSINESS =================

online_course_creation: [
    "Solve a specific problem clearly.",
    "Structure content step-by-step.",
    "Include assignments and practice.",
    "Offer certification for credibility."
],

student_retention: [
    "Provide interactive sessions.",
    "Offer community support.",
    "Track student progress.",
    "Reward course completion."
],

// ================= LEADERSHIP =================

corporate_strategy: [
    "Define long-term competitive advantage.",
    "Align all departments with vision.",
    "Monitor industry shifts regularly.",
    "Invest in innovation."
],

decision_making: [
    "Use data-backed insights.",
    "Evaluate risks before action.",
    "Consider long-term impact.",
    "Avoid emotional bias."
],

// ================= AI & TECH =================

saas_business: [
    "Focus on recurring revenue model.",
    "Reduce churn rate aggressively.",
    "Optimize onboarding experience.",
    "Invest in customer success."
],

digital_transformation: [
    "Automate manual processes.",
    "Adopt cloud-based systems.",
    "Train employees in new tools.",
    "Improve operational efficiency."
],

// ================= CUSTOMER =================

customer_retention: [
    "Provide exceptional support.",
    "Create loyalty programs.",
    "Personalize communication.",
    "Reward repeat purchases."
],

customer_journey_mapping: [
    "Identify touchpoints clearly.",
    "Reduce friction in buying process.",
    "Enhance post-purchase experience.",
    "Monitor satisfaction levels."
],

// ================= GLOBAL & EXPANSION =================

market_entry_strategy: [
    "Research local competition.",
    "Adapt pricing to region.",
    "Understand regulations.",
    "Build local partnerships."
],

franchise_model: [
    "Standardize operations.",
    "Provide brand guidelines.",
    "Train franchise partners.",
    "Maintain quality control."
],
good_evening: [
    "Good evening. Can you tell me how can I help you?"
],
good_morning: [
    "Good morning. Can you tell me how can I help you?"
],
good_night: [
    "Good night. See you tomorrow"
]
};

// ================== INTENT DETECTION ==================
function detectIntent(message) {
    message = message.toLowerCase();

    // ================= GREETING =================
    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey") ||
        message.includes("good morning") ||
        message.includes("good evening") ||
        message.includes("greetings")
    ) return "greeting";
    if (
        message.includes("good morning")
    ) return "good_morning";
    if (
        message.includes("good night")
    ) return "good_night";
    // ================= SOCIAL MEDIA MARKETING =================
    if (
        message.includes("social media") ||
        message.includes("instagram") ||
        message.includes("facebook") ||
        message.includes("youtube") ||
        message.includes("linkedin") ||
        message.includes("ads") ||
        message.includes("advertising") ||
        message.includes("campaign") ||
        message.includes("promotion") ||
        message.includes("content marketing") ||
        message.includes("digital marketing") ||
        message.includes("influencer")
    ) return "social_media_marketing";


    // ================= MARKETING GENERAL =================
    if (
        message.includes("marketing") ||
        message.includes("lead generation") ||
        message.includes("traffic") ||
        message.includes("branding strategy") ||
        message.includes("reach") ||
        message.includes("engagement")
    ) return "marketing";


    // ================= SALES =================
    if (
        message.includes("sales") ||
        message.includes("sell") ||
        message.includes("conversion") ||
        message.includes("closing") ||
        message.includes("upsell") ||
        message.includes("cross sell") ||
        message.includes("negotiation") ||
        message.includes("customers buying")
    ) return "sales";


    // ================= PRODUCT SELLING / ECOMMERCE =================
    if (
        message.includes("product") ||
        message.includes("ecommerce") ||
        message.includes("online store") ||
        message.includes("shopify") ||
        message.includes("amazon") ||
        message.includes("pricing") ||
        message.includes("checkout") ||
        message.includes("cart")
    ) return "product_selling";


    // ================= PROFIT / FINANCE =================
    if (
        message.includes("profit") ||
        message.includes("revenue") ||
        message.includes("margin") ||
        message.includes("income") ||
        message.includes("cash flow") ||
        message.includes("expenses") ||
        message.includes("cost reduction") ||
        message.includes("roi") ||
        message.includes("investment")
    ) return "profit_optimization";


    // ================= STARTUP =================
    if (
        message.includes("startup") ||
        message.includes("new business") ||
        message.includes("mvp") ||
        message.includes("product market fit") ||
        message.includes("funding") ||
        message.includes("angel investor") ||
        message.includes("venture capital") ||
        message.includes("bootstrapping")
    ) return "startup";


    // ================= BUSINESS STRATEGY =================
    if (
        message.includes("business model") ||
        message.includes("strategy") ||
        message.includes("scaling") ||
        message.includes("expansion") ||
        message.includes("growth plan") ||
        message.includes("competitive analysis")
    ) return "business_model";


    // ================= BRANDING =================
    if (
        message.includes("brand") ||
        message.includes("branding") ||
        message.includes("positioning") ||
        message.includes("brand identity") ||
        message.includes("logo") ||
        message.includes("brand awareness")
    ) return "branding";


    // ================= EDUCATION BUSINESS =================
    if (
        message.includes("education") ||
        message.includes("course") ||
        message.includes("online class") ||
        message.includes("coaching") ||
        message.includes("training") ||
        message.includes("edtech") ||
        message.includes("students")
    ) return "education_business";


    // ================= AI / AUTOMATION =================
    if (
        message.includes("ai") ||
        message.includes("automation") ||
        message.includes("chatbot") ||
        message.includes("crm") ||
        message.includes("software") ||
        message.includes("technology")
    ) return "ai_in_business";


    // ================= CUSTOMER =================
    if (
        message.includes("customer") ||
        message.includes("retention") ||
        message.includes("loyalty") ||
        message.includes("experience") ||
        message.includes("feedback")
    ) return "customer_retention";

    function detectIntent(message) {
    message = message.toLowerCase();

    // ================= GREETING =================
    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey") ||
        message.includes("good morning") ||
        message.includes("good evening") ||
        message.includes("greetings")
    ) return "greeting";


    // ================= GROWTH & MARKETING =================
    if (
        message.includes("growth hacking") ||
        message.includes("viral loop") ||
        message.includes("activation") ||
        message.includes("performance marketing") ||
        message.includes("paid ads") ||
        message.includes("affiliate marketing") ||
        message.includes("referral") ||
        message.includes("conversion optimization") ||
        message.includes("landing page") ||
        message.includes("cta")
    ) return "growth_hacking";

    if (
        message.includes("performance marketing") ||
        message.includes("ads campaign") ||
        message.includes("paid media") ||
        message.includes("roas") ||
        message.includes("ab test") ||
        message.includes("scale ad") 
    ) return "performance_marketing";

    if (
        message.includes("affiliate") ||
        message.includes("partner") ||
        message.includes("commission") ||
        message.includes("influencer") ||
        message.includes("referral program")
    ) return "affiliate_marketing";

    if (
        message.includes("conversion") ||
        message.includes("landing page") ||
        message.includes("optimize") ||
        message.includes("cta") ||
        message.includes("form") ||
        message.includes("social proof")
    ) return "conversion_rate_optimization";


    // ================= FINANCE & STRATEGY =================
    if (
        message.includes("financial planning") ||
        message.includes("budget") ||
        message.includes("forecast") ||
        message.includes("cash flow") ||
        message.includes("expenses") 
    ) return "financial_planning";

    if (
        message.includes("unit economics") ||
        message.includes("cac") ||
        message.includes("ltv") ||
        message.includes("contribution margin") 
    ) return "unit_economics";

    if (
        message.includes("valuation") ||
        message.includes("company value") ||
        message.includes("investor") ||
        message.includes("market size") 
    ) return "valuation";

    if (
        message.includes("break-even") ||
        message.includes("costs") ||
        message.includes("margin") ||
        message.includes("sales required") 
    ) return "break_even_analysis";


    // ================= SALES =================
    if (
        message.includes("b2b sales") ||
        message.includes("client") ||
        message.includes("relationship") ||
        message.includes("pipeline") 
    ) return "b2b_sales";

    if (
        message.includes("closing") ||
        message.includes("closing techniques") ||
        message.includes("handle objections") ||
        message.includes("ask for decision") 
    ) return "closing_techniques";

    if (
        message.includes("sales psychology") ||
        message.includes("scarcity") ||
        message.includes("authority") ||
        message.includes("trust") 
    ) return "sales_psychology";


    // ================= STARTUP =================
    if (
        message.includes("mvp") ||
        message.includes("mvp development") ||
        message.includes("prototype") ||
        message.includes("validate demand") 
    ) return "mvp_development";

    if (
        message.includes("funding") ||
        message.includes("funding strategy") ||
        message.includes("bootstrap") ||
        message.includes("investor pitch") 
    ) return "funding_strategy";

    if (
        message.includes("product market fit") ||
        message.includes("p m f") ||
        message.includes("customer retention") ||
        message.includes("iterate product") 
    ) return "product_market_fit";


    // ================= E-COMMERCE =================
    if (
        message.includes("inventory") ||
        message.includes("stock") ||
        message.includes("automation") ||
        message.includes("forecast") 
    ) return "inventory_management";

    if (
        message.includes("product launch") ||
        message.includes("launch") ||
        message.includes("email list") ||
        message.includes("limited discount") 
    ) return "product_launch";

    if (
        message.includes("subscription") ||
        message.includes("recurring revenue") ||
        message.includes("tier pricing") ||
        message.includes("churn") 
    ) return "subscription_model";


    // ================= EDUCATION BUSINESS =================
    if (
        message.includes("online course") ||
        message.includes("course creation") ||
        message.includes("training") ||
        message.includes("coaching") 
    ) return "online_course_creation";

    if (
        message.includes("student retention") ||
        message.includes("progress tracking") ||
        message.includes("community") ||
        message.includes("reward") 
    ) return "student_retention";

    if (
        message.include("good evening")
    ) return "good_evening";

    // ================= LEADERSHIP =================
    if (
        message.includes("corporate strategy") ||
        message.includes("vision") ||
        message.includes("long-term advantage") ||
        message.includes("department alignment") 
    ) return "corporate_strategy";

    if (
        message.includes("decision making") ||
        message.includes("data backed") ||
        message.includes("evaluate risk") ||
        message.includes("long term impact") 
    ) return "decision_making";


    // ================= AI & TECH =================
    if (
        message.includes("saas") ||
        message.includes("saas business") ||
        message.includes("recurring revenue") ||
        message.includes("onboarding") 
    ) return "saas_business";

    if (
        message.includes("digital transformation") ||
        message.includes("automation") ||
        message.includes("cloud") ||
        message.includes("tools") 
    ) return "digital_transformation";


    // ================= CUSTOMER =================
    if (
        message.includes("customer retention") ||
        message.includes("loyalty") ||
        message.includes("personalize") ||
        message.includes("repeat purchase") 
    ) return "customer_retention";

    if (
        message.includes("customer journey") ||
        message.includes("touchpoints") ||
        message.includes("friction") ||
        message.includes("experience") 
    ) return "customer_journey_mapping";


    // ================= GLOBAL & EXPANSION =================
    if (
        message.includes("market entry") ||
        message.includes("local competition") ||
        message.includes("pricing region") ||
        message.includes("partnership") 
    ) return "market_entry_strategy";

    if (
        message.includes("franchise") ||
        message.includes("standardize operations") ||
        message.includes("brand guidelines") ||
        message.includes("train partners") 
    ) return "franchise_model";

}
    // ================= FALLBACK =================
    return "fallback";
}

// ================== RESPONSE GENERATOR ==================
function generateResponse(intent) {
    const responses = knowledgeBase[intent];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

// ================== ADD MESSAGE ==================
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ================== SEND MESSAGE ==================
function sendMessage() {
    const message = input.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    const intent = detectIntent(message);
    conversationMemory.lastTopic = intent;

    const reply = generateResponse(intent);

    setTimeout(() => {
        addMessage(reply, "bot");
    }, 500);
}

// ================== EVENT LISTENERS ==================
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});
// script.js

// Function to navigate to a page
function goTo(url) {
    window.location.href = url;
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Sidebar buttons
    const sideButtons = document.querySelectorAll(".side-btn");
    
    sideButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const page = btn.textContent.trim();
            // Map button names to pages
            const pages = {
                "📸 Photo Maker": "photo-maker-info.html",
                "🎥 Video Maker": "video-maker-info.html",
                "📊 Business": "business-info.html",
                "🛒 Shop": "shopping.html"
            };
            if (pages[page]) goTo(pages[page]);
        });
    });

    // Header icons
    const icons = document.querySelectorAll(".icons span");
    icons.forEach(icon => {
        icon.addEventListener("click", () => {
            const iconMap = {
                "🖼️": "gallery.html",
                "⚙️": "operations.html",
                "👤": "login.html"
            };
            const iconText = icon.textContent.trim();
            if (iconMap[iconText]) goTo(iconMap[iconText]);
        });
    });

    // Chat input
    const input = document.querySelector(".chat-input input");
    const sendBtn = document.querySelector(".send-btn");
    const chatBox = document.getElementById("chatBox");

    // Send button click
    sendBtn.addEventListener("click", () => {
        sendMessage();
    });

    // Press Enter to send
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        const userMsg = document.createElement("div");
        userMsg.classList.add("message", "user");
        userMsg.textContent = message;
        chatBox.appendChild(userMsg);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        input.value = "";

        // Simulate bot reply
        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.classList.add("message", "bot");
            botMsg.textContent = "🤖 This is a placeholder response for: " + message;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
    }
});