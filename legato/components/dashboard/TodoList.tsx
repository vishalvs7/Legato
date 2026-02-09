import React from 'react';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItem {
  id: number;
  task: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
  completed?: boolean;
}

interface TodoListProps {
  items: TodoItem[];
}

export function TodoList({ items }: TodoListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex items-center justify-between p-3 border rounded-lg",
            item.completed ? "bg-gray-50" : "bg-white"
          )}
        >
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-black">
              {item.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div>
              <p className={cn(
                "font-medium",
                item.completed && "line-through text-gray-500"
              )}>
                {item.task}
              </p>
              <div className="flex items-center space-x-3 mt-1">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  getPriorityColor(item.priority)
                )}>
                  {item.priority}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.due}
                </div>
              </div>
            </div>
          </div>
          {!item.completed && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <AlertCircle className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}