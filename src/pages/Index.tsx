import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Fab, Typography, Container, Paper, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '@/components/TaskCard';
import AddTaskDialog from '@/components/AddTaskDialog';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Index = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete React Assignment',
      description: 'Build a task manager application using React and Material UI',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Study for Math Exam',
      description: 'Review chapters 5-8 on calculus and linear algebra',
      completed: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const displayTasks = tabValue === 0 ? tasks : tabValue === 1 ? pendingTasks : completedTasks;

  const tabIcons = [
    <ListAltIcon key="all" />,
    <PendingActionsIcon key="pending" />,
    <CheckCircleOutlineIcon key="completed" />
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              borderRadius: 5,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.1),
                0 0 80px rgba(var(--gradient-start-rgb) / 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.8)
              `,
              overflow: 'hidden',
              position: 'relative',
              mb: 4,
            }}
          >
            {/* Animated gradient border top */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 50%, hsl(var(--gradient-start)) 100%)',
                backgroundSize: '200% 100%',
                animation: 'gradientShift 3s ease infinite',
                '@keyframes gradientShift': {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              }}
            />

            <Box sx={{ p: 5, pb: 4 }}>
              {/* Header with icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(var(--gradient-start-rgb) / 0.4)',
                    mr: 2,
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ color: 'white', fontSize: 36 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h3" 
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      mb: 0.5,
                    }}
                  >
                    Task Manager
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'hsl(var(--muted-foreground))',
                      fontWeight: 500,
                    }}
                  >
                    Stay organized, stay productive
                  </Typography>
                </Box>
              </Box>

              {/* Stats chips */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    icon={<ListAltIcon />}
                    label={`${tasks.length} Total`}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      py: 2.5,
                      px: 1,
                      '& .MuiChip-icon': {
                        color: 'hsl(var(--primary))',
                      },
                    }}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    icon={<PendingActionsIcon />}
                    label={`${pendingTasks.length} Pending`}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      py: 2.5,
                      px: 1,
                      '& .MuiChip-icon': {
                        color: 'rgb(251, 191, 36)',
                      },
                    }}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    icon={<CheckCircleOutlineIcon />}
                    label={`${completedTasks.length} Done`}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      py: 2.5,
                      px: 1,
                      '& .MuiChip-icon': {
                        color: 'rgb(34, 197, 94)',
                      },
                    }}
                  />
                </motion.div>
              </Box>

              {/* Tabs */}
              <Tabs 
                value={tabValue} 
                onChange={(_, newValue) => setTabValue(newValue)}
                centered
                sx={{
                  '& .MuiTabs-flexContainer': {
                    gap: 1,
                  },
                  '& .MuiTab-root': {
                    color: 'hsl(var(--muted-foreground))',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    minHeight: 48,
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'white',
                      background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
                      boxShadow: '0 4px 12px rgba(var(--gradient-start-rgb) / 0.3)',
                    },
                    '&:hover:not(.Mui-selected)': {
                      background: 'hsl(var(--muted) / 0.5)',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    display: 'none',
                  },
                }}
              >
                <Tab 
                  icon={tabIcons[0]} 
                  iconPosition="start" 
                  label={`All Tasks (${tasks.length})`} 
                />
                <Tab 
                  icon={tabIcons[1]} 
                  iconPosition="start" 
                  label={`Pending (${pendingTasks.length})`} 
                />
                <Tab 
                  icon={tabIcons[2]} 
                  iconPosition="start" 
                  label={`Completed (${completedTasks.length})`} 
                />
              </Tabs>
            </Box>
          </Paper>
        </motion.div>

        {/* Tasks List */}
        <Box>
          {displayTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper 
                sx={{ 
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  p: 8,
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(var(--gradient-start-rgb) / 0.3)',
                  }}
                >
                  {tabValue === 1 ? (
                    <CheckCircleOutlineIcon sx={{ color: 'white', fontSize: 40 }} />
                  ) : tabValue === 2 ? (
                    <PendingActionsIcon sx={{ color: 'white', fontSize: 40 }} />
                  ) : (
                    <AddIcon sx={{ color: 'white', fontSize: 40 }} />
                  )}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'hsl(var(--foreground))',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {tabValue === 0 ? 'No tasks yet' : 
                   tabValue === 1 ? 'All caught up!' : 
                   'Nothing completed yet'}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'hsl(var(--muted-foreground))',
                    mb: 3,
                  }}
                >
                  {tabValue === 0 ? 'Click the + button to create your first task' : 
                   tabValue === 1 ? 'Great job! You have no pending tasks.' : 
                   'Start checking off tasks to see them here!'}
                </Typography>
              </Paper>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {displayTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    // variants={itemVariants}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <TaskCard 
                      task={task} 
                      onToggleComplete={handleToggleComplete}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Box>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Fab 
            color="primary"
            aria-label="add"
            onClick={() => setDialogOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
              width: 68,
              height: 68,
              boxShadow: `
                0 8px 24px rgba(var(--gradient-start-rgb) / 0.4),
                0 0 0 0 rgba(var(--gradient-start-rgb) / 0.4)
              `,
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              '@keyframes pulse-ring': {
                '0%': {
                  boxShadow: `
                    0 8px 24px rgba(var(--gradient-start-rgb) / 0.4),
                    0 0 0 0 rgba(var(--gradient-start-rgb) / 0.4)
                  `,
                },
                '50%': {
                  boxShadow: `
                    0 8px 24px rgba(var(--gradient-start-rgb) / 0.4),
                    0 0 0 20px rgba(var(--gradient-start-rgb) / 0)
                  `,
                },
                '100%': {
                  boxShadow: `
                    0 8px 24px rgba(var(--gradient-start-rgb) / 0.4),
                    0 0 0 0 rgba(var(--gradient-start-rgb) / 0)
                  `,
                },
              },
              '&:hover': {
                background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
                boxShadow: '0 12px 32px rgba(var(--gradient-start-rgb) / 0.5)',
              },
              '&:active': {
                boxShadow: '0 4px 16px rgba(var(--gradient-start-rgb) / 0.4)',
              },
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
        </motion.div>

        <AddTaskDialog 
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onAddTask={handleAddTask}
        />
      </Container>
    </Box>
  );
};

export default Index;


// import { useState } from 'react';
// import { Tabs, Tab, Box, Fab, Typography, Container, Paper } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import TaskCard from '@/components/TaskCard';
// import AddTaskDialog from '@/components/AddTaskDialog';
// import { AnimatePresence } from 'framer-motion';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
//   createdAt: string;
// }

// const Index = () => {
//   const [tasks, setTasks] = useState<Task[]>([
//     {
//       id: 1,
//       title: 'Complete React Assignment',
//       description: 'Build a task manager application using React and Material UI',
//       completed: false,
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       title: 'Study for Math Exam',
//       description: 'Review chapters 5-8 on calculus and linear algebra',
//       completed: true,
//       createdAt: new Date(Date.now() - 86400000).toISOString(),
//     },
//   ]);
//   const [tabValue, setTabValue] = useState(0);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleAddTask = (title: string, description: string) => {
//     const newTask: Task = {
//       id: Date.now(),
//       title,
//       description,
//       completed: false,
//       createdAt: new Date().toISOString(),
//     };
//     setTasks([newTask, ...tasks]);
//   };

//   const handleToggleComplete = (id: number) => {
//     setTasks(tasks.map(task => 
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const pendingTasks = tasks.filter(task => !task.completed);
//   const completedTasks = tasks.filter(task => task.completed);

//   const displayTasks = tabValue === 0 ? tasks : tabValue === 1 ? pendingTasks : completedTasks;

//   return (
//     <div 
//       className="min-h-screen py-8" 
//       style={{
//         background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
//       }}
//     >
//       <Container maxWidth="md">
//         <Paper 
//           elevation={4} 
//           className="p-6 mb-6"
//           sx={{ 
//             borderRadius: 4,
//             background: 'hsl(var(--background))',
//           }}
//         >
//           <Typography 
//             variant="h3" 
//             className="text-center font-bold mb-2 bg-clip-text text-transparent"
//             sx={{
//               backgroundImage: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             Student Task Manager
//           </Typography>
//           <Typography 
//             variant="subtitle1" 
//             className="text-center text-muted-foreground mb-4"
//           >
//             Organize your assignments and stay on top of your studies
//           </Typography>

//           <Tabs 
//             value={tabValue} 
//             onChange={(_, newValue) => setTabValue(newValue)}
//             centered
//             sx={{
//               '& .MuiTab-root': {
//                 color: 'hsl(var(--muted-foreground))',
//                 textTransform: 'none',
//                 fontSize: '1rem',
//                 fontWeight: 600,
//                 '&.Mui-selected': {
//                   color: 'hsl(var(--primary))',
//                 },
//               },
//               '& .MuiTabs-indicator': {
//                 backgroundColor: 'hsl(var(--primary))',
//                 height: 3,
//               },
//             }}
//           >
//             <Tab label={`All Tasks (${tasks.length})`} />
//             <Tab label={`Pending (${pendingTasks.length})`} />
//             <Tab label={`Completed (${completedTasks.length})`} />
//           </Tabs>
//         </Paper>

//         <Box className="mt-6">
//           {displayTasks.length === 0 ? (
//             <Paper 
//               className="p-12 text-center"
//               sx={{ 
//                 borderRadius: 4,
//                 background: 'hsl(var(--card))',
//               }}
//             >
//               <Typography variant="h6" className="text-muted-foreground">
//                 {tabValue === 0 ? 'No tasks yet. Click the + button to add one!' : 
//                  tabValue === 1 ? 'No pending tasks. Great job!' : 
//                  'No completed tasks yet. Keep going!'}
//               </Typography>
//             </Paper>
//           ) : (
//             <AnimatePresence>
//               {displayTasks.map(task => (
//                 <TaskCard 
//                   key={task.id} 
//                   task={task} 
//                   onToggleComplete={handleToggleComplete}
//                 />
//               ))}
//             </AnimatePresence>
//           )}
//         </Box>

//         <Fab 
//           color="primary"
//           aria-label="add"
//           onClick={() => setDialogOpen(true)}
//           sx={{
//             position: 'fixed',
//             bottom: 32,
//             right: 32,
//             background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
//             width: 64,
//             height: 64,
//             '&:hover': {
//               background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
//               opacity: 0.9,
//             },
//           }}
//         >
//           <AddIcon sx={{ fontSize: 32 }} />
//         </Fab>

//         <AddTaskDialog 
//           open={dialogOpen}
//           onClose={() => setDialogOpen(false)}
//           onAddTask={handleAddTask}
//         />
//       </Container>
//     </div>
//   );
// };

// export default Index;
