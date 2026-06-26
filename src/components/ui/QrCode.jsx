import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QrCode({ value, size = 130 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // ECL 'H' is required so that the central overlay does not corrupt the QR scan data.
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: {
        dark: '#ffffff',  // White QR dots
        light: '#0b1329'  // Deep dark blue background
      },
      errorCorrectionLevel: 'H'
    }, (err) => {
      if (err) {
        console.error('Failed to generate QR code:', err);
        return;
      }

      // Draw custom center label "AMAAN ANSARI"
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const badgeSize = Math.floor(canvas.width * 0.35); // 35% of canvas width
      const bx = (canvas.width - badgeSize) / 2;
      const by = (canvas.height - badgeSize) / 2;

      // Draw rounded background badge
      ctx.fillStyle = '#080d1a'; // Dark background
      ctx.strokeStyle = '#06b6d4'; // Cyan border
      ctx.lineWidth = 1.5;

      // Rounded rectangle drawing helper
      ctx.beginPath();
      const radius = 4;
      ctx.moveTo(bx + radius, by);
      ctx.lineTo(bx + badgeSize - radius, by);
      ctx.quadraticCurveTo(bx + badgeSize, by, bx + badgeSize, by + radius);
      ctx.lineTo(bx + badgeSize, by + badgeSize - radius);
      ctx.quadraticCurveTo(bx + badgeSize, by + badgeSize, bx + badgeSize - radius, by + badgeSize);
      ctx.lineTo(bx + radius, by + badgeSize);
      ctx.quadraticCurveTo(bx, by + badgeSize, bx, by + badgeSize - radius);
      ctx.lineTo(bx, by + radius);
      ctx.quadraticCurveTo(bx, by, bx + radius, by);
      ctx.closePath();
      
      ctx.fill();
      ctx.stroke();

      // Draw stacked text in middle
      ctx.fillStyle = '#ffffff';
      const fontSize = Math.max(7, Math.floor(size * 0.052));
      ctx.font = `bold ${fontSize}px Space Mono, ui-monospace, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillText('AMAAN', canvas.width / 2, canvas.height / 2 - (fontSize * 0.65));
      ctx.fillText('ANSARI', canvas.width / 2, canvas.height / 2 + (fontSize * 0.65));
    });
  }, [value, size]);

  return (
    <div className="flex items-center justify-center p-2 bg-[#0b1329] border border-white/10 rounded-xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
      <canvas ref={canvasRef} style={{ width: `${size}px`, height: `${size}px` }} />
    </div>
  );
}
