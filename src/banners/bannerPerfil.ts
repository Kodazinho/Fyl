import nodeHtmlToImage from "node-html-to-image";
import fs from "fs";

interface PerfilData {
  nome: string;
  idade: number;
  avatar: string;
  bio: string;
  banner: string;
  genero: string;
  sex: string;
  entrada: string;
}

export default async function({ nome, idade, avatar, bio, banner, genero, sex, entrada }: PerfilData) {
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Perfil</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      <style>
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 450px;
          color: #fff;
        }

        .profile-card {
          display: flex;
          background: transparent;
          border-radius: 20px;
          overflow: hidden;
          width: 900px;
          height: 450px;
          position: relative;
        }

        .profile-card::before {
          content: "";
          background: url('${banner}') center/cover no-repeat;
          position: absolute;
          inset: 0;
          filter: brightness(0.6);
          z-index: 0;
        }

        .avatar-container {
          flex-shrink: 0;
          margin: 40px;
          z-index: 1;
        }

        .avatar {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 5px solid #fff;
          object-fit: cover;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 40px;
          z-index: 1;
        }

        .info h2 {
          margin: 0;
          font-size: 42px;
          font-weight: 600;
          color: #f1f1f1;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .info h2 span {
          font-size: 24px;
          font-weight: 300;
          color: #a0a0a0;
        }

        .info p {
          margin: 12px 0 20px 0;
          font-size: 16px;
          line-height: 1.5;
          color: #e0e0e0;
          font-style: italic;
          background: rgba(255, 255, 255, 0.1);
          padding: 10px 15px;
          border-radius: 8px;
          max-width: 400px;
          height: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 16px;
          background: rgba(0, 0, 0, 0.3);
          padding: 15px;
          border-radius: 10px;
          max-width: 400px;
        }

        .details div {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 5px;
        }

        .details i {
          color: #1e90ff;
          font-size: 18px;
        }

        .details strong {
          color: #fff;
          font-weight: 500;
        }

        .details span {
          color: #d0d0d0;
        }
      </style>
    </head>
    <body>
      <div class="profile-card">
        <div class="avatar-container">
          <img src="${avatar}" alt="Avatar" class="avatar"/>
        </div>
        <div class="info">
          <h2>${nome} <span>· ${idade} anos</span></h2>
          <p>${bio}</p>
          <div class="details">
            <div><i class="fas fa-venus-mars"></i><strong>Sexo:</strong> <span>${sex}</span></div>
            <div><i class="fas fa-transgender"></i><strong>Gênero:</strong> <span>${genero}</span></div>
            <div><i class="fas fa-calendar-alt"></i><strong>Data de Entrada:</strong> <span>${entrada}</span></div>
          </div>
        </div>
      </div>
    </body>
  </html>`;

  const buffer = await nodeHtmlToImage({
    html,
    quality: 100,
    type: "png",
    transparent: true,
  });
  return buffer;
}