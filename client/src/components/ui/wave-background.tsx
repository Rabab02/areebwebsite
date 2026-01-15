import { useEffect, useRef } from 'react';

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    // Areeb Brand Colors
    const colors = [
      'rgba(132, 204, 22, 0.5)',   // Brand Green
      'rgba(59, 130, 246, 0.3)',   // Blue
      'rgba(16, 185, 129, 0.3)',   // Emerald
    ];

    function drawWave(yOffset: number, amplitude: number, frequency: number, speed: number, color: string, thickness: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = color;

      for (let x = 0; x < width; x += 5) {
        const y = yOffset + Math.sin(x * frequency + time * speed) * amplitude 
                  + Math.cos(x * frequency * 0.5 + time * speed * 0.5) * (amplitude * 0.5); // Add complexity
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      // Create trails/blur effect instead of full clear
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; // Deep Navy background with trail
      ctx.fillRect(0, 0, width, height);
      
      // Or clear for crisp lines (Let's go for crisp lines on a dark bg)
      ctx.clearRect(0, 0, width, height);

      time += 0.005;

      // Draw multiple complex waves
      // Green Main Wave
      drawWave(height * 0.5, 50, 0.003, 2, colors[0], 2);
      
      // Blue Secondary Wave
      drawWave(height * 0.5, 70, 0.002, 1.5, colors[1], 1);
      
      // Emerald Subtle Wave
      drawWave(height * 0.5, 30, 0.005, 3, colors[2], 1);

      // Top Waves (Sky)
      drawWave(height * 0.2, 40, 0.002, 1, 'rgba(132, 204, 22, 0.1)', 1);
      
      // Bottom Waves (Ocean)
      drawWave(height * 0.8, 60, 0.002, -1.5, 'rgba(59, 130, 246, 0.1)', 1);

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
