import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../utils/UserService';
import { initBackground } from '../utils/canvasAnimation';
import './Signin.css';


function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    gender: '',
    type: 'premium',
    birthdate: '',
    phone: '',
    promotionOptIn: false,
    personalizationOptIn: false
  });

  const canvasRef = useRef(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 初始化背景动画
  useEffect(() => {
    return initBackground(canvasRef);
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = 'Gender selection is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }
    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        birthdate: new Date(formData.birthdate).toISOString(),
        passwordConfirm: undefined
      };

      await userService.signinRequest('/auth/signin', payload);
      
      const loginRes = await userService.loginRequest('/auth/login', {
        username: formData.username,
        password: formData.password
      });

      sessionStorage.setItem('token', loginRes.data.jwt);
      sessionStorage.setItem('username', formData.username);
      navigate('/products');

    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({
        general: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    }
  };


  return (
    <>
      {/* 动态背景 */}
      <canvas 
        ref={canvasRef}
        className="background-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          background: '#1a1a2e'
        }}
      />

      {/* Logo */}
    <div className="gym-logo">
      <span className="logo-text">HaGymont</span>
      <span className="logo-subtext">FITNESS CLUB</span>
    </div>
    
    {/* form */}
    <div className="signin-container">
        <div className="form-wrapper">
          <h2 className="form-main-title">Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            {/* gender */}
            <div className="form-section">
            <label className="form-label"><strong>Gender *</strong></label>
<div className="gender-options">
  {/* Male */}
  <div className="gender-option">
    <input
      type="radio"
      id="male"
      name="gender"
      value="M"
      checked={formData.gender === 'M'}
      onChange={handleChange}
    />
    <label htmlFor="male">Male</label>
  </div>
  
  {/* Female */}
  <div className="gender-option">
    <input
      type="radio"
      id="female"
      name="gender"
      value="F"
      checked={formData.gender === 'F'}
      onChange={handleChange}
    />
    <label htmlFor="female">Female</label>
  </div>

  {/* Neutral */}
  <div className="gender-option">
    <input
      type="radio"
      id="neutral"
      name="gender"
      value="N"
      checked={formData.gender === 'N'}
      onChange={handleChange}
    />
    <label htmlFor="neutral">Neutral</label>
  </div>
</div>
              {errors.gender && 
    <div className="invalid-feedback d-block">
      {errors.gender}
    </div>
              }
            </div>
            {/* username */}
        <div className="mb-3">
          <label className="form-label"><strong>Username *</strong></label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        {/* email */}
        <div className="mb-3">
          <label className="form-label"><strong>Email *</strong></label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* password */}
        <div className="mb-3">
          <label className="form-label"><strong>Password *</strong></label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* confirm password */}
        <div className="mb-3">
          <label className="form-label"><strong>Confirm Password *</strong></label>
          <input
            type="password"
            className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm}</div>}
        </div>

        {/* name */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* type*/}
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label"><strong>Account Type *</strong></label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              > 
                <option value="admin">Just joined HaGymont(I don't want to become a member)</option>
                <option value="classic">Classic</option>
                <option value="premium">Premium</option>
                <option value="coach">Coach</option>
              </select>
            </div>
          </div>
        </div>

        {/* birthday */}
        <div className="mb-3">
          <label className="form-label"><strong>Birthdate *</strong></label>
          <input
            type="date"
            className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
          {errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
        </div>

        {/* Telephone */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
          />
          <div className="form-text">Format: 10 digits</div>
        </div>

        {/* Communication */}
        <div className="mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="promotionOptIn"
              name="promotionOptIn"
              checked={formData.promotionOptIn}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="promotionOptIn">
              Yes, I would like to receive promotions and information regarding other products from HaGymont and its partners.
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="personalizationOptIn"
              name="personalizationOptIn"
              checked={formData.personalizationOptIn}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="personalizationOptIn">
              Yes, I would like to make optimal use of my fitness membership! HaGymont may send me information based on my interests or preferences.
            </label>
          </div>
        </div>

        {errors.general && (
          <div className="alert alert-danger mb-3">{errors.general}</div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
    </div>
    </>
);
}


export default Signin;