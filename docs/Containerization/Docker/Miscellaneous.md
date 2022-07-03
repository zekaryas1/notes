---
date created: Thursday, June 23rd 2022, 4:58:47 pm
date modified: Sunday, July 3rd 2022, 11:40:22 am
title: Miscellaneous
---

# Miscellaneous

## Postgres Image

```bash
docker run --name postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```
