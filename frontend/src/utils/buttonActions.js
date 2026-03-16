import { useNavigate } from 'react-router-dom';

export const useButtonActions = () => {
  const navigate = useNavigate();

  const handlePlay = (item, itemType = 'movie') => {
    if (window.showNotification) {
      window.showNotification('info', `🎬 Starting ${item.title}...`);
    }
    
    // Simulate loading
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification('success', `▶️ Now playing: ${item.title}`, 2000);
      }
      navigate(`/watch/${item.id}`);
    }, 1000);
  };

  const handleAddToList = (item, isAdded = false) => {
    if (isAdded) {
      if (window.showNotification) {
        window.showNotification('warning', `🗑️ Removing ${item.title} from your list...`);
      }
      
      setTimeout(() => {
        if (window.showNotification) {
          window.showNotification('success', `✅ Removed ${item.title} from your list`, 2000);
        }
      }, 500);
    } else {
      if (window.showNotification) {
        window.showNotification('info', `➕ Adding ${item.title} to your list...`);
      }
      
      setTimeout(() => {
        if (window.showNotification) {
          window.showNotification('success', `✅ Added ${item.title} to your list`, 2000);
        }
      }, 500);
    }
  };

  const handleLike = (item) => {
    if (window.showNotification) {
      window.showNotification(
        'success', 
        `❤️ You liked "${item.title || item.name}"!`, 
        3000,
        'Content Liked',
        [
          {
            label: 'Share',
            onClick: () => {
              if (window.showNotification) {
                window.showNotification('info', '� Share link copied!', 2000);
              }
            }
          }
        ]
      );
    }
  };

  const handleInfo = (item) => {
    if (window.showNotification) {
      window.showNotification(
        'info', 
        `ℹ️ Loading details for "${item.title || item.name}"...`, 
        2000,
        'Loading Information'
      );
    }
  };

  const handleDownload = (item) => {
    if (window.showNotification) {
      window.showNotification(
        'success', 
        `📥 "${item.title || item.name}" downloading for offline viewing...`, 
        5000,
        'Download Started',
        [
          {
            label: 'View Downloads',
            onClick: () => {
              if (window.showNotification) {
                window.showNotification('info', '� Opening downloads...', 2000);
              }
            }
          },
          {
            label: 'Cancel',
            onClick: () => {
              if (window.showNotification) {
                window.showNotification('warning', '❌ Download cancelled', 2000);
              }
            }
          }
        ]
      );
    }
    
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification('info', `📥 Downloading ${item.title || item.name}... 75%`);
      }
    }, 3000);
    
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification('success', `✅ ${item.title || item.name} downloaded successfully!`, 3000);
      }
    }, 4000);
  };

  const handleShare = (item) => {
    if (window.showNotification) {
      window.showNotification('info', `🔗 Preparing share link for ${item.title || item.name}...`);
    }
    
    setTimeout(() => {
      // Simulate copying to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`Check out ${item.title || item.name}! https://streamflix.com/watch/${item.id}`);
      }
      
      if (window.showNotification) {
        window.showNotification(
          'info', 
          `🔗 Share link copied for "${item.title || item.name}"!`, 
          3000,
          'Link Copied',
          [
            {
              label: 'Share Again',
              onClick: () => {
                if (window.showNotification) {
                  window.showNotification('success', '✅ Link copied again!', 2000);
                }
              }
            }
          ]
        );
      }
    }, 800);
  };

  const handleMarkWatched = (item, isWatched = false) => {
    if (isWatched) {
      if (window.showNotification) {
        window.showNotification('warning', `👁️ Marking ${item.title} as unwatched...`);
      }
      
      setTimeout(() => {
        if (window.showNotification) {
          window.showNotification('info', `📝 ${item.title} marked as unwatched`, 2000);
        }
      }, 500);
    } else {
      if (window.showNotification) {
        window.showNotification('info', `✅ Marking ${item.title} as watched...`);
      }
      
      setTimeout(() => {
        if (window.showNotification) {
          window.showNotification('success', `👁️ ${item.title} marked as watched!`, 2000);
        }
      }, 500);
    }
  };

  const handleBulkActions = (action, items, count) => {
    switch (action) {
      case 'delete':
        if (window.showNotification) {
          window.showNotification('warning', `🗑️ Removing ${count} items from your list...`);
        }
        
        setTimeout(() => {
          if (window.showNotification) {
            window.showNotification('success', `✅ Removed ${count} items from your list`, 3000);
          }
        }, 1000);
        break;
        
      case 'download':
        if (window.showNotification) {
          window.showNotification('info', `⬇️ Preparing downloads for ${count} items...`);
        }
        
        setTimeout(() => {
          if (window.showNotification) {
            window.showNotification('success', `📥 Started downloading ${count} items`, 3000);
          }
        }, 1500);
        break;
        
      case 'share':
        if (window.showNotification) {
          window.showNotification('info', `🔗 Preparing share links for ${count} items...`);
        }
        
        setTimeout(() => {
          if (window.showNotification) {
            window.showNotification('success', `🔗 Share links ready for ${count} items`, 3000);
          }
        }, 1000);
        break;
        
      default:
        break;
    }
  };

  const handleNavigation = (path, pageName) => {
    if (window.showNotification) {
      window.showNotification('info', `🧭 Navigating to ${pageName}...`);
    }
    
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const handleSearch = (query) => {
    if (window.showNotification) {
      window.showNotification('info', `🔍 Searching for "${query}"...`);
    }
    
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification('success', `🎯 Found results for "${query}"`, 2000);
      }
    }, 800);
  };

  const handleFilter = (filterType, filterValue) => {
    if (window.showNotification) {
      window.showNotification('info', `🎭 Applying ${filterType}: ${filterValue}...`);
    }
    
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification('success', `✅ Filter applied: ${filterValue}`, 2000);
      }
    }, 500);
  };

  const handleSort = (sortBy) => {
    if (window.showNotification) {
      window.showNotification('info', `📊 Sorting by ${sortBy}...`);
    }
    
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification('success', `📋 Sorted by ${sortBy}`, 2000);
      }
    }, 500);
  };

  const handleError = (action, item) => {
    if (window.showNotification) {
      window.showNotification('error', `❌ Failed to ${action} ${item.title}. Please try again.`);
    }
  };

  const handleWarning = (message) => {
    if (window.showNotification) {
      window.showNotification('warning', `⚠️ ${message}`);
    }
  };

  return {
    handlePlay,
    handleAddToList,
    handleLike,
    handleInfo,
    handleDownload,
    handleShare,
    handleMarkWatched,
    handleBulkActions,
    handleNavigation,
    handleSearch,
    handleFilter,
    handleSort,
    handleError,
    handleWarning
  };
};
