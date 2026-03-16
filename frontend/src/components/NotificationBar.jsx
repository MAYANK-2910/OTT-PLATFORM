import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  Gift, 
  Star, 
  Crown, 
  Play, 
  Download, 
  Heart, 
  Users, 
  Calendar,
  TrendingUp,
  Film,
  Tv,
  Clock,
  Settings,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import '../styles/notification-bar.css';

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  // Sample notifications
  const sampleNotifications = [
    {
      id: 1,
      type: 'new_episode',
      title: 'New Episode Available',
      message: 'Stranger Things S5E1 is now available',
      time: '2 hours ago',
      read: false,
      icon: Play,
      color: 'text-red-500',
      action: 'Watch Now'
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Recommended for You',
      message: 'Based on your viewing history, you might love "The Bear"',
      time: '5 hours ago',
      read: false,
      icon: Star,
      color: 'text-yellow-500',
      action: 'View Details'
    },
    {
      id: 3,
      type: 'download_complete',
      title: 'Download Complete',
      message: 'The Crown S6 has been downloaded for offline viewing',
      time: '1 day ago',
      read: true,
      icon: Download,
      color: 'text-green-500',
      action: 'View'
    },
    {
      id: 4,
      type: 'premium_benefit',
      title: 'Premium Benefit',
      message: 'Unlock 4K streaming and downloads on 6 devices',
      time: '2 days ago',
      read: true,
      icon: Crown,
      color: 'text-purple-500',
      action: 'Upgrade'
    },
    {
      id: 5,
      type: 'social',
      title: 'Friend Activity',
      message: 'Sarah started watching "Breaking Bad"',
      time: '3 days ago',
      read: true,
      icon: Users,
      color: 'text-blue-500',
      action: 'View Profile'
    },
    {
      id: 6,
      type: 'system',
      title: 'Account Update',
      message: 'Your subscription will renew on March 15, 2024',
      time: '1 week ago',
      read: true,
      icon: Calendar,
      color: 'text-gray-400',
      action: 'Manage'
    }
  ];

  useEffect(() => {
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setIsOpen(false);
    
    // Handle different notification actions
    switch (notification.type) {
      case 'new_episode':
        if (window.showNotification) {
          window.showNotification('info', `🎬 Opening ${notification.message}...`);
        }
        break;
      case 'recommendation':
        if (window.showNotification) {
          window.showNotification('info', `🎯 Loading recommendations...`);
        }
        break;
      case 'download_complete':
        if (window.showNotification) {
          window.showNotification('success', `📱 Opening downloads...`);
        }
        break;
      case 'premium_benefit':
        if (window.showNotification) {
          window.showNotification('info', `💎 Opening premium plans...`);
        }
        break;
      default:
        break;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_episode': return Play;
      case 'recommendation': return Star;
      case 'download_complete': return Download;
      case 'premium_benefit': return Crown;
      case 'social': return Users;
      case 'system': return Calendar;
      default: return Bell;
    }
  };

  const timeAgo = (timeString) => {
    // Simple time ago parser - in real app, use proper date library
    return timeString;
  };

  return (
    <div className="notification-bar" ref={notificationRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="profile-nav-button"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="notification-dropdown"
          >
            {/* Header */}
            <div className="notification-header">
              <h3>Notifications</h3>
              <div className="notification-header-actions">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={clearAll}
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="notification-empty">
                  <Bell size={48} className="empty-icon" />
                  <p className="empty-title">No notifications yet</p>
                  <p className="empty-message">We'll notify you about important updates</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`notification-item ${!notification.read ? 'unread' : 'read'}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="notification-content">
                          <div className={`notification-icon ${notification.color}`}>
                            <IconComponent size={16} />
                          </div>
                          
                          <div className="notification-text">
                            <div className="notification-title">
                              <h4>{notification.title}</h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="notification-close"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            
                            <p className="notification-message">
                              {notification.message}
                            </p>
                            
                            <div className="notification-footer">
                              <span className="notification-time">
                                {timeAgo(notification.time)}
                              </span>
                              
                              {notification.action && (
                                <button className="notification-action">
                                  {notification.action}
                                  <ChevronRight size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="notification-footer-bar">
              <button>
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBar;
