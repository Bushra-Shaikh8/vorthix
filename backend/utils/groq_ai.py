from groq import AsyncGroq
from config import get_settings

settings = get_settings()

async def get_faq_answer(business_name: str, question: str, faq_chunks: list):
    if not faq_chunks:
        return ("I haven't been trained yet. Please contact the business directly.", False)

    question_words = set(question.lower().split())
    scored = [(len(set(c.lower().split()) & question_words), c) for c in faq_chunks]
    scored.sort(reverse=True)
    context = "\n\n".join(c for _, c in scored[:5])

    system_prompt = f"""You are a helpful assistant for "{business_name}".
STRICT RULES:
1. Answer ONLY from the FAQ context below.
2. If the answer is not in the FAQ, say: "I'll connect you to a human".
3. Keep answers short and friendly.
4. IMPORTANT: You MUST reply in the SAME LANGUAGE AND SCRIPT as the customer's question.
   - If the customer writes in English, reply in English.
   - If the customer writes in Roman Urdu, reply in Roman Urdu.
   - If mixed, match the mix.

FAQ CONTEXT:
{context}"""

    client = AsyncGroq(api_key=settings.groq_api_key)
    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question},
        ],
        max_tokens=300,
        temperature=0.3,
    )

    answer = response.choices[0].message.content.strip()
    needs_human = "connect you to a human" in answer.lower()
    return answer, needs_human