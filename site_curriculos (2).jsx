import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

export default function CurriculoStore() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cpf: "", destino: "" });
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState("home");

  // PIX modal / timer
  const [showPix, setShowPix] = useState(false);
  const [timer, setTimer] = useState(600); // segundos
  const PIX_CODE = "00020126580014BR.GOV.BCB.PIX013680968f43-2295-4e2a-a726-850ef3e1eb4952040000530398654049.905802BR5925Paulo Miguel Rodrigues de6009SAO PAULO62140510D5aeOatsCc63042F0C";

  useEffect(() => {
    let interval;
    if (showPix) {
      // reinicia o cronômetro quando o modal abre
      setTimer(600);
      interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showPix]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuy = () => {
    // abre o modal de pagamento
    setShowPix(true);
  };

  const generateNewPix = () => {
    // Não é possível gerar um PIX real sem integração com o Nubank.
    // Aqui apenas reiniciamos o modal/cronômetro para o fluxo do usuário.
    setShowPix(false);
    setTimeout(() => setShowPix(true), 250);
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
      alert("Código PIX copiado! Cole no seu app do banco para pagar.");
    } catch (e) {
      alert("Não foi possível copiar automaticamente. Selecione e copie manualmente:");
    }
  };

  const sendMessage = () => {
    if (!chat) return;
    setMessages((m) => [...m, { author: "Você", text: chat }, { author: "Bot", text: "Posso ajudar! O que você precisa saber sobre nossos currículos?" }]);
    setChat("");
  };

  return (
    <>
      {/* Top menu */}
      <div className="w-full bg-white shadow-md p-4 flex justify-center gap-8 text-lg font-semibold rounded-xl mb-6">
        <button onClick={() => setPage("home")} className="hover:text-blue-600">Home</button>
        <button onClick={() => setPage("ajuda")} className="hover:text-blue-600">Ajuda</button>
        <button onClick={() => setPage("sobre")} className="hover:text-blue-600">Sobre Nós</button>
      </div>

      {/* HOME */}
      {page === "home" && (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-8">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            Bem-vindo! Aqui você pode:
          </motion.h1>

          <Card className="w-full max-w-xl p-6 shadow-xl rounded-2xl text-lg flex flex-col gap-4">
            <p className="mb-2">Nosso sistema usa Inteligência Artificial para criar um currículo totalmente profissional para você. Basta preencher seus dados e escolher o modelo — em poucos minutos você recebe tudo pronto.</p>
            <ul className="list-disc list-inside">
              <li>Criar um currículo profissional</li>
              <li>Enviar seus dados para gerar o currículo</li>
              <li>Pagar apenas R$ 9,90</li>
              <li>Escolher modelos modernos e atraentes</li>
              <li>Receber o currículo em PDF pronto para envio</li>
              <li>Agilidade: currículo gerado em menos de 2 minutos</li>
            </ul>

            <div className="flex gap-2 mt-4">
              <Button onClick={() => setPage("comprar")} className="flex-1">Criar e Comprar Currículo</Button>
              <Button onClick={() => setPage("ajuda")} variant="secondary" className="flex-1">Precisa de ajuda?</Button>
            </div>

            <p className="text-sm text-gray-500 mt-3">Após clicar em “Criar e Comprar Currículo” você será levado ao formulário de compra e poderá abrir o modal de pagamento (PIX) para finalizar.</p>
          </Card>
        </div>
      )}

      {/* COMPRAR */}
      {page === "comprar" && (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-8">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            Crie seu Currículo com AI
          </motion.h1>

          <Card className="w-full max-w-xl shadow-xl rounded-2xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" alt="Currículo" className="rounded-xl mb-4" />

              <h2 className="text-2xl font-semibold">Compre seu currículo por apenas R$ 9,90</h2>

              <Input name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} />
              <Input name="email" placeholder="Seu email" value={form.email} onChange={handleChange} />
              <Input name="telefone" placeholder="Seu telefone" value={form.telefone} onChange={handleChange} />
              <Input name="cpf" placeholder="Seu CPF" value={form.cpf} onChange={handleChange} />
              <Input name="destino" placeholder="Para quem você vai enviar o currículo" value={form.destino} onChange={handleChange} />

              <Button className="mt-2 w-full" onClick={handleBuy}>Pagar R$ 9,90</Button>
            </CardContent>
          </Card>

          {/* PIX Modal */}
          {showPix && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full flex flex-col items-center gap-4 text-center">
                <h2 className="text-2xl font-bold">Pagamento PIX</h2>

                <p className="text-red-600 text-lg font-semibold">Tempo restante: {formatTime(timer)}</p>

                {timer === 0 ? (
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-red-700 font-bold text-xl mt-2">⛔ O tempo acabou! Clique abaixo para gerar um novo código PIX.</p>
                    <Button onClick={generateNewPix} className="w-full bg-green-600 text-white hover:bg-green-700">Gerar novo código PIX</Button>
                  </div>
                ) : (
                  <>
                    <p className="text-lg">Escaneie o QR Code ou copie o código abaixo:</p>
                    <QRCodeCanvas value={PIX_CODE} size={220} includeMargin={true} className="rounded-xl" />

                    <textarea className="w-full p-3 bg-gray-100 rounded-xl text-sm" rows={4} readOnly value={PIX_CODE}></textarea>

                    <Button disabled={timer === 0} onClick={copyPix} className={`w-full ${timer === 0 ? "bg-gray-400 cursor-not-allowed" : ""}`}>Copiar Código PIX</Button>

                    <Button onClick={() => setShowPix(false)} className="w-full bg-red-500 text-white hover:bg-red-600">Fechar</Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AJUDA */}
      {page === "ajuda" && (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-8">
          <Card className="w-full max-w-xl shadow-lg rounded-2xl p-4">
            <h3 className="text-xl font-semibold mb-2">Chatbot de Ajuda</h3>
            <div className="h-48 overflow-y-auto bg-white p-3 rounded-xl mb-3 shadow-inner">
              {messages.map((msg, i) => (
                <p key={i} className="mb-2"><strong>{msg.author}:</strong> {msg.text}</p>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={chat} placeholder="Digite sua pergunta..." onChange={(e) => setChat(e.target.value)} />
              <Button onClick={sendMessage}>Enviar</Button>
            </div>
          </Card>
        </div>
      )}

      {/* SOBRE */}
      {page === "sobre" && (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-8 text-lg">
          <Card className="w-full max-w-xl p-6 shadow-xl rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Sobre Nós</h2>
            <p>Somos uma plataforma que cria currículos profissionais usando Inteligência Artificial.</p>
            <p className="mt-3">✔ Trabalhamos com tecnologia avançada para gerar modelos profissionais automaticamente.</p>
            <p>✔ Garantimos praticidade: você envia seus dados, paga apenas R$ 9,90 e recebe seu currículo pronto.</p>
            <p>✔ Nosso sistema foi desenvolvido para ajudar tanto quem está procurando o primeiro emprego quanto quem deseja melhorar o currículo atual.</p>
            <p className="mt-3">Nossa missão é tornar o processo simples, rápido e acessível, ajudando pessoas a conquistar novas oportunidades no mercado de trabalho.</p>
            <p className="mt-3">Se tiver dúvidas, você pode acessar a aba de Ajuda e falar diretamente com nosso Chatbot.</p>
          </Card>
        </div>
      )}
    </>
  );
}
