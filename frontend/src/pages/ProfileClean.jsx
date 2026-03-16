import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Crown, 
  Star, 
  Check, 
  X, 
  Bell, 
  Download, 
  Play, 
  Clock, 
  Tv, 
  Film, 
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Users,
  Gift,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Edit,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe
} from 'lucide-react';
import '../styles/profile.css';

const ProfileClean = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState('high');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');

  // User data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2023",
    location: "New York, USA",
    avatar: "https://picsum.photos/seed/user-avatar/150/150",
    plan: "Premium",
    nextBilling: "March 15, 2024",
    profileIcon: "👤"
  };

  // Subscription plans
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? 8.99 : 89.99,
      features: [
        '✓ Watch on 1 device at a time',
        '✓ Standard definition (480p)',
        '✓ Unlimited movies & TV shows',
        '✓ Cancel anytime'
      ],
      notIncluded: [
        '✗ HD available',
        '✗ Ultra HD available',
        '✗ Download for offline viewing'
      ],
      color: 'from-gray-600 to-gray-800',
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      price: billingCycle === 'monthly' ? 13.99 : 139.99,
      features: [
        '✓ Watch on 2 devices at a time',
        '✓ Full HD (1080p)',
        '✓ Unlimited movies & TV shows',
        '✓ Download on 2 devices',
        '✓ Cancel anytime'
      ],
      notIncluded: [
        '✗ Ultra HD (4K) available'
      ],
      color: 'from-blue-600 to-blue-800',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 17.99 : 179.99,
      features: [
        '✓ Watch on 4 devices at a time',
        '✓ Ultra HD (4K) and HDR',
        '✓ Unlimited movies & TV shows',
        '✓ Download on 6 devices',
        '✓ Netflix spatial audio',
        '✓ Cancel anytime'
      ],
      notIncluded: [],
      color: 'from-purple-600 to-pink-600',
      popular: true
    }
  ];

  // Watch history
  const watchHistory = [
    { title: "Stranger Things", episode: "S4E9", time: "2 hours ago", progress: 75 },
    { title: "The Crown", episode: "S6E10", time: "1 day ago", progress: 100 },
    { title: "Inception", episode: "Movie", time: "3 days ago", progress: 100 },
    { title: "The Mandalorian", episode: "S3E8", time: "1 week ago", progress: 60 },
    { title: "Breaking Bad", episode: "S5E14", time: "2 weeks ago", progress: 100 }
  ];

  // Active devices
  const activeDevices = [
    { type: 'laptop', name: 'MacBook Pro', lastUsed: '2 hours ago', location: 'New York' },
    { type: 'phone', name: 'iPhone 14', lastUsed: '1 day ago', location: 'New York' },
    { type: 'tablet', name: 'iPad Air', lastUsed: '3 days ago', location: 'Home' },
    { type: 'tv', name: 'Samsung Smart TV', lastUsed: '1 week ago', location: 'Living Room' }
  ];

  const handleLogout = () => {
    if (window.showNotification) {
      window.showNotification('info', '👋 Logging out...');
    }
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
    if (window.showNotification) {
      window.showNotification('success', `🎉 Plan changed to ${plans.find(p => p.id === planId).name}!`);
    }
  };

  const handleUpdateProfile = () => {
    if (window.showNotification) {
      window.showNotification('success', '✅ Profile updated successfully!');
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'laptop': return <Monitor size={20} />;
      case 'phone': return <Smartphone size={20} />;
      case 'tablet': return <Tablet size={20} />;
      case 'tv': return <Tv size={20} />;
      default: return <Monitor size={20} />;
    }
  };

  return (
    <div className="profile-page">

      {/* Navigation */}
      <nav className="profile-nav">
        <div className="profile-nav-content">
          <div className="profile-nav-left">
            <button
              onClick={() => navigate('/')}
              className="profile-nav-button"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <div className="profile-nav-title">
              <User size={24} className="text-red-600" />
              <h1>Profile</h1>
            </div>
          </div>

          <div className="profile-nav-right">
            <button className="profile-nav-button">
              <Bell size={20} />
            </button>
            <button className="profile-nav-button">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="profile-content">
        <div className="profile-container">
          {/* User Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="profile-header"
          >
            <div className="profile-header-content">
              <div className="profile-avatar-container">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="profile-avatar"
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/user-profile/150/150`;
                  }}
                />
                <button className="profile-avatar-edit">
                  <Edit size={16} />
                </button>
              </div>
              
              <div className="profile-info">
                <h2 className="profile-name">{userData.name}</h2>
                <div className="profile-details">
                  <div className="profile-detail-item">
                    <Mail size={16} />
                    <span>{userData.email}</span>
                  </div>
                  <div className="profile-detail-item">
                    <Phone size={16} />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="profile-detail-item">
                    <MapPin size={16} />
                    <span>{userData.location}</span>
                  </div>
                  <div className="profile-detail-item">
                    <Calendar size={16} />
                    <span>Member since {userData.joinDate}</span>
                  </div>
                  <div className="profile-detail-item">
                    <Crown size={16} className="text-yellow-500" />
                    <span className="text-yellow-500 font-semibold">{userData.plan} Plan</span>
                  </div>
                  <div className="profile-detail-item">
                    <CreditCard size={16} />
                    <span>Next billing: {userData.nextBilling}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="profile-logout"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="profile-tabs">
            {['account', 'subscription', 'devices', 'history', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="profile-card">
                  <h3 className="profile-card-title">Account Information</h3>
                  <div className="profile-form">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <div className="profile-password-container">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          defaultValue="password123"
                          className="form-input profile-form-input-with-icon"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="profile-password-toggle"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleUpdateProfile}
                      className="profile-button"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'subscription' && (
              <motion.div
                key="subscription"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Billing Toggle */}
                <div className="profile-card">
                  <div className="billing-toggle">
                    <div className="billing-toggle-info">
                      <h3>Billing Cycle</h3>
                      <p>Save 16% with annual billing</p>
                    </div>
                    <div className="billing-toggle-buttons">
                      <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`billing-toggle-button ${billingCycle === 'monthly' ? 'active' : ''}`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setBillingCycle('annual')}
                        className={`billing-toggle-button ${billingCycle === 'annual' ? 'active' : ''}`}
                      >
                        Annual
                      </button>
                    </div>
                  </div>
                </div>

                {/* Plans */}
                <div className="plans-grid">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      className={`plan-card rounded-xl p-6 ${plan.color} ${
                        selectedPlan === plan.id ? 'selected' : ''
                      }`}
                    >
                      {plan.popular && (
                        <div className="plan-badge">
                          MOST POPULAR
                        </div>
                      )}
                      
                      <h3 className="plan-name">{plan.name}</h3>
                      <div className="plan-price">
                        <span className="plan-price-amount">${plan.price}</span>
                        <span className="plan-price-period">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                      
                      <div className="plan-features">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="plan-feature">
                            <Check size={16} />
                            {feature.substring(2)}
                          </div>
                        ))}
                        {plan.notIncluded.map((feature, index) => (
                          <div key={index} className="plan-feature not-included">
                            <X size={16} />
                            {feature.substring(2)}
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handlePlanChange(plan.id)}
                        className="plan-button"
                      >
                        {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'devices' && (
              <motion.div
                key="devices"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="profile-card">
                  <div className="devices-header">
                    <h3>Active Devices</h3>
                    <span>4 of 4 devices active</span>
                  </div>
                  
                  <div className="device-list">
                    {activeDevices.map((device, index) => (
                      <div key={index} className="device-item">
                        <div className="device-info">
                          <div className="device-icon">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div className="device-details">
                            <h4>{device.name}</h4>
                            <p>Last used: {device.lastUsed}</p>
                            <p className="device-location">📍 {device.location}</p>
                          </div>
                        </div>
                        <button className="device-signout">
                          Sign Out
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="device-warning">
                    <div className="device-warning-header">
                      <Users size={20} />
                      <span>Device Management</span>
                    </div>
                    <p className="device-warning-text">
                      You can manage your devices and sign out from any device remotely. Changes take effect immediately.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="profile-card">
                  <h3 className="profile-card-title">Watch History</h3>
                  
                  <div className="history-list">
                    {watchHistory.map((item, index) => (
                      <div key={index} className="history-item">
                        <div className="history-icon">
                          <Play size={16} />
                        </div>
                        <div className="history-info">
                          <h4 className="history-title">{item.title}</h4>
                          <p className="history-meta">{item.episode} • {item.time}</p>
                        </div>
                        {item.progress < 100 && (
                          <div className="history-progress">
                            <div className="progress">
                              <div 
                                className="progress-bar"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className="progress-text">{item.progress}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <button className="history-clear">
                    Clear Watch History
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="profile-card">
                  <h3 className="profile-card-title">Playback Settings</h3>
                  
                  <div className="profile-form">
                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Autoplay</h4>
                        <p>Automatically play next episode</p>
                      </div>
                      <button
                        onClick={() => setAutoPlay(!autoPlay)}
                        className={`toggle-switch ${autoPlay ? 'active' : ''}`}
                      >
                        <div className="toggle-switch-handle" />
                      </button>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Notifications</h4>
                        <p>Receive updates and recommendations</p>
                      </div>
                      <button
                        onClick={() => setNotifications(!notifications)}
                        className={`toggle-switch ${notifications ? 'active' : ''}`}
                      >
                        <div className="toggle-switch-handle" />
                      </button>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Download Quality</label>
                      <select
                        value={downloadQuality}
                        onChange={(e) => setDownloadQuality(e.target.value)}
                        className="form-input form-select"
                      >
                        <option value="low">Standard (480p)</option>
                        <option value="medium">High (720p)</option>
                        <option value="high">Premium (1080p)</option>
                        <option value="ultra">Ultra (4K)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="profile-card">
                  <h3 className="profile-card-title">Privacy & Security</h3>
                  
                  <div className="profile-form">
                    <button className="setting-item">
                      <span>Change Password</span>
                      <ChevronRight size={20} />
                    </button>
                    <button className="setting-item">
                      <span>Two-Factor Authentication</span>
                      <ChevronRight size={20} />
                    </button>
                    <button className="setting-item">
                      <span>Privacy Settings</span>
                      <ChevronRight size={20} />
                    </button>
                    <button className="setting-item">
                      <span>Download Your Data</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfileClean;
