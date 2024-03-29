# Notion-clone-with-AI

Welcome to the AI-Enhanced Notion Clone, an innovative project management and note-taking platform inspired by the functionality and flexibility of Notion. This clone brings together the best of modern web technologies, including NextJS 13, AI-powered features using OpenAI's GPT, beautiful UI with Shadcn and Tailwind CSS, and robust authentication and database solutions with Clerk and Firebase.

## Features

- NextJS 13 App Router: Leverages the latest in dynamic page routing for a seamless user experience.
- AI-Powered Content Generation: Uses OpenAI's GPT for intelligent content creation and management.
- Elegant UI: Combines Shadcn components with Tailwind CSS for a modern, responsive design.
- Secure Authentication: Implements Clerk for safe and user-friendly authentication processes.
- Efficient Data Management: Utilizes Firebase for real-time data storage and retrieval, enhanced with ORMs for structured database interactions.
- TypeScript Support: Ensures robust type-checking and developer-friendly code.

## Live Demo

[Live Demo Link](https://notion-clone-with-ai.vercel.app/)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or above recommended)
- An account and API keys for Firebase, OpenAI, and Clerk
  Installation
- Clone the Repository

Copy code

```sh
git clone https://github.com/AmjadShakhshir/Notion-clone-with-AI.git
cd Notion-clone-with-AI
```

Install Dependencies

```sh
npm install
```

Set Up Environment Variables
Rename .env.example to .env and update it with your Firebase, OpenAI, and Clerk credentials.

Launch the Application

```sh
npm run dev
```

Access the application through http://localhost:3000.

## API Reference

### Authentication

- Login && Signup
  Managed by Clerk.

#### Create Note

Endpoint: /api/createNoteBook
Method: POST
Body:

```json
{
  "name": "New Note"
}
```

Response: 201 Created, 400 Bad Request

#### Get All Notes

Endpoint: /api/notebook
Method: GET
Response: 200 OK

```json
[
  {
    "id": "1",
    "name": "Note Title",
    "content": "Note content",
    "imageUrl": "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1711709517~exp=1711713117~hmac=bfb791dc285c94392e06589e954a6dea5fcf762f7c2133d4d2d208f7dd53e6ab&w=826",
    "userId": 2,
    "editorState": "<h1>world</h1>",
    "created_at": "2024-03-29T12:00:00Z",
    "updated_at": "2024-03-29T12:00:00Z"
  }
]
```

#### AI Content Generation

Generate Content
Endpoint: /api/generate
Method: POST
Body:

```json
{
  "prompt": "Write a brief about AI in modern web apps."
}
```

Response: 200 OK

```json
{
  "content": "Generated content based on the prompt..."
}
```

#### AI completion

Endpoint: /api/completion
Method: POST

```json
{
  "prompt": "Write a brief about AI in modern web apps."
}
```

Response 200

```json
{
"content": "I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here:##${body}##"
}
```

## How to Use

This section should provide users with instructions on how to navigate and use the application, including creating and managing content, personalizing their workspace, and any other key features.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Please refer to the CONTRIBUTING.md for detailed instructions on how to propose changes or improvements.

## License

Distributed under the MIT License. See LICENSE for more information.

## Acknowledgments

- Next.js Team for the innovative App Router
- OpenAI for their unparalleled GPT API
- The creators behind Tailwind CSS and Shadcn for their design inspiration
- Firebase and Clerk for secure and scalable backend solutions
