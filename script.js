function abrirWhatsApp() {
    const numero = "5599999999999"; // coloque seu número aqui
    const mensagem = "Olá! Gostaria de saber mais sobre seus serviços.";
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
}
