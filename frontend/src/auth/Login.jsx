import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../utils/UserService';
import avatarImg from './avatar.png';
import Navbar from './Navbar';

  class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 40 + 160}, 70%, 60%)`;
  }

  update() {
    this.y -= this.speed;
  }
}

	const Background = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const data = useRef({
    heartRate: Array(50).fill(80),
    strength: Array(20).fill(0),
    calories: 0
  });


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const generateData = () => {
      data.current = {
        heartRate: data.current.heartRate
          .slice(1)
          .concat(100 + Math.sin(Date.now()/800) * 70),
        calories: data.current.calories + Math.random(),
        strength: data.current.strength
          .slice(1)
          .concat(
            Math.min(50, Math.max(30, 
              data.current.strength[data.current.strength.length - 1] + 
              (Math.random() * 10 - 7) 
            ))
          )
      };
    };

    const drawStrength = (ctx) => {
      const barWidth = canvas.width / data.current.strength.length;
      data.current.strength.forEach((v, i) => {
        ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + v/150})`; 
        ctx.fillRect(
          i * barWidth,
          canvas.height - (v/100 * canvas.height/2),
          barWidth - 1,
          canvas.height
        );
      });
    };

    const drawHeartRate = (ctx) => {
      ctx.beginPath();
      ctx.strokeStyle = '#ff6b6b';
      ctx.lineWidth = 2;
      data.current.heartRate.forEach((v, i) => {
        const x = (canvas.width / data.current.heartRate.length) * i;
        const y = canvas.height/1 - v;
        ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    const updateParticles = () => {
      particles.current = particles.current
        .filter(p => p.y > 0)
        .map(p => {
          p.update();
          return p;
        });

      if(particles.current.length < data.current.calories/1) {
        particles.current.push(new Particle(
          Math.random() * canvas.width,
          canvas.height
        ));
      }
    };

    const drawParticles = (ctx) => {
      particles.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
    };

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      generateData();
      drawHeartRate(ctx);
      drawStrength(ctx);
      updateParticles();
      drawParticles(ctx);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen z-0 bg-[#1a1a2e]" />;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = userService.loginRequest('/auth/login', { username, password });
      sessionStorage.setItem('token', (await response).data.jwt);
      sessionStorage.setItem('username', username);
      navigate(-1);
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };
 
      return (
    <div className="min-h-screen w-screen">
      <Navbar className="fixed top-0 left-0 w-full z-50" />
      <Background />
 
      <div className="relative pt-20 h-screen flex items-center justify-center">
        <div className="relative z-20 w-full max-w-5xl bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-2xl p-14">
          <div className="grid md:grid-cols-2 gap-10"> 
            {/* Left Section */}
            <div className="hidden md:flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#ff6b6b]/80 to-[#ffd93d]/80 rounded-xl">
              <img 
                src={avatarImg}
                alt="Gym Logo"
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl mb-4"
              />
              <h2 className="text-3xl text-[#2c3e50] mb-2">WELCOME TO</h2>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ae6bff] to-[#2eb8ea] bg-clip-text text-transparent mb-4">
                HaGymont
              </h2>
              <p className="text-lg text-gray-600 italic">A better you, A better world</p>
            </div>
 
            {/* Right Form Section */}
            <div className="p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold text-[#2c3e50] text-center mb-6">Member Login</h2>

          
          {error && (
            <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg animate-fade-in">
              {error}
            </div>
          )}
 
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-800 mb-2">Username</label>

            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
 
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
 
          <div className="flex flex-col md:flex-row gap-4">
            <button
  className="flex-1 px-6 py-3 bg-blue-500 text-white text-base font-semibold rounded-lg hover:bg-blue-600 transition-all disabled:bg-gray-400"
  onClick={handleLogin}
  disabled={isLoading}
>
  {isLoading ? 'Signing In...' : 'LOGIN'}
</button>

<button
  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-base font-semibold rounded-lg transition-all"
  onClick={() => navigate('/signin')}
>
  CREATE ACCOUNT
</button>

          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
  );
};


export default Login;