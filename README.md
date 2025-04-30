# CareerGenie - AI-Powered HR Assistant for Microsoft Teams  

🚀 **CareerGenie** is a custom AI-powered chatbot built for Microsoft Teams that assists Human Resources teams in writing job posts and finding the best candidates using **Azure OpenAI** and **Azure AI Search**.  


![image](https://github.com/user-attachments/assets/fbf229c4-c43b-4e24-a13f-4c51bfdae5e8)


## Features  

✨ **AI-Powered Job Post Assistance**  
- Generate tailored job descriptions using natural language prompts.  
- Suggest required skills and qualifications for roles.  

🔍 **Smart Candidate Search**  
- **Retrieval-Augmented Generation (RAG)** for searching resumes stored in **Azure AI Search**.  
- Vector embeddings for semantic search (powered by `text-embedding-ada-002`).  
- Filter candidates by skills, experience, languages, and more.  

💡 **Powered by AI Features**  
- **Feedback Loop** – Rate responses (👍/👎) to improve AI accuracy.  
- **Citations** – View referenced resumes with Adaptive Cards.  
- **AI-Generated Label** – Transparency in AI responses.  
- **Sensitivity Label** – Marks confidential HR data.

# Architectural Diagram

![diagram-export-4-30-2025-1_30_49-PM](https://github.com/user-attachments/assets/b95b8d0f-680f-4812-b1cc-6a667c5fb4ad)


## Tech Stack  

- **Backend:** Teams AI Library (TypeScript)  
- **AI Models:** Azure OpenAI (`gpt-4`, `text-embedding-ada-002`)  
- **Data Storage:** Azure AI Search (vector search)  
- **UI:** Adaptive Cards for rich interactions  

## Setup  

### Prerequisites  
- Azure subscription  
- [Azure OpenAI Service](https://portal.azure.com) (with `gpt-4` deployment)  
- [Azure AI Search](https://portal.azure.com) (for resume indexing)  
- Node.js v18+  

### Installation  
1. Clone the repo:  
   ```bash  
   git clone https://github.com/my-repo/CareerGenie.git  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Configure `.env.local.user`:  
   ```env  
   AZURE_OPENAI_KEY="your-azure-openai-key"  
   AZURE_OPENAI_ENDPOINT="your-azure-openai-endpoint"  
   AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4"  
   AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME="text-embedding-ada-002"  
   AZURE_SEARCH_KEY="your-ai-search-key"  
   AZURE_SEARCH_ENDPOINT="your-ai-search-endpoint"  
   INDEX_NAME="resumes"  
   ```  

### Run Locally  
- Debug in Teams:  
  - Press `F5` in VS Code (using Teams Toolkit).  
  - Select **Debug in Teams (Edge/Chrome)**.  

## Usage  
1. **Write Job Posts**:  
   - *"Help me draft a job post for a Senior Developer with Python experience."*  
2. **Find Candidates**:  
   - *"Find candidates with 5+ years of .NET experience who speak Spanish."*  
3. **Review Citations**:  
   - Click citation numbers to view full resume excerpts.  


## Screenshots  
![CareerGenie in Teams](https://example.com/careergenie-demo.gif)  
*Chatting with CareerGenie to find candidates.*  

## Contributing  
PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).  

## License  
MIT  

---  
💬 **Get Started**: Deploy your own HR assistant today! Follow the [full lab guide](https://learn.microsoft.com).  

#PoweredByAI #AzureOpenAI #MicrosoftTeams #HRTech
