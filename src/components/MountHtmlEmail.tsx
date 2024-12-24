export default function mountHtmlEmail(name:string, phone:string, message:string) {
  return `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; background-color: #000000; color: #ffffff; padding: 20px 0; border-radius: 8px 8px 0 0;">
          <h1>Pedido de Suporte</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Detalhes do Pedido</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
          <p><strong>Pedido de Suporte:</strong> ${message}</p>
        </div>
        <div style="text-align: center; padding: 10px; font-size: 12px; color: #777777;">
          <p>Este e-mail foi gerado automaticamente pelo sistema.</p>
        </div>
      </div>
    </body>
  `;
}
