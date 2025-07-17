---
title: Temp Overall Project
date created: Wednesday, May 28th 2025, 2:58:43 pm
date modified: Saturday, June 14th 2025, 1:05:52 pm
---

# Temp Overall Project

- Flows
	- Overall flow
		- User upload book
			- The whole book is vectorized and stored
		- User asks a question
			- The relevant segment or context is retrieved
				- Could be the whole book or a specific segment of the book
				- possible options:
					- current_page
					- all or book context
					- specific chapter
						- done so by dragging and dropping from bookmark tab
			- The right segment or context is passed to an LLM
			- Result is shown to the user
				- User might listen to the result
				- User might save the result to notes

----

1. Upload books
	1. System Saves the book to vector store
		1. Add meta data such as book_name, chunk pages
2. Ask AI
	1. given a user query, get right segment and provide to ai
		1. A user asks a query
			1. attaches the right context and files
		2. Query is analyzed and segment(context) is retrieved
			1. This can be a Tool (filter segments or retrieval segments tool)
		3. Segment is passed to AI
		4. Response is shown to user
3. Save to note
	1. method 1: A user clicks, save to note button
		1. response is saved to notes
4. Text to Speech
	1. method 1: A user clicks, text to speech button
		1. content is converted to speech and streamed to user

----

- Use case flows
	- a user opens a book
	- system check if the book has been open befored
		- has been opened before
			- no processing neded
		- had not been opened before
			- vectorization needed
	- ui loads the book
		- bookmarks with right configuration
			- drag and drop
			- bookmark items, including page index
		- pdf loads
			- minor controllers
				- navigation
				- zooming
				- search
		- ai bar loads
		- top: semantic search bok
		- bottom: chat box
			- can drag and drop bookmarks here

----

- Building tools
	- PDF renderer
		- [wojtekmaj/react-pdf: Display PDFs in your React app as easily as if they were images.](https://github.com/wojtekmaj/react-pdf?tab=MIT-1-ov-file)
	- Desktop app with python support:
		- [dieharders/example-tauri-v2-python-server-sidecar: An example desktop app built with Tauri version 2. Bundle a Next.js frontend with a Python api server.](https://github.com/dieharders/example-tauri-v2-python-server-sidecar)
	- Local embedded db
		- TurboSQL - has vector search
		- Milvus - has vector search with filter and text search…
	- Text to Voice
		- Kokoro onnx - light weight with streaming support
