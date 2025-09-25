---
title: "Building with Generative AI: Lessons from 5 Practical Projects Part 2: Embedding"
date created: Friday, August 29th 2025, 12:58:21 pm
date modified: Friday, August 29th 2025, 1:05:54 pm
tags:
  - gen_ai
---

# Building with Generative AI: Lessons from 5 Practical Projects Part 2: Embedding

## Link

- [Building with Generative AI: Lessons from 5 Projects Part 2: Embedding - DEV Community](https://dev.to/index_of_zack/building-with-generative-ai-lessons-from-5-projects-part-2-embedding-4bjj)

## What to Expect

In the last part of this series (_optional but worth reading_), we explored basic RAG and noticed how embeddings play a
key role.

In this article, I’ll introduce what embeddings are and what kinds of solutions can be built using them.

Specifically, we’ll look at how embeddings can power podcast segment search, recommendations, image search, and
classification systems.

<!-- truncate -->

## What is Embedding?

![embedding the words `"dog"`, `"lion"`, and
`"table"`. A very simplified embedding might capture abstract attributes](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F2kklz14ilm3znobm8h92.png)

An **embedding** is a way of representing objects like text, images, or audio as points in a continuous vector space.

We use **embedding models** that take these objects and return arrays of floating-point values. Depending on the model,
the array may be of size 384, 768, 1000, etc.

The numbers in the array **capture the essence** (features/attributes) of the input.

For example, consider embedding the words `"dog"`, `"lion"`, and `"table"`. A very simplified embedding might capture
abstract attributes like:

```python
dog   = [0.9, 0.45, 0.1]  # animal, semi-wild, not object
lion  = [0.9, 0.8,  0.2]  # animal, wild, not object
table = [0.2, 0.3,  0.9]  # not animal, not wild, object
```

If we compute the **Manhattan distance** (sum of absolute differences), we get:

```txt
dog  -> lion  -> 0.45
dog  -> table -> 1.65
lion -> table -> 1.9

# This tells us that "dog" and "lion" are closer in meaning than either is to "table"
```

> While Manhattan distance helps explain this intuitively, **Cosine similarity** is often more appropriate for
> high-dimensional embeddings. Check out [Meta’s Faiss repo](https://github.com/facebookresearch/faiss) for optimized
> search implementations.

## Embeddings and Semantic Meanings?

![A location in multi dimensional space Credit: Simon Willison](https://web.archive.org/web/20250806161831im_/https://static.simonwillison.net/static/2023/embeddings/embeddings.003.jpeg)

The size of an embedding vector represents its dimensionality. For instance, a vector of length 3 can be thought of as
coordinates in 3D space (x, y, z).

Most embedding vectors are hundreds of dimensions, which we can’t easily visualize, but the idea holds: Objects with
similar semantic meaning are close together in this space.

> Example: An embedding for "Queen" might be close to "woman", "ruler", and "state", so searching for “the woman ruler
> of a state” may retrieve "Queen"

Importantly, the output vector size is fixed, regardless of input length (a sentence or a book → same vector size).

### Project 2: Building a Simple Transcript Searcher?

In the following code, Let's consider [this](https://youtu.be/vagyIcmIGOQ) long podcast, 6 hours in duration, covering
technical topics such as Ruby on Rails, AI, TypeScript, meetings, and more. The goal is to identify specific segments
where a particular technical topic is discussed, such as where the guest, DHH, expresses his views on disliking
managers.

```
pip install llm
llm install llm-sentence-transformers
```

```python
from collections import defaultdict
import llm
from llm import cosine_similarity

def read_transcript_chunks(file_path):
    chunks = defaultdict(list)
    with open(file_path, "r") as file:
        for line in file:
            # Extract minute from timestamp (format: MM:SS) and text content
            minute, text = line[:5].split(":")[0], line[6:]
            chunks[int(minute)].append(text.rstrip("\n"))
    return chunks

def embed_transcript_chunks(chunks, embedding_model):
    embeddings = {}
    for minute, texts in chunks.items():
        # Combine text chunks for the same minute into a single string
        combined_text = " ".join(texts)
        embeddings[minute] = embedding_model.embed(combined_text)
    return embeddings

def find_sorted_similar_chunks(query, embeddings, embedding_model):
    query_embedding = embedding_model.embed(query)
    similarity_scores = [
        [minute, cosine_similarity(embedding, query_embedding)]
        for minute, embedding in embeddings.items()
    ]
    similarity_scores.sort(key=lambda x: x[1], reverse=True)
    return similarity_scores

def generate_youtube_links(similarity_scores, video_id):
    return [
        (score, f"https://youtu.be/{video_id}?t={minute * 60}")
        for minute, score in similarity_scores
    ]

if __name__ == "__main__":
    TRANSCRIPT_FILE = "DHH Future of Programming, AI, Ruby on Rails, Productivity & Parenting  Lex Fridman Podcast #474.txt"
    VIDEO_ID = "vagyIcmIGOQ"

    USER_QUERY = "why managers suck and are useless"

    transcript_chunks = read_transcript_chunks(TRANSCRIPT_FILE)

    embedding_model = llm.get_embedding_model("sentence-transformers/all-MiniLM-L6-v2")

    chunk_embeddings = embed_transcript_chunks(transcript_chunks, embedding_model)

    similarity_results = find_sorted_similar_chunks(USER_QUERY, chunk_embeddings, embedding_model)

    # Generate YouTube links for the top 10 matches
    top_links = generate_youtube_links(similarity_results[:10], VIDEO_ID)

    for score, link in top_links:
        print(f"Similarity: {score:.2f} - {link}")
```

Here are the results for the query `why managers suck and are useless` You can click the YouTube links to listen and
verify the content. Alternatively, try changing the query to something like "why I hate JavaScript" and test it.

```sh
Similarity: 0.49 - https://youtu.be/vagyIcmIGOQ?t=8880
Similarity: 0.45 - https://youtu.be/vagyIcmIGOQ?t=8640
Similarity: 0.41 - https://youtu.be/vagyIcmIGOQ?t=8760
Similarity: 0.38 - https://youtu.be/vagyIcmIGOQ?t=8940
Similarity: 0.37 - https://youtu.be/vagyIcmIGOQ?t=9180
Similarity: 0.35 - https://youtu.be/vagyIcmIGOQ?t=9480
Similarity: 0.34 - https://youtu.be/vagyIcmIGOQ?t=8820
Similarity: 0.33 - https://youtu.be/vagyIcmIGOQ?t=9120
Similarity: 0.32 - https://youtu.be/vagyIcmIGOQ?t=16140
Similarity: 0.32 - https://youtu.be/vagyIcmIGOQ?t=9240
```

## Where to Store Embedding?

In the previous code example, embedding values are stored in memory (e.g., embedding dictionary). However, repeatedly
generating and storing embeddings in memory is inefficient for real-world applications. Instead, we can store embeddings
in a database for reuse.

Several vector databases are specialized for storing and searching vectors:

- **Open-source implementations**:
    - [Chroma](https://www.trychroma.com/): Open-source search and retrieval database for AI applications.
    - **Postgres** with [pgvector](https://github.com/pgvector/pgvector) and **ElasticSearch** are Capable of storing
      vector values.
    - [Weaviate](https://github.com/weaviate/weaviate) and [Milvus](https://github.com/milvus-io/milvus): Additional
      open-source options.
- **Cloud-based solutions**:
    - **Pinecone**, **AWS**, and **Google** offer managed vector database services.

## Meta Data Filtering

![Metadata filtering in two ways pre or post: image credit pinecone](https://web.archive.org/web/20250722050958im_/https://www.pinecone.io/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fvr8gru94%2Fproduction%2Fa102247b2696d3e208df9250b11b63934a7c7daf-1920x1220.png&w=3840&q=75)

In the previous code example, we stored the timestamps alongside the embedding that is a metadata.

Many vector databases support storing metadata alongside text and embedding values. Metadata, such as `year`,
`video_id`, and `role`, can help retrieve relevant information based on the current context. For example

When building a meeting transcript search tool, adding `year` metadata allows filtering of outdated meeting transcripts
to focus on recent or relevant ones. A `meeting_id` metadata enables including the source to trace back to the specific
meeting. A `role` metadata restricts access to privileged information by filtering transcripts based on user roles.

Metadata filtering can be done in two ways:

1. Perform a vector search to find the top k matches, then filter results by metadata.
2. Filter by metadata first to narrow down the dataset, then run a vector search to find the top k matches.

### Project 2.2: Embedding, Store and Metadata

Now that we understand vector databases and metadata filtering, let's enhance our previous code with improvements. We
will use Chroma vector database, some features of Chroma worth knowing are

- Chroma is an embeddable vector store, similar to how SQLite operates.
- Chroma supports configurable embedding models but defaults to the same model we used earlier.
- We can check if a collection already exists to avoid re-embedding transcripts.
- Additionally, Chroma supports metadata storing and filtering, which we will use to include metadata such as `video_id`
  and `start_time` to generate YouTube links with precise timestamps.

```shell
pip install chromadb
```

```python
from collections import defaultdict
import llm
import chromadb

def read_transcript_chunks(file_path):
    chunks = defaultdict(list)
    with open(file_path, "r") as file:
        for line in file:
            # Split line into minute (from MM:SS) and text content
            minute = line[:5].split(":")[0]
            text = line[6:].rstrip("\n")
            chunks[int(minute)].append(text)
    return chunks


def store_chunks_in_db(chunks, collection, video_id):
    for minute, texts in chunks.items():
        # Combine texts for the same minute into a single string
        combined_text = " ".join(texts)
        collection.add(
            ids=[str(minute)],
            documents=[combined_text],
            metadatas=[{"video_id": video_id, "start_time": minute * 60}],
        )


def find_similar_chunks(query, collection):
    results = collection.query(
        query_texts=[query],
        n_results=10,
    )
    links = []
    for metadata in results.get("metadatas") or []:
        for meta in metadata:
            links.append(f"https://youtu.be/{meta['video_id']}?t={meta['start_time']}")
    return links


if __name__ == "__main__":
    TRANSCRIPT_FILE = "DHH Future of Programming, AI, Ruby on Rails, Productivity & Parenting  Lex Fridman Podcast #474.txt"
    VIDEO_ID = "vagyIcmIGOQ"

    # Initialize Chroma DB client and collection
    chroma_client = chromadb.PersistentClient()
    collection = chroma_client.get_or_create_collection(name="podcast_transcripts")

    # Load and store chunks if the collection is empty
    if collection.count() == 0:
        transcript_chunks = read_transcript_chunks(TRANSCRIPT_FILE)
        store_chunks_in_db(transcript_chunks, collection, VIDEO_ID)

    user_query = "why managers suck and are useless"
    youtube_links = find_similar_chunks(user_query, collection)

    # Print YouTube links for the top matches
    for link in youtube_links:
        print(link)

```

The initial run of the script takes approximately 44 seconds on my machine. Subsequent runs are much faster, typically
2–4 seconds, as the embeddings are already stored, and only the query processing and retrieval are performed.

```sh
https://youtu.be/vagyIcmIGOQ?t=8880
https://youtu.be/vagyIcmIGOQ?t=8640
https://youtu.be/vagyIcmIGOQ?t=8760
https://youtu.be/vagyIcmIGOQ?t=8940
https://youtu.be/vagyIcmIGOQ?t=9180
https://youtu.be/vagyIcmIGOQ?t=9480
https://youtu.be/vagyIcmIGOQ?t=8820
https://youtu.be/vagyIcmIGOQ?t=9120
https://youtu.be/vagyIcmIGOQ?t=16140
https://youtu.be/vagyIcmIGOQ?t=9240
```

## What Can You Build with This

![What can you build with embeddings: similarity search, classification, clustering and recommendation](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fdsalb6nm5det9642g2xt.png)

### Similarity search

The most common use of embedding is semantic search with text, but it can be extended to find semantically similar
videos and images if the embedding model is multimodal.

For example, CLIP from OpenAI is a multimodal embedding model that supports both images and text.

Here is an example of things you can build with
CLIP: [Finding Bathroom Faucets with Embeddings | Drew Breunig](https://www.dbreunig.com/2023/09/26/faucet-finder.html)

Another multi modal embedding is ImageBind from Meta, which supports text, images, and audio.

### Classifications

Suppose we have 100 book descriptions, with 50 describing romantic books and 50 describing horror books. We store these
in our embedding model with metadata indicating their classification: "Horror" or "Romantic."

When we encounter a new book description without a category, we search based on its description embedding and find the k
nearest matches. We then determine the classification by majority, e.g., if 8 out of 10 matches are "Romantic," we
classify it as 80% Romantic.

You can also find additional example on this
topic: [Getting creative with embeddings](https://wattenberger.com/thoughts/yay-embeddings-math)

### Clustering

Group similar items based on their vector proximity. For example, we can organize similar items into the same folder
based on their description or context, helping to clean up a cluttered workspace.

### Recommendation

Similar to classification, we can embed 100 movie descriptions and include the title as metadata.

When a user searches based on a description or clicks on a movie, we use that description to find semantically similar
movies.

This approach is known as content-based recommendation or "related to this item" recommendation. It can also be used to
suggest related articles on a blog.

If you are more interested on embeddings and recommendation systems, I suggest you explore these
article: [Improving Recommendation Systems & Search in the Age of LLMs](https://eugeneyan.com/writing/recsys-llm/)

## Project I Build: Podcast Segment Search?

There is this podcast I listen a it has over 200 episodes, each containing hours of content. Sometimes, I recall ideas
or quotes I heard, but it can be challenging to pinpoint the specific episode or the exact minute within that episode.

My solution is similar to the previous example:

1. I downloaded all transcripts from YouTube using youtube-dl.
2. For each transcript, I segmented the content into 30-second chunks, which I believe is sufficient for capturing a
   sentence or quote.
3. Each chunk is embedded and stored in a vector database.
4. When I have an idea or quote in mind, I can send a query, embed it, and find the related episode. The closest match
   is the top result.
5. I also embed metadata such as `video_id`, `start_time`, and `end_time`. This allows me to generate a working YouTube
   link with the exact timestamp when I retrieve the results.
6. [Podcast embedding code link with Demo videos](https://github.com/zekaryas1/gen-ai/tree/main/embedding)

## Credit and What's Next: Agents

- Credit
    - Big thanks to [Simon Willison](https://simonwillison.net/), from whom I learned a lot about embeddings. Some of
      this content is adapted from his excellent articles.
- In the next part, we’ll explore agents, LLMs with tool access and reasoning. These can power:
    - Weather assistants using forecast APIs
    - Research tools with browser + research papers access
    - Custom, context-aware AI workflows
