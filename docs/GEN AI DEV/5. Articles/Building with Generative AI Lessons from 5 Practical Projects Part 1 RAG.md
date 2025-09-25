---
title: "Building with Generative AI: Lessons from 5 Practical Projects Part 1: RAG"
date created: Friday, August 29th 2025, 12:57:10 pm
date modified: Friday, August 29th 2025, 12:57:30 pm
---

# Building with Generative AI: Lessons from 5 Practical Projects Part 1: RAG

## Link

- [Building with Generative AI: Lessons from 5 Projects Part 1: RAG - DEV Community](https://dev.to/index_of_zack/building-with-generative-ai-lessons-from-5-projects-part-1-rag-16gi)

## What to Expect

I understand people have different opinions about the current state of AI or AI in general. This article isn’t about hyping it up or fear-mongering. It's for developers who are interested in building exciting projects using **Generative AI tools**. I’ve spent the past few months exploring what we can build using these tools, diving into concepts like **RAG**, **embeddings**, and **agents**.

I’d like to share everything I learned while building 4 projects(**lessons, code, and links**) to hopefully give you a clearer roadmap and the resources you need to use these tools in your next project.

In the first project, we’ll look at the most common use case: **RAG**. We’ll use it to build a document search system, which will naturally lead us to embeddings, my favorite tool of all. Then we’ll move into agents, which help us build more specific and tailored solutions. Finally, I’ll share thoughts on moving to production: how to build **secure, real-world applications** and which **emerging tools** are worth watching.

## Project 1: Building Document Search with RAG

 ![Comparison of three types of search: keyword, inverted index and semantic search](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fb1e6fxg3rt6uwv9bl6qm.png)

This journey actually started when my previous company asked us to build a document search tool. The case was simple: we had many guests who wanted to search records across lots of archived documents, but the old search system wasn’t efficient.

Let’s step back and consider how we search. If we have a single document, we can just `Ctrl+F` and find keywords (searching for "dog" gets you dog, hotdog, cladogram, etc.). But what if you make a **spelling mistake**? Or what if you expect the system to return the **same results** for “pants” and “trousers”?

We can switch to tools like **ElasticSearch** which is based on [Inverted index](https://en.wikipedia.org/wiki/Inverted_index), which can handle typos, synonyms, and grammar issues. But usually, people don’t search using perfect terms, they search based on what they **remember**, or the **feeling** they had. For example, searching for `SQL backup` should ideally return results like `database dump file`, `database snapshot`, or `database backup`.

This is where **semantic search** comes in. It works by understanding the **meaning** of the search input rather than just matching words.

### What Is Semantic Search?

Semantic search is what we actually want. But how do we perform that on our documents?

That’s what **embedding models** (like transformer models) help with. They take a piece of text and convert it into an **array of values** (vectors) that capture its **semantic meaning**.

If we have two such vectors, we can compare them to see how closely they’re related. For example, comparing `dog` with `loyal animal` will result in a higher match score than comparing it with `fastest animal`.

Many vector search implementations use [a Library called FAISS from Meta ](https://github.com/facebookresearch/faiss), which uses algorithms like Cosine Similarity to determine how close two vectors are.

Let's write some simple code to get the semantically closest value for a given query. This is the list of libraries we require

- [LLM: A CLI utility and Python library for interacting with Large Language Models](https://llm.datasette.io/en/stable/index.html)
- [Simonw/llm-sentence-transformers: LLM plugin for embeddings using sentence-transformers](https://github.com/simonw/llm-sentence-transformers)
	- We'll use this to download the 22MB embedding model called `sentence transformers/all-MiniLM-L6-v2`. If you don't want to download, you can use hosted embedding models like those from Google or OpenAI.

```sh
pip install llm
llm install llm-sentence-transformers
```

```python
import llm

def cosine_similarity(vector1, vector2):
    """
    Calculate the cosine similarity between two vectors.
    """
    dot_product = sum(x * y for x, y in zip(vector1, vector2))
    magnitude1 = sum(x * x for x in vector1) ** 0.5
    magnitude2 = sum(y * y for y in vector2) ** 0.5

    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0  # Avoid division by zero

    return dot_product / (magnitude1 * magnitude2)


if __name__ == "__main__":
    # Load a sentence embedding model
    embedding_model = llm.get_embedding_model("sentence-transformers/all-MiniLM-L6-v2")

    # List of descriptive sentences to compare with the user's query
    descriptions = [
        "A loyal and social animal known for its strong bond with humans.",
        "A powerful and majestic animal often called the king of the jungle.",
        "A sharp-eyed species of prey that soars high and hunts with precision.",
        "The fastest land animal, built for explosive speed and agility.",
        "An aquatic creature that breathes through gills and thrives underwater.",
        "An intelligent, affectionate companion known for its protective nature."
    ]

    query = "dog"

    # Generate and store embeddings for all descriptions
    description_embeddings = {
        text: embedding_model.embed(text) for text in descriptions
    }

    query_embedding = embedding_model.embed(query)

    # Compute similarity scores between query and each description
    similarity_scores = []
    for description, embedding in description_embeddings.items():
        similarity = cosine_similarity(query_embedding, embedding)
        similarity_scores.append((description, similarity))

    # Sort results by similarity (highest first)
    similarity_scores.sort(key=lambda item: item[1], reverse=True)

    for description, score in similarity_scores:
        print(f"{score:.4f} - {description}")
```

You should expect output in the following order, from higher to lower match. As you can see, a description that is more similar to fish receives the lowest score.

```txt
0.4043 - A loyal and social animal known for its strong bond with humans.
0.3416 - An intelligent, affectionate companion known for its protective nature.
0.3389 - The fastest land animal, built for explosive speed and agility.
0.2795 - A sharp-eyed species of prey that soars high and hunts with precision.
0.2369 - A powerful and majestic animal often called the king of the jungle.
0.2254 - An aquatic creature that breathes through gills and thrives underwater.
```

### Building Our First Semantic Search System

Okay, I hope it's clear that we need two things by now:

1. The semantic values (embeddings) of our documents
2. The semantic value of the user’s question

When a user asks a question, we convert it into an embedding and compare it with all the stored document embeddings (which we might store in memory or a database).

### Chunking and Embedding

![RAG flow, including embedding, vector db and chunking](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwwva7w7hc3d72u1hm4lx.png)

You might think we can just embed an entire document, but that often gives broad or vague matches. What we want is **granular responses**: specific pages, paragraphs, or even sentences.

To do this, we **parse** the document and break it into smaller pieces or **chunks**. This is called **chunking**.

Then we pass each chunk through an embedding model, which gives us a vector. We store all these vectors somewhere for later use (e.g., a vector database).

Now, when we receive a user query, we convert that query into a vector and compare it with the stored vectors. This gives us a list of **related chunks** from various documents.

### Making the Response Coherent

At this point, we have related text snippets, but they’re **scattered**, possibly pulled from different documents. If we return them as-is, it might confuse the user because the response won’t appear coherent.

This is a perfect use case for **LLMs** (Large Language Models). They’re great at taking scattered data and generating **structured, coherent responses**.

For example, you might want the response in **simple English**, in a **professional tone**, or in a **well-structured format**.

In our second code example, we'll use a basic local model to style our responses before delivering them to the user.

- In addition to the [LLM: A CLI utility and Python library for interacting with Large Language Models](https://llm.datasette.io/en/stable/index.html) we will add another library [simonw/llm-gpt4all: Plugin for LLM adding support for the GPT4All collection of models](https://github.com/simonw/llm-gpt4all)which we will use to download a small local model called `orca-mini` with a size of roughly `1.8GB`.

```python
import llm

if __name__ == "__main__":
    # Load the local language model
    model = llm.get_model("orca-mini-3b-gguf2-q4_0")

    # Context sentences to be used for answering the question
    context_sentences = [
        "Dogs have an exceptional sense of smell, up to 100,000 times stronger than humans.", 
        "They are highly social animals and thrive in companionship with people or other dogs.",
        "Some breeds, like Border Collies, are considered among the most intelligent animals on Earth."
    ]

    user_question = "What are dogs?"

    combined_context = " ".join(context_sentences)

    system_prompt = (
        "You are an AI assistant that provides answers strictly based on the provided context and user query. "
        "Your responses should be clear, concise, and directly address the question using only relevant information."
    )

    user_prompt = (
        "Based on the following context, provide a concise and coherent answer to the user's question.\n\n"
        f"Context:\n{combined_context}\n\n"
        f"User Question:\n{user_question}"
    )

    response = model.prompt(
        prompt=user_prompt,
        system=system_prompt
    )

    print(response.text())
```

You should expect an output that looks something like this.

```
Dogs are domesticated mammals that have been trained to perform various tasks such as hunting, herding, assisting people with disabilities, and providing companionship. They come in a variety of breeds, each with their unique characteristics and abilities. Some common breeds include Border Collies, German Shepherds, Golden Retrievers, and Poodles. Dogs are known for their exceptional sense of smell, which is up to 100,000 times stronger than that of humans. They are social animals and thrive in companionship with people or other dogs.
```

> This is a fairly small model for demonstration; for better results, I suggest you consider using a larger or hosted LLM.

### The Formula

Our solution, like most Generative AI systems, can be expressed in a simplified formula.

```txt
Final Result = LLM + Prompt + Context
```

- **Prompt** tells the LLM what kind of response we want (tone, structure, etc.)
    - This part requires attention and skill, known as **prompt engineering**
	    - [Anthropic's Prompt engineering overview ](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview), you can also OpenAI and Googles's Prompt engineering best practices.
- **Context** is the set of related document chunks retrieved using the user’s question
    - This can be further optimized using techniques like **context engineering**
	    - [The New Skill in AI, It's Context Engineering](https://www.philschmid.de/context-engineering)
- Now that we have a final, coherent response shaped by the LLM, we return it to the user.

## Going Beyond

What we’ve built here is a **RAG system** (Retrieval-Augmented Generation). It’s a method for adding **external knowledge** or context to LLMs.

- You might ask: _Why not just ask the LLM directly?_
	- You can, but if you’re working with **company specific data** or private documents, the LLM won’t have access to that by default. That’s where RAG shines.
- The full python code on how to perform a RAG on a document can be found [Simple RAG via Zekaryas Tadele](https://github.com/zekaryas1/gen-ai/tree/main/simple_rag)
	- [There is also another repo that showcases various advanced techniques for Retrieval-Augmented Generation (RAG) systems.](https://github.com/NirDiamant/RAG_Techniques)

### Recap

- We used:
	- **Document parsing + chunking + embedding**
	- **User question + embedding + semantic search**
	- **Prompt + LLM + context → final answer**
- Each of these steps can be optimized further:
	- A user question can be improved by fixing spelling or grammar mistakes before generating embeddings
	- Sometimes it might yield a better result when we combine inverted index search with vector search which is called `Hybrid search`.
	- Our document parsing strategy can be improved, for example extracting images and tables separately in addition to text.
	- There are many embedding and LLM models that might have better performance for a different use case.
	- These are many RAG optimizations that may seem intimidating at first, but are worth looking into; as our system grows, even the smallest efficiency increase may have a noticeable impact:
		- [How to Enhance the Performance of Your RAG Pipeline | Milvus Documentation](https://milvus.io/docs/how_to_enhance_your_rag.md)
		- [Advanced RAG Techniques From Weaviate](https://weaviate.io/ebooks/advanced-rag-techniques)

### What's Next: Embeddings

Embeddings are the **core** of what makes this system work. They're fascinating on their own and worth diving deeper into, which I’ll cover in the next part of this article.
