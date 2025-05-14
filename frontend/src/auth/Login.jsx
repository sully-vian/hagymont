import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../auth/avatar.png';
import userService from '../utils/UserService';
import './Login.css';

const Background = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const data = useRef({
    heartRate: Array(50).fill(80),
    strength: Array(20).fill(0),
    calories: 0
  });

  

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

  return <canvas ref={canvasRef} className="background-canvas" />;
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
      console.log('Connection réussie :', (await response).data.message);
      console.log('Token :', (await response).data.jwt);
      sessionStorage.setItem('token', (await response).data.jwt);
      sessionStorage.setItem('username', username);
      navigate('/home');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <Background />
     {/* 左上角Logo */}
     <div className="gym-logo">
      <span className="logo-text">HaGymont</span>
      <span className="logo-subtext">FITNESS CLUB</span>
    </div>

      <div className="login-container">
        <div className="left-container">
          <img src={avatarImg} alt="Gym Logo" className="avatar" />
          <h2 className="welcome-text">WELCOME TO</h2>
          <h2 className="gym-name-text">HaGymont</h2>
          <h2 className="welcome-text sub-title">
            A better you ,A better world
          </h2>
        </div>

        <div className="form-container">
          <h2 className="form-title">Member Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="button-group">
            <button
              className="primary-btn"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate('/signin')}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;