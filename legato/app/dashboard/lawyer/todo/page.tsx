'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle, Circle, Clock, AlertCircle, 
  Plus, Filter, Calendar, Tag,
  MessageSquare, FileText, User
} from 'lucide-react';

interface TodoItem {
  id: number;
  task: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
  client?: string;
  category: 'client' | 'admin' | 'research' | 'document';
  completed: boolean;
}

export default function LawyerTodoPage() {
  const [newTask, setNewTask] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, task: 'Review Smith contract', priority: 'high', due: 'Today', client: 'John Smith', category: 'document', completed: false },
    { id: 2, task: 'Prepare for court hearing', priority: 'high', due: 'Tomorrow', client: 'Maria Garcia', category: 'client', completed: false },
    { id: 3, task: 'Send documents to Anderson', priority: 'medium', due: 'Mar 22', client: 'Robert Anderson', category: 'admin', completed: true },
    { id: 4, task: 'Research case law', priority: 'low', due: 'Mar 25', category: 'research', completed: false },
    { id: 5, task: 'Update client database', priority: 'medium', due: 'Mar 28', category: 'admin', completed: false },
    { id: 6, task: 'Call back potential client', priority: 'medium', due: 'Today', category: 'client', completed: false },
    { id: 7, task: 'Draft settlement agreement', priority: 'high', due: 'Mar 20', client: 'Sarah Johnson', category: 'document', completed: true },
  ]);

  const categories = [
    { id: 'all', name: 'All Tasks', icon: Filter },
    { id: 'client', name: 'Client Work', icon: User },
    { id: 'document', name: 'Documents', icon: FileText },
    { id: 'research', name: 'Research', icon: AlertCircle },
    { id: 'admin', name: 'Administrative', icon: MessageSquare },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'client': return <User className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'research': return <AlertCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    const newTodo: TodoItem = {
      id: Date.now(),
      task: newTask,
      priority: selectedPriority,
      due: 'Today',
      category: 'admin',
      completed: false,
    };
    
    setTodos([newTodo, ...todos]);
    setNewTask('');
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTask = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const filteredTodos = todos.filter(todo => 
    selectedCategory === 'all' || todo.category === selectedCategory
  );

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.filter(t => !t.completed).length;

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">To-Do List</h1>
            <p className="text-gray-600">Manage your tasks and stay organized</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="success" className="text-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              {completedCount} Completed
            </Badge>
            <Badge variant="warning" className="text-sm">
              <Clock className="h-3 w-3 mr-1" />
              {pendingCount} Pending
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold mt-2">{todos.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold mt-2">{completedCount}</p>
                </div>
                <Badge variant="success">{Math.round((completedCount / todos.length) * 100)}%</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold mt-2">
                    {todos.filter(t => t.priority === 'high' && !t.completed).length}
                  </p>
                </div>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Task */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        placeholder="What needs to be done?"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                      />
                    </div>
                    <Select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value as any)}
                      options={[
                        { value: 'low', label: 'Low Priority' },
                        { value: 'medium', label: 'Medium Priority' },
                        { value: 'high', label: 'High Priority' },
                      ]}
                      className="w-40"
                    />
                    <Button onClick={handleAddTask}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tasks</CardTitle>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={categories.map(cat => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    className="w-40"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
                    <p className="text-gray-600">No tasks found in this category</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          todo.completed ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleToggleComplete(todo.id)}
                            className="text-gray-400 hover:text-black"
                          >
                            {todo.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </button>
                          <div>
                            <p className={`font-medium ${
                              todo.completed ? 'line-through text-gray-500' : ''
                            }`}>
                              {todo.task}
                            </p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                getPriorityColor(todo.priority)
                              )}>
                                {todo.priority}
                              </span>
                              <div className="flex items-center text-gray-500 text-sm">
                                {getCategoryIcon(todo.category)}
                                <span className="ml-1 capitalize">{todo.category}</span>
                              </div>
                              {todo.client && (
                                <div className="flex items-center text-gray-500 text-sm">
                                  <User className="h-3 w-3 mr-1" />
                                  {todo.client}
                                </div>
                              )}
                              <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="h-3 w-3 mr-1" />
                                {todo.due}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!todo.completed && (
                            <Button variant="ghost" size="sm">
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(todo.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                        selectedCategory === category.id
                          ? 'bg-black text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <category.icon className="h-4 w-4 mr-3" />
                        <span>{category.name}</span>
                      </div>
                      <Badge variant={selectedCategory === category.id ? "secondary" : "outline"}>
                        {todos.filter(t => category.id === 'all' || t.category === category.id).length}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Priority Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Priority Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      <span>High Priority</span>
                    </div>
                    <div className="font-semibold">
                      {todos.filter(t => t.priority === 'high' && !t.completed).length}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span>Medium Priority</span>
                    </div>
                    <div className="font-semibold">
                      {todos.filter(t => t.priority === 'medium' && !t.completed).length}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Low Priority</span>
                    </div>
                    <div className="font-semibold">
                      {todos.filter(t => t.priority === 'low' && !t.completed).length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todos
                    .filter(t => !t.completed)
                    .sort((a, b) => {
                      const dueOrder = { 'Today': 0, 'Tomorrow': 1, 'Mar 22': 2, 'Mar 25': 3, 'Mar 28': 4 };
                      return (dueOrder[a.due as keyof typeof dueOrder] || 5) - (dueOrder[b.due as keyof typeof dueOrder] || 5);
                    })
                    .slice(0, 3)
                    .map((todo) => (
                      <div key={todo.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{todo.task}</p>
                          <p className="text-gray-500 text-xs mt-1">{todo.client || 'General'}</p>
                        </div>
                        <Badge variant={todo.priority === 'high' ? 'error' : todo.priority === 'medium' ? 'warning' : 'success'}>
                          {todo.due}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Add missing import
import { cn } from '@/lib/utils';