import { createCanvas, loadImage } from "@napi-rs/canvas";
import fetch from "node-fetch";

export interface ProfileBannerOptions {
  name: string;
  age: number;
  avatarUrl: string;
  bannerUrl?: string;
  about?: string;
  width?: number;
  height?: number;
}

export async function generateProfileBanner({
  name,
  age,
  avatarUrl,
  bannerUrl,
  about = "",
  width = 800,
  height = 500,
}: ProfileBannerOptions): Promise<Buffer> {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const wrapText = (ctx: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(" ");
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + (line.length > 0 ? ' ' : '') + words[n];
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && line.length > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n];
        currentY += lineHeight;
      } else {
        line = testLine;
      }

      if (n === words.length - 1 && line.length > 0) {
        ctx.fillText(line, x, currentY);
        currentY += lineHeight;
      }
    }
    return currentY; 
  };

  const drawRoundedImage = (img: any, x: number, y: number, w: number, h: number, radius: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  };

  ctx.clearRect(0, 0, width, height);

  const avatarSize = 150;
  const avatarX = 50;
  const bannerHeight = bannerUrl ? 300 : 100;

  if (bannerUrl) {
    try {
      const res = await fetch(bannerUrl);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const userBanner = await loadImage(Buffer.from(buffer));

        const bannerX = 0;
        const bannerY = 0;
        const bannerWidth = width;

        const bannerAspectRatio = userBanner.width / userBanner.height;
        const scaledWidth = bannerHeight * bannerAspectRatio;
        const scaleX = bannerWidth / scaledWidth;
        const drawWidth = bannerWidth;
        const drawHeight = bannerHeight;
        const offsetX = 0;
        const offsetY = 0;

        ctx.fillStyle = "#fff";
        const radius = 20;
        ctx.beginPath();
        ctx.moveTo(bannerX + radius, bannerY);
        ctx.lineTo(bannerX + bannerWidth - radius, bannerY);
        ctx.quadraticCurveTo(bannerX + bannerWidth, bannerY, bannerX + bannerWidth, bannerY + radius);
        ctx.lineTo(bannerX + bannerWidth, bannerY + bannerHeight - radius);
        ctx.quadraticCurveTo(bannerX + bannerWidth, bannerY + bannerHeight, bannerX + bannerWidth - radius, bannerY + bannerHeight);
        ctx.lineTo(bannerX + radius, bannerY + bannerHeight);
        ctx.quadraticCurveTo(bannerX, bannerY + bannerHeight, bannerX, bannerY + bannerHeight - radius);
        ctx.lineTo(bannerX, bannerY + radius);
        ctx.quadraticCurveTo(bannerX, bannerY, bannerX + radius, bannerY);
        ctx.closePath();
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(bannerX + radius, bannerY);
        ctx.lineTo(bannerX + bannerWidth - radius, bannerY);
        ctx.quadraticCurveTo(bannerX + bannerWidth, bannerY, bannerX + bannerWidth, bannerY + radius);
        ctx.lineTo(bannerX + bannerWidth, bannerY + bannerHeight - radius);
        ctx.quadraticCurveTo(bannerX + bannerWidth, bannerY + bannerHeight, bannerX + bannerWidth - radius, bannerY + bannerHeight);
        ctx.lineTo(bannerX + radius, bannerY + bannerHeight);
        ctx.quadraticCurveTo(bannerX, bannerY + bannerHeight, bannerX, bannerY + bannerHeight - radius);
        ctx.lineTo(bannerX, bannerY + radius);
        ctx.quadraticCurveTo(bannerX, bannerY, bannerX + radius, bannerY);
        ctx.closePath();
        ctx.clip();

        const imgScale = Math.max(bannerWidth / userBanner.width, bannerHeight / userBanner.height);
        const scaledImgWidth = userBanner.width * imgScale;
        const scaledImgHeight = userBanner.height * imgScale;
        const drawX = bannerX - (scaledImgWidth - bannerWidth) / 2;
        const drawY = bannerY - (scaledImgHeight - bannerHeight) / 2;
        ctx.drawImage(userBanner, drawX, drawY, scaledImgWidth, scaledImgHeight);

        ctx.restore();
      }
    } catch {
    }
  }

  const avatarY = bannerHeight - avatarSize / 2 - 10;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 5, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  const userPhoto = await loadImage(avatarUrl);
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(userPhoto, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  const textStartY = bannerHeight + 100;
  ctx.fillStyle = "#fff";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText(`${name}, ${age}y`, avatarX, textStartY);

  ctx.font = "24px sans-serif";
  const lineHeight = 28;
  const finalY = wrapText(ctx, about, avatarX, textStartY + 40, width - avatarX - 50, lineHeight);

  return canvas.toBuffer("image/png");
}