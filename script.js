// -------------------- NAVIGATION --------------------

function goTo(page) {
    window.location.href = page;
}

// -------------------- CHATBOT LOGIC --------------------

const input = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".send-btn");
const chatBox = document.querySelector(".chat-box");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const message = input.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    setTimeout(() => {
        const reply = getBotReply(message);
        addMessage(reply, "bot");
    }, 500);
}

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message");
    msg.classList.add(sender); // user OR bot

    msg.innerText = text;

    document.getElementById("chatBox").appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}


// -------------------- SMART CHATBOT ENGINE --------------------

function getBotReply(message) {
    const msg = message.toLowerCase();

    // BUSINESS GROWTH
    if (msg.includes("increase sales") || msg.includes("grow business"))
        return "To grow your business, focus on strong branding, social media marketing, and attractive posters or videos.";

    if (msg.includes("profit"))
        return "Increase profit by reducing unnecessary expenses and improving marketing strategy.";

    if (msg.includes("loss"))
        return "Loss may happen due to low customer conversion. Let's analyze your expenses and revenue.";

    if (msg.includes("marketing"))
        return "Marketing works best with consistent posters, videos, and online presence.";

    if (msg.includes("customers"))
        return "You can attract more customers using discounts, offers, and short promotional videos.";

    // PHOTO MAKER
    if (msg.includes("poster") || msg.includes("photo"))
        return "Our AI Photo Maker can generate professional posters based on your theme and details.";

    if (msg.includes("design"))
        return "Choose a theme in Photo Maker and enter your business details for a stunning design.";

    // VIDEO MAKER
    if (msg.includes("video"))
        return "Video Maker can create promotional videos. Choose a style and enter your content.";

    if (msg.includes("reels") || msg.includes("short video"))
        return "Short promotional videos under 30 seconds work best for Instagram and YouTube.";

    // ANALYTICS
    if (msg.includes("analytics") || msg.includes("analysis"))
        return "Business Analytics helps you understand profit, sales growth, and performance visually.";

    if (msg.includes("chart") || msg.includes("graph"))
        return "Our analytics section generates pie charts and bar graphs for clear understanding.";

    // SHOPPING
    if (msg.includes("buy") || msg.includes("price"))
        return "Visit the Shop section to view pricing plans and premium features.";

    // OPERATIONS
    if (msg.includes("operation"))
        return "Operations section manages system tools and advanced controls.";

    // LOGIN
    if (msg.includes("login") || msg.includes("signup"))
        return "Please login or create an account to access full Busy AI features.";

    // GENERAL BUSINESS QUESTIONS
    if (msg.includes("small business"))
        return "Small businesses grow faster with digital marketing and local branding.";

    if (msg.includes("startup"))
        return "Startups should focus on solving a real problem and building strong online presence.";

    if (msg.includes("budget"))
        return "Tell me your budget range, and I can suggest a suitable strategy.";

    if (msg.includes("advertisement"))
        return "Advertisements work best when visuals are clear and message is short.";

    // DEFAULT
    return "Sorry, I can't understand. Please explain clearly so I can help you.";
}
