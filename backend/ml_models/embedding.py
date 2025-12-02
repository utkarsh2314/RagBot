from transformers import AutoTokenizer, AutoModel
from langchain.embeddings.base import Embeddings
import torch

class HFEmbeddings(Embeddings):
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer

    def _embed(self, texts):
        inputs = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            return_tensors="pt"
        )

        with torch.no_grad():
            outputs = self.model(**inputs)

        embeddings = outputs.last_hidden_state.mean(dim=1)
        return embeddings.cpu().numpy().tolist()

    def embed_documents(self, texts):
        return self._embed(texts)

    def embed_query(self, text):
        return self._embed([text])[0]



tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

embedding = HFEmbeddings(model=model, tokenizer=tokenizer)