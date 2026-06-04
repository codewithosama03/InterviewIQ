import Groq from "groq-sdk";
import PDFParser from "pdf2json";

export const analyzeResume = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF required",
      });
    }

    const pdfParser =
      new PDFParser();

    const resumeText =
      await new Promise(
        (resolve, reject) => {
          pdfParser.on(
            "pdfParser_dataError",
            (err) =>
              reject(err)
          );

          pdfParser.on(
            "pdfParser_dataReady",
            (pdfData) => {
              let text = "";

              pdfData.Pages.forEach(
                (page) => {
                  page.Texts.forEach(
                    (
                      textItem
                    ) => {
                      text +=
                        decodeURIComponent(
                          textItem
                            .R[0]
                            .T
                        ) + " ";
                    }
                  );
                }
              );

              resolve(text);
            }
          );

          pdfParser.parseBuffer(
            req.file.buffer
          );
        }
      );

    const groq = new Groq({
      apiKey:
        process.env
          .GROQ_API_KEY,
    });

    const prompt = `
You are an ATS Resume Reviewer.

Analyze this resume.

Resume:

${resumeText}

Return ONLY valid JSON.

{
  "atsScore": 0,
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Rules:

- atsScore between 1 and 100
- missingSkills 3-8 points
- strengths 3-8 points
- weaknesses 3-8 points
- suggestions 3-8 points

Return JSON only.
`;

    const completion =
      await groq.chat.completions.create(
        {
          messages: [
            {
              role: "user",
              content:
                prompt,
            },
          ],
          model:
            "llama-3.3-70b-versatile",
        }
      );

    const rawResponse =
      completion.choices[0]
        .message.content
        .replace(
          /```json/g,
          ""
        )
        .replace(
          /```/g,
          ""
        )
        .trim();

    const result =
      JSON.parse(
        rawResponse
      );

    res.status(200).json(
      result
    );

  } catch (error) {
    console.log(
      "RESUME ERROR:",
      error
    );

    res.status(500).json({
      message:
        error.message,
    });
  }
};