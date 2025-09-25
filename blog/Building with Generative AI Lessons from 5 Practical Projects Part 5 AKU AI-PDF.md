---
title: Building with Generative AI Lessons from 5 Practical Projects Part 5 AKU AI-PDF
date created: Wednesday, September 24th 2025, 8:14:19 pm
date modified: Thursday, September 25th 2025, 11:00:16 am
tags:
  - gen_ai
---

# Building with Generative AI Lessons from 5 Practical Projects Part 5 AKU AI-PDF

## Problem

Many top AI services that work with PDFs require users to upload their documents and interact with the document's data
through a chat interface. I wanted a solution that allows users to chat with their PDFs while reading them, enabling
questions exclusively about the current page or chapter.

<!-- truncate -->

## My Solution

![Aku screenshot from Github](https://raw.githubusercontent.com/zekaryas1/aku-ai-pdf/main/screenshots/AKU-AI-PDF-2.jpg?token=GHSAT0AAAAAACWOAC4YRG3JP3O7DY3PZZR62GUGGOQ)

AKU is my solution to this problem. It combines two key features: an online PDF reader and an AI-powered sidebar.

- **Online PDF Reader**: AKU provides a simple yet efficient reading experience with outline navigation for easy access
  to chapters and sections.
- **AI Sidebar**: The integrated AI sidebar allows users to ask questions, perform classifications, and conduct further
  research. Users can ask questions specific to the current page or drag and drop a chapter, section, or the entire
  outline to send its content as context to the AI models.

## Additional Features

- **Offline and Local**: AKU does not require an internet connection to read PDFs; loading and opening PDFs is entirely
  local.
- **AI Integration**: To use the AI features, users must provide a Gemini model API key. The key can be stored
  temporarily until the page is refreshed or securely stored locally with password encryption for permanent use.

## Technical Details

- **Framework and UI**: The project is built using Next.js and Shadcn for the user interface.
- **PDF Reader**: The core PDF reader utilizes pdf.js via the react-pdf-reader library. To handle long lists of PDF
  pages efficiently, I implemented "react-virtuoso," which significantly improves load times and scroll behavior.
- **Context Handling**: When users drag and drop content from the outline sidebar, the app extracts text from the
  relevant pages using pdf.js interfaces.
- **AI Integration**: The AI functionality is powered by Vercel's AI SDK and Gemini models, chosen for their
  accessibility without payment restrictions in Ethiopia.
- **Markdown Rendering**: For rendering markdown, I use react-markdown with react-rehype for code block highlighting.
