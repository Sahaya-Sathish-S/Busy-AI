// ================== ELEMENTS ==================
const input = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".send-btn");
const chatBox = document.querySelector(".chat-box");

// ================== VOICE SYSTEM ==================
function speak(text) {
    try {
        const speech = new SpeechSynthesisUtterance();

        speech.text = text;
        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        speech.voice =
            voices.find(v => v.name.includes("Google")) ||
            voices.find(v => v.name.includes("Female")) ||
            voices[0];

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);

    } catch (err) {
        console.log("Voice error:", err);
    }
}

// 🔥 Fix for browser voice restriction
document.addEventListener("click", () => {
    window.speechSynthesis.resume();
});

// ================== MESSAGE UI ==================
function addMessage(text, type) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg", type);

    // Better formatting (line breaks support)
    msgDiv.innerHTML = text.replace(/\n/g, "<br>");

    chatBox.appendChild(msgDiv);

    // Smooth scroll
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth"
    });
}

// ================== LOADING MESSAGE ==================
function showTyping() {
    const typing = document.createElement("div");
    typing.classList.add("msg", "bot", "typing");
    typing.innerHTML = "⏳ Thinking...";
    typing.id = "typing";

    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

// ================== SEND MESSAGE ==================
async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    showTyping();

    try {
        const response = await fetch("https://busy-ai-5wtw.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        removeTyping();

        addMessage(data.reply, "bot");

        // 🔊 Speak AI response
        speak(data.reply);

    } catch (error) {
        removeTyping();
        addMessage("⚠️ Cannot connect to server", "bot");
        console.error(error);
    }
}

// ================== EVENTS ==================
sendBtn.onclick = sendMessage;

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// ================== NAVIGATION ==================
function goTo(page) {
    window.location.href = page;
}

// Sidebar buttons
document.querySelectorAll(".side-btn").forEach(btn => {
    btn.onclick = () => {
        const text = btn.innerText;

        if (text.includes("Photo")) goTo("photo-maker-info.html");
        else if (text.includes("Video")) goTo("video-maker-info.html");
        else if (text.includes("Business")) goTo("business-info.html");
        else if (text.includes("Shop")) goTo("shopping.html");
        else if (text.includes("Logo")) goTo("logo-creation.html");
        else if (text.includes("Web")) goTo("web_creation.html");
    };
});

// Header icons
document.querySelectorAll(".icons span").forEach(icon => {
    icon.onclick = () => {
        const iconText = icon.textContent.trim();

        if (iconText === "🖼️") goTo("gallery.html");
        else if (iconText === "⚙️") goTo("operation.html"); // fixed
        else if (iconText === "👤") goTo("login.html");
    };
});