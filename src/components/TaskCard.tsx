import { Card, CardContent, Checkbox, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { motion } from 'framer-motion';

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, currentStatus: boolean) => void;
}

const TaskCard = ({ task, onToggleComplete }: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="mb-4 hover:shadow-lg transition-shadow duration-300 border border-border"
        sx={{ 
          borderRadius: 2,
          background: task.isCompleted 
            ? 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--accent)) 100%)' 
            : 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)',
        }}
      >
        <CardContent className="flex items-start gap-3 p-4">
          <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task._id, task.isCompleted)}
            sx={{
              color: 'hsl(var(--primary))',
              '&.Mui-checked': {
                color: 'hsl(var(--success))',
              },
              padding: 0,
              marginTop: '4px',
            }}
          />
          <div className="flex-1">
            <Typography 
              variant="h6" 
              className={`font-semibold ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}
              sx={{ fontSize: '1.125rem', marginBottom: '4px' }}
            >
              {task.title}
            </Typography>
            <Typography 
              variant="body2" 
              className={task.isCompleted ? 'text-muted-foreground' : 'text-muted-foreground'}
              sx={{ fontSize: '0.875rem', marginBottom: '8px' }}
            >
              {task.description}
            </Typography>
            <Typography 
              variant="caption" 
              className="text-muted-foreground"
              sx={{ fontSize: '0.75rem' }}
            >
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
