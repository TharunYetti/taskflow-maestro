import { useState } from 'react';
import { Tabs, Tab, Box, Fab, Typography, Container, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '@/components/TaskCard';
import AddTaskDialog from '@/components/AddTaskDialog';
import { AnimatePresence } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
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

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const displayTasks = tabValue === 0 ? tasks : tabValue === 1 ? pendingTasks : completedTasks;

  return (
    <div 
      className="min-h-screen py-8" 
      style={{
        background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
      }}
    >
      <Container maxWidth="md">
        <Paper 
          elevation={4} 
          className="p-6 mb-6"
          sx={{ 
            borderRadius: 4,
            background: 'hsl(var(--background))',
          }}
        >
          <Typography 
            variant="h3" 
            className="text-center font-bold mb-2 bg-clip-text text-transparent"
            sx={{
              backgroundImage: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Student Task Manager
          </Typography>
          <Typography 
            variant="subtitle1" 
            className="text-center text-muted-foreground mb-4"
          >
            Organize your assignments and stay on top of your studies
          </Typography>

          <Tabs 
            value={tabValue} 
            onChange={(_, newValue) => setTabValue(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                color: 'hsl(var(--muted-foreground))',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                '&.Mui-selected': {
                  color: 'hsl(var(--primary))',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'hsl(var(--primary))',
                height: 3,
              },
            }}
          >
            <Tab label={`All Tasks (${tasks.length})`} />
            <Tab label={`Pending (${pendingTasks.length})`} />
            <Tab label={`Completed (${completedTasks.length})`} />
          </Tabs>
        </Paper>

        <Box className="mt-6">
          {displayTasks.length === 0 ? (
            <Paper 
              className="p-12 text-center"
              sx={{ 
                borderRadius: 4,
                background: 'hsl(var(--card))',
              }}
            >
              <Typography variant="h6" className="text-muted-foreground">
                {tabValue === 0 ? 'No tasks yet. Click the + button to add one!' : 
                 tabValue === 1 ? 'No pending tasks. Great job!' : 
                 'No completed tasks yet. Keep going!'}
              </Typography>
            </Paper>
          ) : (
            <AnimatePresence>
              {displayTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </AnimatePresence>
          )}
        </Box>

        <Fab 
          color="primary"
          aria-label="add"
          onClick={() => setDialogOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
            width: 64,
            height: 64,
            '&:hover': {
              background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
              opacity: 0.9,
            },
          }}
        >
          <AddIcon sx={{ fontSize: 32 }} />
        </Fab>

        <AddTaskDialog 
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onAddTask={handleAddTask}
        />
      </Container>
    </div>
  );
};

export default Index;
