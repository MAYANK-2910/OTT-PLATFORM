import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info, Download, Share2, Heart, Play, Plus, Trash2, ThumbsUp, Eye, EyeOff } from 'lucide-react';
import '../styles/components.css';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, message, duration = 3000, title = '', actions = []) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      type,
      title: title || getDefaultTitle(type),
      message,
      duration,
      actions,
      timestamp: new Date()
    };
    
    setNotifications(prev => [...prev, notification]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  };

  const getDefaultTitle = (type) => {
    switch (type) {
      case 'success': return 'Success!';
      case 'error': return 'Error!';
      case 'warning': return 'Warning!';
      case 'info': return 'Info';
      default: return 'Notification';
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-600',
          icon: Check,
          iconColor: 'text-white'
        };
      case 'error':
        return {
          bg: 'bg-red-600',
          icon: X,
          iconColor: 'text-white'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-600',
          icon: AlertCircle,
          iconColor: 'text-white'
        };
      case 'info':
        return {
          bg: 'bg-blue-600',
          icon: Info,
          iconColor: 'text-white'
        };
      default:
        return {
          bg: 'bg-gray-600',
          icon: Info,
          iconColor: 'text-white'
        };
    }
  };

  // Make addNotification available globally
  useEffect(() => {
    window.showNotification = addNotification;
    return () => {
      delete window.showNotification;
    };
  }, []);

  return (
    <div className="notification-system">
      <AnimatePresence>
        {notifications.map((notification) => {
          const { icon: Icon } = getNotificationStyle(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`notification-toast ${notification.type}`}
              style={{
                animationDuration: `${notification.duration}ms`
              }}
            >
              <div className="notification-icon">
                <Icon size={14} />
              </div>
              
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
                
                {notification.actions && notification.actions.length > 0 && (
                  <div className="notification-actions">
                    {notification.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          action.onClick?.();
                          if (action.closeOnClick !== false) {
                            removeNotification(notification.id);
                          }
                        }}
                        className="notification-action-btn"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => removeNotification(notification.id)}
                className="notification-close-btn"
              >
                <X size={14} />
              </button>
              
              {notification.duration > 0 && (
                <div 
                  className="notification-progress"
                  style={{
                    animationDuration: `${notification.duration}ms`
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
