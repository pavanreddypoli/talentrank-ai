import { NextResponse } from "next/server";
import { Document, Packer, Paragraph } from "docx";

export async function POST(req: Request) {
  try {
    const { content, filename } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Missing resume content" },
        { status: 400 }
      );
    }

    const doc = new Document({
      sections: [
        {
          children: content.split("\n").map(
            (line: string) =>
              new Paragraph({
                children: [],
                text: line,
              })
          ),
        },
      ],
    });

    // Generate DOCX buffer
    const buffer = await Packer.toBuffer(doc);

    // ✅ Fix for Vercel / Next.js App Router: convert Buffer → Uint8Array
    const uint8 = new Uint8Array(buffer);

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename || "resume.docx"}"`,
      },
    });
  } catch (err) {
    console.error("DOCX generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate DOCX" },
      { status: 500 }
    );
  }
}
