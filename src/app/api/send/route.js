import { NextResponse } from "next/server";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const { RESEND_API_KEY, FROM_EMAIL, FROM_NAME } = process.env;

// Verifica se todas as variáveis de ambiente necessárias estão definidas
if (!RESEND_API_KEY || !FROM_EMAIL || !FROM_NAME) {
  console.error("Erro: Variáveis de ambiente não estão definidas corretamente.");
  process.exit(1); // Encerra o processo Node.js com um código de erro
}

const resend = new Resend(RESEND_API_KEY);

export async function POST(req, res) {
  try {
    const { email, name, message } = await req.json();

    if (!email || !name || !message) {
      return NextResponse.json({ error: "Campos de entrada ausentes." }, 400);
    }
    console.log(email, name, message);

    const emailData = {
      from: email,
      to: [FROM_EMAIL],
      subject: `${FROM_NAME} - ${name}`,
      react: (<>
        <h1>{name}</h1>
        <p>Obrigado por nos contatar!</p>
        <p>Nova mensagem enviada:</p>
        <p>{message}</p>
      </>),
    };

    const data = await resend.emails.send(emailData);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao lidar com a solicitação:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, 500);
  }
}
