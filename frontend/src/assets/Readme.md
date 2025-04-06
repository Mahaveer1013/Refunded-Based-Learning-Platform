# EduCredit: A Reward-Driven Learning Platform

**EduCredit** is an innovative online learning platform that promotes accountability and ensures learner success by blending financial motivation, AI support, and blockchain transparency.

---

## 🚀 Key Features

### 🔐 Secure User Access
- User login and account management.
- Every new user starts with **100 free credits**.

### 📚 Learning Model
- Enroll in up to **5 courses** using your default credits.
- Complete modules to **earn credits back**.
- Additional credits can be **purchased** via secure payment gateways.

### 💸 Refund-Driven Motivation
- Challenge-based learning using paid credits.
- **Full or partial refunds** based on final test performance.
- **Deadline-based completion**: incomplete courses are closed; unused funds support financially struggling learners (with proper verification).

### 🧠 AI-Powered Learning Support
- **Sample tests** for self-evaluation.
- AI analyzes your test results to provide insights and improvement tips.
- Access to a **custom-trained AI engine** to fetch best-suited learning resources based on your needs.

### 🎓 Final Assessment & Refund Logic
- Take a **fully AI-proctored final test**:
  - `< 80%`: Refund scaled based on score.
  - `80–89%`: 10% fee for optional blockchain certification, else full refund.
  - `90%+`: Free blockchain-backed certificate and 100% refund.

### 🌐 Transparent Blockchain Integration
- Every course, refund, and certification transaction is **recorded permanently** on the blockchain.
- Blockchain operations handled via a **FastAPI server**, isolated and only accessible through a secure **Node.js server**, preventing injections and unauthorized access.

### 🧾 Verified Certifications
- Blockchain-based **credential verification system**.
- Recruiters can trigger a **temporary real-time skill test** to ensure the user's knowledge is current and valid.

### 💬 Community & Collaboration
- **Course reviews** from real learners.
- **Community chat** for discussions and peer interaction.
- **Group challenges** with no rankings (to promote honest collaboration over competition).

---

## 🛡️ Security Architecture

- All blockchain interactions are **isolated to a separate FastAPI microservice**.
- Communication is **strictly routed through the Node.js server**, mitigating direct exposure and ensuring secure validation.
- Prevents **code injection, replay attacks**, and **tampering**.

---

## 🔮 Roadmap

- Adaptive learning journeys.
- Resume builder with verified skills.
- Employer dashboard for screening verified learners.
- NFT-based certificate portfolios.

---

## 🤝 Contribute

Have ideas or want to contribute? Reach out, fork the repo, and let's build the future of learning together.

---

## 📬 License

MIT License - Free to use, improve, and distribute.

