from flask import Flask, request, jsonify, send_from_directory
import requests
import os
from dotenv import load_dotenv
from supabase import create_client
from flask_cors import CORS
import zipfile

load_dotenv()

app = Flask(__name__, static_folder=".")
CORS(app)  # ✅ Fix frontend connection

# ================== KEYS ==================
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

SUPABASE_URL = "https://abbcmzptqpvzuwmxybcs.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYmNtenB0cXB2enV3bXh5YmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMjg4OTcsImV4cCI6MjA5MDcwNDg5N30.8xXeKbBzEw4TT7WRREiI8XRlOtviIfPL3Tdr-R1QnQA"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ================== SERVE FRONTEND ==================
@app.route("/")
def serve_index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def serve_files(path):
    return send_from_directory(".", path)

# ================== SIGNUP ==================
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    # Check if user exists
    existing = supabase.table("users").select("*").eq("email", email).execute()

    if existing.data:
        return jsonify({"error": "Email already exists"}), 400

    # Insert user
    supabase.table("users").insert({
        "name": name,
        "email": email,
        "password": password
    }).execute()

    return jsonify({"message": "Signup successful"})

# ================== LOGIN ==================
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    result = supabase.table("users").select("*") \
        .eq("email", email) \
        .eq("password", password) \
        .execute()

    if result.data:
        return jsonify({
            "message": "Login successful",
            "user": result.data[0]
        })
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# ================== CHAT API ==================
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:8000",
                "X-Title": "Busy AI"
            },
            json={
                "model": "meta-llama/llama-3-8b-instruct",
                "messages": [
                    {"role": "system", "content": "You are Busy AI, a professional business assistant."},
                    {"role": "user", "content": user_message}
                ]
            }
        )

        data = response.json()

        if "error" in data:
            return jsonify({"reply": "❌ " + data["error"]["message"]})

        reply = data["choices"][0]["message"]["content"]

        return jsonify({"reply": reply})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"reply": "⚠️ Server error"})


def build_website_prompt(user_input, existing_code=None):
    return f"""
You are an expert frontend developer.

Create a modern, professional, attractive, colorful website.

STRICT RULES:
- Return ONLY code
- No explanations
- No markdown
- No ``` symbols
- Clean, production-ready code
- Fully responsive
- Use modern UI (glassmorphism, gradients, animations)

OUTPUT FORMAT EXACTLY:

---HTML---
<!DOCTYPE html>
<html>
<head>
    <title>Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- Content here -->

<script src="script.js"></script>
</body>
</html>

---CSS---
/* Clean modern styles */

---JS---
// JavaScript code


USER REQUEST:
{user_input}

EXISTING CODE (if updating):
{existing_code if existing_code else "None"}
"""

def split_website_code(ai_output):
    try:
        html = ai_output.split('---HTML---')[1].split('---CSS---')[0].strip()
        css = ai_output.split('---CSS---')[1].split('---JS---')[0].strip()
        js = ai_output.split('---JS---')[1].strip()

        return html, css, js

    except Exception as e:
        print("SPLIT ERROR:", e)
        return "", "", ""

@app.route("/generate-website", methods=["POST"])
def generate_website():
    data = request.json
    user_prompt = data.get("prompt")
    existing_code = data.get("existing_code", "")

    try:
        final_prompt = build_website_prompt(user_prompt, existing_code)

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:8000",
                "X-Title": "Busy AI Website Generator"
            },
            json={
                "model": "meta-llama/llama-3-8b-instruct",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a professional frontend developer. Only return structured code."
                    },
                    {
                        "role": "user",
                        "content": final_prompt
                    }
                ]
            }
        )

        result = response.json()

        if "error" in result:
            return jsonify({"error": result["error"]["message"]})

        ai_output = result["choices"][0]["message"]["content"]

        html, css, js = split_website_code(ai_output)

        return jsonify({
            "html": html,
            "css": css,
            "js": js
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": "Website generation failed"})

@app.route("/download-project", methods=["POST"])
def download_project():
    try:
        data = request.json

        html = data.get("html", "")
        css = data.get("css", "")
        js = data.get("js", "")

        # ✅ Ensure folder exists
        folder = "generated"
        os.makedirs(folder, exist_ok=True)

        html_path = os.path.join(folder, "index.html")
        css_path = os.path.join(folder, "style.css")
        js_path = os.path.join(folder, "script.js")

        # ✅ Write files safely
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html)

        with open(css_path, "w", encoding="utf-8") as f:
            f.write(css)

        with open(js_path, "w", encoding="utf-8") as f:
            f.write(js)

        # ✅ Create zip
        zip_path = os.path.join(folder, "project.zip")

        with zipfile.ZipFile(zip_path, 'w') as zipf:
            zipf.write(html_path, "index.html")
            zipf.write(css_path, "style.css")
            zipf.write(js_path, "script.js")

        return send_from_directory(folder, "project.zip", as_attachment=True)

    except Exception as e:
        print("DOWNLOAD ERROR:", e)  # 🔥 VERY IMPORTANT
        return jsonify({"error": str(e)}), 500
    
# ================== RUN ==================
if __name__ == "__main__":
    app.run(port=8000, debug=True)