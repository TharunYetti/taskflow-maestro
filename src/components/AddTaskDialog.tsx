import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button,
  Box,
  IconButton,
  Fade,
  Zoom,
  CircularProgress,
  Alert
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AddTaskDialog = ({ open, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocused, setIsFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Option 1: Using fetch API
      const response = await fetch('http://localhost:3000/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization if needed
          // 'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim()
        })
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      
      setSuccess(true);
      
      // Call parent callback with the created task
      if (onAddTask) {
        onAddTask();
      }

      // Reset form after short delay to show success
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setSuccess(false);
        onClose();
      }, 1500);

    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.message || 'Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey && !loading) {
      handleSubmit();
    }
  };

  const handleClose = () => {
    if (!loading) {
      setTitle('');
      setDescription('');
      setError(null);
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Zoom}
      transitionDuration={300}
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid hsl(var(--border) / 0.3)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 0 80px rgba(var(--gradient-start-rgb) / 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
            opacity: 0.8,
          },
        }
      }}
    >
      {/* Animated background glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, hsl(var(--gradient-start) / 0.05) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
          pointerEvents: 'none',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
            '50%': { opacity: 0.5, transform: 'scale(1.05)' },
          },
        }}
      />

      <DialogTitle 
        className="text-foreground"
        sx={{ 
          fontWeight: 700,
          fontSize: '1.75rem',
          paddingTop: 4,
          paddingBottom: 2,
          paddingX: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(var(--gradient-start-rgb) / 0.3)',
            }}
          >
            <AddIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <span>Add New Task</span>
        </Box>
        <IconButton
          onClick={handleClose}
          disabled={loading}
          sx={{
            color: 'hsl(var(--muted-foreground))',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: 'hsl(var(--foreground))',
              background: 'hsl(var(--muted) / 0.5)',
              transform: 'rotate(90deg)',
            },
            '&.Mui-disabled': {
              color: 'hsl(var(--muted-foreground) / 0.5)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ paddingX: 3, paddingY: 3, position: 'relative', zIndex: 1 }}>
        <Fade in={open} timeout={500}>
          <Box>
            {/* Success Alert */}
            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  marginBottom: 2,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    color: 'hsl(var(--gradient-start))',
                  },
                }}
              >
                Task created successfully!
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert 
                severity="error" 
                onClose={() => setError(null)}
                sx={{ 
                  marginBottom: 2,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              placeholder="Enter a descriptive title..."
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocused('title')}
              onBlur={() => setIsFocused(null)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              sx={{
                marginTop: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'hsl(var(--background) / 0.5)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '& fieldset': {
                    borderColor: 'hsl(var(--border) / 0.5)',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: 'hsl(var(--primary) / 0.6)',
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.1)',
                  },
                  '&.Mui-focused': {
                    background: 'hsl(var(--background) / 0.7)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    '& fieldset': {
                      borderColor: 'hsl(var(--primary))',
                      boxShadow: '0 0 30px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'hsl(var(--muted-foreground))',
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: 'hsl(var(--primary))',
                    fontWeight: 600,
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'hsl(var(--foreground))',
                  fontSize: '1rem',
                  padding: '14px',
                },
              }}
            />
            
            <TextField
              margin="dense"
              label="Task Description"
              placeholder="Add details about this task..."
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setIsFocused('description')}
              onBlur={() => setIsFocused(null)}
              disabled={loading}
              sx={{
                marginTop: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'hsl(var(--background) / 0.5)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '& fieldset': {
                    borderColor: 'hsl(var(--border) / 0.5)',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: 'hsl(var(--primary) / 0.6)',
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.1)',
                  },
                  '&.Mui-focused': {
                    background: 'hsl(var(--background) / 0.7)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    '& fieldset': {
                      borderColor: 'hsl(var(--primary))',
                      boxShadow: '0 0 30px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'hsl(var(--muted-foreground))',
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: 'hsl(var(--primary))',
                    fontWeight: 600,
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'hsl(var(--foreground))',
                  fontSize: '1rem',
                },
              }}
            />
          </Box>
        </Fade>
      </DialogContent>

      <DialogActions sx={{ padding: '16px 24px', paddingBottom: 3, position: 'relative', zIndex: 1 }}>
        <Button 
          onClick={handleClose}
          disabled={loading}
          sx={{ 
            color: 'hsl(var(--muted-foreground))',
            textTransform: 'none',
            fontSize: '1rem',
            paddingX: 3,
            paddingY: 1.5,
            borderRadius: 2,
            fontWeight: 500,
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'hsl(var(--muted) / 0.5)',
              color: 'hsl(var(--foreground))',
            },
            '&.Mui-disabled': {
              color: 'hsl(var(--muted-foreground) / 0.5)',
            },
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!title.trim() || loading}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
            color: 'white',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(var(--gradient-start-rgb) / 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              transition: 'left 0.5s ease',
            },
            '&:hover:not(.Mui-disabled)': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(var(--gradient-start-rgb) / 0.4)',
              '&::before': {
                left: '100%',
              },
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            '&.Mui-disabled': {
              background: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
              boxShadow: 'none',
            },
          }}
        >
          {loading ? 'Creating...' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;


// import { 
//   Dialog, 
//   DialogTitle, 
//   DialogContent, 
//   DialogActions, 
//   TextField, 
//   Button,
//   Box,
//   IconButton,
//   Fade,
//   Zoom
// } from '@mui/material';
// import { useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import CloseIcon from '@mui/icons-material/Close';

// const AddTaskDialog = ({ open, onClose, onAddTask }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [isFocused, setIsFocused] = useState(null);

//   const handleSubmit = () => {
//     if (title.trim()) {
//       onAddTask(title, description);
//       setTitle('');
//       setDescription('');
//       onClose();
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && e.ctrlKey) {
//       handleSubmit();
//     }
//   };

//   return (
//     <Dialog 
//       open={open} 
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       TransitionComponent={Zoom}
//       transitionDuration={300}
//       PaperProps={{
//         sx: {
//           borderRadius: 4,
//           background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.95) 100%)',
//           backdropFilter: 'blur(20px)',
//           border: '1px solid hsl(var(--border) / 0.3)',
//           boxShadow: `
//             0 8px 32px rgba(0, 0, 0, 0.12),
//             0 0 80px rgba(var(--gradient-start-rgb) / 0.1),
//             inset 0 1px 0 rgba(255, 255, 255, 0.05)
//           `,
//           position: 'relative',
//           overflow: 'hidden',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: 'linear-gradient(90deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
//             opacity: 0.8,
//           },
//         }
//       }}
//     >
//       {/* Animated background glow */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '-50%',
//           left: '-50%',
//           width: '200%',
//           height: '200%',
//           background: 'radial-gradient(circle, hsl(var(--gradient-start) / 0.05) 0%, transparent 70%)',
//           animation: 'pulse 4s ease-in-out infinite',
//           pointerEvents: 'none',
//           '@keyframes pulse': {
//             '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
//             '50%': { opacity: 0.5, transform: 'scale(1.05)' },
//           },
//         }}
//       />

//       <DialogTitle 
//         className="text-foreground"
//         sx={{ 
//           fontWeight: 700,
//           fontSize: '1.75rem',
//           paddingTop: 4,
//           paddingBottom: 2,
//           paddingX: 3,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           position: 'relative',
//           zIndex: 1,
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Box
//             sx={{
//               width: 48,
//               height: 48,
//               borderRadius: 2,
//               background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               boxShadow: '0 4px 16px rgba(var(--gradient-start-rgb) / 0.3)',
//             }}
//           >
//             <AddIcon sx={{ color: 'white', fontSize: 28 }} />
//           </Box>
//           <span>Add New Task</span>
//         </Box>
//         <IconButton
//           onClick={onClose}
//           sx={{
//             color: 'hsl(var(--muted-foreground))',
//             transition: 'all 0.2s ease',
//             '&:hover': {
//               color: 'hsl(var(--foreground))',
//               background: 'hsl(var(--muted) / 0.5)',
//               transform: 'rotate(90deg)',
//             },
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent sx={{ paddingX: 3, paddingY: 3, position: 'relative', zIndex: 1 }}>
//         <Fade in={open} timeout={500}>
//           <Box>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Task Title"
//               placeholder="Enter a descriptive title..."
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onFocus={() => setIsFocused('title')}
//               onBlur={() => setIsFocused(null)}
//               onKeyPress={handleKeyPress}
//               sx={{
//                 marginTop: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   background: 'hsl(var(--background) / 0.5)',
//                   backdropFilter: 'blur(10px)',
//                   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                   '& fieldset': {
//                     borderColor: 'hsl(var(--border) / 0.5)',
//                     borderWidth: '2px',
//                     transition: 'all 0.3s ease',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: 'hsl(var(--primary) / 0.6)',
//                     boxShadow: '0 0 20px hsl(var(--primary) / 0.1)',
//                   },
//                   '&.Mui-focused': {
//                     background: 'hsl(var(--background) / 0.7)',
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
//                     '& fieldset': {
//                       borderColor: 'hsl(var(--primary))',
//                       boxShadow: '0 0 30px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
//                     },
//                   },
//                 },
//                 '& .MuiInputLabel-root': {
//                   color: 'hsl(var(--muted-foreground))',
//                   fontWeight: 500,
//                   '&.Mui-focused': {
//                     color: 'hsl(var(--primary))',
//                     fontWeight: 600,
//                   },
//                 },
//                 '& .MuiInputBase-input': {
//                   color: 'hsl(var(--foreground))',
//                   fontSize: '1rem',
//                   padding: '14px',
//                 },
//               }}
//             />
            
//             <TextField
//               margin="dense"
//               label="Task Description"
//               placeholder="Add details about this task..."
//               type="text"
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               onFocus={() => setIsFocused('description')}
//               onBlur={() => setIsFocused(null)}
//               sx={{
//                 marginTop: 3,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   background: 'hsl(var(--background) / 0.5)',
//                   backdropFilter: 'blur(10px)',
//                   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                   '& fieldset': {
//                     borderColor: 'hsl(var(--border) / 0.5)',
//                     borderWidth: '2px',
//                     transition: 'all 0.3s ease',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: 'hsl(var(--primary) / 0.6)',
//                     boxShadow: '0 0 20px hsl(var(--primary) / 0.1)',
//                   },
//                   '&.Mui-focused': {
//                     background: 'hsl(var(--background) / 0.7)',
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
//                     '& fieldset': {
//                       borderColor: 'hsl(var(--primary))',
//                       boxShadow: '0 0 30px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
//                     },
//                   },
//                 },
//                 '& .MuiInputLabel-root': {
//                   color: 'hsl(var(--muted-foreground))',
//                   fontWeight: 500,
//                   '&.Mui-focused': {
//                     color: 'hsl(var(--primary))',
//                     fontWeight: 600,
//                   },
//                 },
//                 '& .MuiInputBase-input': {
//                   color: 'hsl(var(--foreground))',
//                   fontSize: '1rem',
//                 },
//               }}
//             />

//             <Box
//               sx={{
//                 marginTop: 2,
//                 padding: 2,
//                 borderRadius: 2,
//                 background: 'hsl(var(--muted) / 0.3)',
//                 border: '1px solid hsl(var(--border) / 0.3)',
//                 fontSize: '0.875rem',
//                 color: 'hsl(var(--muted-foreground))',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//               }}
//             >
//               <Box
//                 component="kbd"
//                 sx={{
//                   padding: '2px 6px',
//                   borderRadius: 1,
//                   background: 'hsl(var(--background))',
//                   border: '1px solid hsl(var(--border))',
//                   fontSize: '0.75rem',
//                   fontFamily: 'monospace',
//                 }}
//               >
//                 Ctrl
//               </Box>
//               +
//               <Box
//                 component="kbd"
//                 sx={{
//                   padding: '2px 6px',
//                   borderRadius: 1,
//                   background: 'hsl(var(--background))',
//                   border: '1px solid hsl(var(--border))',
//                   fontSize: '0.75rem',
//                   fontFamily: 'monospace',
//                 }}
//               >
//                 Enter
//               </Box>
//               to add task quickly
//             </Box>
//           </Box>
//         </Fade>
//       </DialogContent>

//       <DialogActions sx={{ padding: '16px 24px', paddingBottom: 3, position: 'relative', zIndex: 1 }}>
//         <Button 
//           onClick={onClose}
//           sx={{ 
//             color: 'hsl(var(--muted-foreground))',
//             textTransform: 'none',
//             fontSize: '1rem',
//             paddingX: 3,
//             paddingY: 1.5,
//             borderRadius: 2,
//             fontWeight: 500,
//             transition: 'all 0.2s ease',
//             '&:hover': {
//               background: 'hsl(var(--muted) / 0.5)',
//               color: 'hsl(var(--foreground))',
//             },
//           }}
//         >
//           Cancel
//         </Button>
//         <Button 
//           onClick={handleSubmit}
//           disabled={!title.trim()}
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
//             color: 'white',
//             textTransform: 'none',
//             fontSize: '1rem',
//             fontWeight: 600,
//             paddingX: 4,
//             paddingY: 1.5,
//             borderRadius: 2,
//             position: 'relative',
//             overflow: 'hidden',
//             boxShadow: '0 4px 16px rgba(var(--gradient-start-rgb) / 0.3)',
//             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//             '&::before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               left: '-100%',
//               width: '100%',
//               height: '100%',
//               background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
//               transition: 'left 0.5s ease',
//             },
//             '&:hover': {
//               transform: 'translateY(-2px)',
//               boxShadow: '0 8px 24px rgba(var(--gradient-start-rgb) / 0.4)',
//               '&::before': {
//                 left: '100%',
//               },
//             },
//             '&:active': {
//               transform: 'translateY(0)',
//             },
//             '&.Mui-disabled': {
//               background: 'hsl(var(--muted))',
//               color: 'hsl(var(--muted-foreground))',
//               boxShadow: 'none',
//             },
//           }}
//         >
//           Add Task
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddTaskDialog;


