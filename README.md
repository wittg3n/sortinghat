# 🎓 SortingHat Project – Smart University Application System

## 📌 Main Idea

SortingHat is an AI-powered platform that simplifies the university application process.
Users upload their academic information once, and the system predicts their chances of acceptance to different universities, providing a ranked list of optimal choices. Users can then proceed with applications automatically or semi-automatically.

---

## 🛠 Tech Stack

* **Front-end:** Next.js + Tailwind + ShadCN (UI/UX)
* **Back-end:** Express.js (Node.js) + MongoDB
* **Authentication:** Google OAuth
* **AI/Prediction:** ChatGPT API or custom ML model (for acceptance probability)
* **Automation Tools:**

  * **Puppeteer** (for login and auto-filling university forms)
  * **Browser Autofill API** (simpler method to auto-fill forms)
  * **Manual Guided Mode** (step-by-step guide if automation is not possible)
* **Email Integration:** Gmail API (sending emails using the logged-in email)

---

## 📂 System Workflow

### 1. Registration / Login

* Google OAuth login.
* User profile creation (name, email, field of study, language level, etc.).

### 2. Upload Documents

* CV, academic transcripts, language certificates.
* Stored in MongoDB + storage system.

### 3. University Selection

* Users select universities or desired programs.
* System contains a database of all universities (e.g., France/Europe).

### 4. AI Analysis

* AI model API processes the uploaded documents.
* Predicts acceptance probability for each university (e.g., Sorbonne → 14%).
* Provides a **top 15 suggested universities list**.

### 5. User Confirmation

* Users can confirm ✅, edit ✏️, or reject ❌ the suggested list.

### 6. Application Process

Three options for auto-filling and sending applications:

1. **Puppeteer Automation**

   * Bot logs into university site.
   * Fills out forms and uploads documents.

2. **Browser Autofill**

   * Browser auto-fills forms with saved user info.
   * User clicks Submit.

3. **Manual Guided Mode**

   * Opens application link.
   * Step-by-step guidance:
     "Step 1: Upload CV.
     Step 2: Select language certificate."

### 7. Final Confirmation

* System asks for final approval before sending applications.
* Official application emails sent using the logged-in Gmail.

---

## 📊 User Flow

1. Google login
2. Complete profile & upload documents
3. Select preferred universities
4. Receive AI-suggested list
5. Confirm or edit list
6. Start application (one of three modes)
7. Final approval + send emails/forms

---

## ⚠️ Challenges & Limitations

* **University Login:** Different universities have unique login systems (SSO, Captcha, etc.).
  → Puppeteer automation may be difficult/impossible on some sites.

* **Document Handling:** Must support multiple formats (PDF, JPG, DOCX).

* **AI Accuracy:** ML model accuracy depends on dataset quality; real acceptance data needed.

---

## 🚀 Development Phases

### Phase 1 – MVP

* Google login
* Document upload + MongoDB storage
* University selection
* Simple AI suggestions using ChatGPT API
* Manual guided application (no automation)

### Phase 2 – Automation

* Add Puppeteer for a few test universities
* Integrate Browser Autofill

### Phase 3 – Advanced AI

* Custom ML model for acceptance prediction
* Improve UX, add user dashboard

---

## 🎯 Final Output

Users have a platform to:

* Upload documents once.
* Receive AI-ranked university suggestions.
* Proceed with applications with minimal effort (automated or semi-automated).
