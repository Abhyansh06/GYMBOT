import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, Copy, Save, Settings, Target, Dumbbell, UtensilsCrossed, RotateCcw, CheckCircle, AlertTriangle, Users, Filter, Search, Download, Upload } from 'lucide-react';

const AdvancedScheduling = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleType, setScheduleType] = useState<'workout' | 'meal'>('workout');

  // Workout Templates
  const [workoutTemplates, setWorkoutTemplates] = useState([
    {
      id: 1,
      name: 'Chest & Triceps Power',
      category: 'Strength',
      duration: '60 min',
      difficulty: 'Intermediate',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '6-8', weight: '75kg', restTime: '2-3 min' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', weight: '30kg', restTime: '90 sec' },
        { name: 'Chest Flyes', sets: 3, reps: '12-15', weight: '20kg', restTime: '60 sec' },
        { name: 'Tricep Dips', sets: 3, reps: '10-12', weight: 'Bodyweight', restTime: '60 sec' },
        { name: 'Close-Grip Bench Press', sets: 3, reps: '8-10', weight: '50kg', restTime: '90 sec' },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', weight: '25kg', restTime: '45 sec' }
      ],
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      equipment: ['Barbell', 'Dumbbells', 'Cable Machine'],
      notes: 'Focus on controlled movements and full range of motion'
    },
    {
      id: 2,
      name: 'Back & Biceps Blast',
      category: 'Strength',
      duration: '55 min',
      difficulty: 'Intermediate',
      exercises: [
        { name: 'Deadlifts', sets: 4, reps: '5-6', weight: '90kg', restTime: '3 min' },
        { name: 'Pull-ups', sets: 3, reps: '8-10', weight: 'Bodyweight', restTime: '2 min' },
        { name: 'Barbell Rows', sets: 3, reps: '8-10', weight: '60kg', restTime: '90 sec' },
        { name: 'Lat Pulldowns', sets: 3, reps: '10-12', weight: '45kg', restTime: '60 sec' },
        { name: 'Barbell Curls', sets: 3, reps: '10-12', weight: '25kg', restTime: '60 sec' },
        { name: 'Hammer Curls', sets: 3, reps: '12-15', weight: '15kg', restTime: '45 sec' }
      ],
      targetMuscles: ['Back', 'Biceps', 'Core'],
      equipment: ['Barbell', 'Pull-up Bar', 'Cable Machine', 'Dumbbells'],
      notes: 'Maintain proper posture throughout all pulling movements'
    },
    {
      id: 3,
      name: 'Leg Day Destroyer',
      category: 'Strength',
      duration: '65 min',
      difficulty: 'Advanced',
      exercises: [
        { name: 'Squats', sets: 4, reps: '6-8', weight: '80kg', restTime: '3 min' },
        { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', weight: '70kg', restTime: '2 min' },
        { name: 'Bulgarian Split Squats', sets: 3, reps: '10-12', weight: '20kg', restTime: '90 sec' },
        { name: 'Leg Press', sets: 3, reps: '12-15', weight: '120kg', restTime: '90 sec' },
        { name: 'Walking Lunges', sets: 3, reps: '20 steps', weight: '15kg', restTime: '60 sec' },
        { name: 'Calf Raises', sets: 4, reps: '15-20', weight: '40kg', restTime: '45 sec' }
      ],
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
      equipment: ['Barbell', 'Dumbbells', 'Leg Press Machine'],
      notes: 'Focus on depth and control, especially on squats and lunges'
    },
    {
      id: 4,
      name: 'HIIT Cardio Burn',
      category: 'Cardio',
      duration: '30 min',
      difficulty: 'Beginner',
      exercises: [
        { name: 'Jumping Jacks', sets: 4, reps: '30 sec', weight: 'Bodyweight', restTime: '30 sec' },
        { name: 'Burpees', sets: 4, reps: '20 sec', weight: 'Bodyweight', restTime: '40 sec' },
        { name: 'Mountain Climbers', sets: 4, reps: '30 sec', weight: 'Bodyweight', restTime: '30 sec' },
        { name: 'High Knees', sets: 4, reps: '20 sec', weight: 'Bodyweight', restTime: '40 sec' },
        { name: 'Plank Jacks', sets: 3, reps: '30 sec', weight: 'Bodyweight', restTime: '30 sec' },
        { name: 'Jump Squats', sets: 3, reps: '20 sec', weight: 'Bodyweight', restTime: '40 sec' }
      ],
      targetMuscles: ['Full Body', 'Cardiovascular'],
      equipment: ['None'],
      notes: 'Maintain high intensity throughout work periods'
    }
  ]);

  // Meal Templates
  const [mealTemplates, setMealTemplates] = useState([
    {
      id: 1,
      name: 'High Protein Muscle Building',
      category: 'Muscle Gain',
      totalCalories: 2400,
      macros: { protein: 180, carbs: 240, fat: 80 },
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Protein pancakes (3)', 'Greek yogurt (200g)', 'Blueberries (100g)', 'Almonds (30g)'],
          calories: 520,
          protein: 35,
          carbs: 45,
          fat: 18
        },
        {
          name: 'Mid-Morning Snack',
          time: '10:00 AM',
          foods: ['Protein shake (1 scoop)', 'Banana (1 medium)'],
          calories: 280,
          protein: 25,
          carbs: 30,
          fat: 5
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Grilled chicken breast (200g)', 'Brown rice (150g)', 'Mixed vegetables (200g)', 'Olive oil (1 tbsp)'],
          calories: 650,
          protein: 45,
          carbs: 60,
          fat: 20
        },
        {
          name: 'Pre-Workout',
          time: '4:00 PM',
          foods: ['Apple (1 medium)', 'Peanut butter (2 tbsp)'],
          calories: 280,
          protein: 8,
          carbs: 35,
          fat: 16
        },
        {
          name: 'Post-Workout',
          time: '6:30 PM',
          foods: ['Whey protein (1 scoop)', 'Chocolate milk (300ml)'],
          calories: 320,
          protein: 30,
          carbs: 35,
          fat: 8
        },
        {
          name: 'Dinner',
          time: '8:00 PM',
          foods: ['Salmon fillet (180g)', 'Sweet potato (200g)', 'Asparagus (150g)', 'Avocado (1/2)'],
          calories: 580,
          protein: 40,
          carbs: 45,
          fat: 25
        }
      ],
      notes: 'Designed for muscle building with optimal protein timing'
    },
    {
      id: 2,
      name: 'Fat Loss & Lean Muscle',
      category: 'Weight Loss',
      totalCalories: 1800,
      macros: { protein: 140, carbs: 150, fat: 70 },
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Egg whites (4)', 'Whole egg (1)', 'Spinach (100g)', 'Oatmeal (40g)', 'Berries (80g)'],
          calories: 350,
          protein: 25,
          carbs: 35,
          fat: 8
        },
        {
          name: 'Mid-Morning',
          time: '10:30 AM',
          foods: ['Greek yogurt (150g)', 'Almonds (15g)'],
          calories: 220,
          protein: 18,
          carbs: 12,
          fat: 12
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Grilled chicken (150g)', 'Quinoa (80g)', 'Mixed salad (200g)', 'Olive oil (1 tsp)'],
          calories: 480,
          protein: 35,
          carbs: 40,
          fat: 15
        },
        {
          name: 'Afternoon Snack',
          time: '4:00 PM',
          foods: ['Apple (1 medium)', 'Cottage cheese (100g)'],
          calories: 180,
          protein: 15,
          carbs: 20,
          fat: 4
        },
        {
          name: 'Dinner',
          time: '7:30 PM',
          foods: ['White fish (180g)', 'Steamed broccoli (200g)', 'Brown rice (60g)'],
          calories: 420,
          protein: 38,
          carbs: 35,
          fat: 8
        },
        {
          name: 'Evening',
          time: '9:30 PM',
          foods: ['Casein protein (1 scoop)', 'Walnuts (10g)'],
          calories: 150,
          protein: 20,
          carbs: 5,
          fat: 8
        }
      ],
      notes: 'Calorie-controlled plan for sustainable fat loss while preserving muscle'
    }
  ]);

  // Weekly Schedule
  const [weeklySchedule, setWeeklySchedule] = useState({
    Monday: {
      workout: { templateId: 1, time: '9:00 AM', customNotes: '' },
      meals: { templateId: 1, customizations: [] }
    },
    Tuesday: {
      workout: { templateId: 2, time: '9:00 AM', customNotes: '' },
      meals: { templateId: 1, customizations: [] }
    },
    Wednesday: {
      workout: { templateId: 4, time: '7:00 AM', customNotes: 'Light cardio day' },
      meals: { templateId: 2, customizations: [] }
    },
    Thursday: {
      workout: { templateId: 3, time: '9:00 AM', customNotes: '' },
      meals: { templateId: 1, customizations: [] }
    },
    Friday: {
      workout: { templateId: 1, time: '9:00 AM', customNotes: 'Focus on form' },
      meals: { templateId: 1, customizations: [] }
    },
    Saturday: {
      workout: { templateId: 2, time: '10:00 AM', customNotes: '' },
      meals: { templateId: 2, customizations: [] }
    },
    Sunday: {
      workout: null,
      meals: { templateId: 2, customizations: [] }
    }
  });

  // Monthly Schedule
  const [monthlySchedule, setMonthlySchedule] = useState({
    'Week 1': {
      focus: 'Strength Building',
      workouts: ['Chest & Triceps Power', 'Back & Biceps Blast', 'HIIT Cardio Burn', 'Leg Day Destroyer', 'Chest & Triceps Power', 'Back & Biceps Blast', 'Rest'],
      meals: 'High Protein Muscle Building',
      notes: 'Focus on progressive overload'
    },
    'Week 2': {
      focus: 'Strength Building',
      workouts: ['Chest & Triceps Power', 'Back & Biceps Blast', 'HIIT Cardio Burn', 'Leg Day Destroyer', 'Chest & Triceps Power', 'Back & Biceps Blast', 'Rest'],
      meals: 'High Protein Muscle Building',
      notes: 'Increase weights by 2.5kg where possible'
    },
    'Week 3': {
      focus: 'Strength & Conditioning',
      workouts: ['Chest & Triceps Power', 'Back & Biceps Blast', 'HIIT Cardio Burn', 'Leg Day Destroyer', 'HIIT Cardio Burn', 'Back & Biceps Blast', 'Rest'],
      meals: 'Fat Loss & Lean Muscle',
      notes: 'Add extra cardio session'
    },
    'Week 4': {
      focus: 'Recovery & Maintenance',
      workouts: ['HIIT Cardio Burn', 'Back & Biceps Blast', 'HIIT Cardio Burn', 'Leg Day Destroyer', 'HIIT Cardio Burn', 'Chest & Triceps Power', 'Rest'],
      meals: 'Fat Loss & Lean Muscle',
      notes: 'Deload week - reduce weights by 10%'
    }
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    category: '',
    duration: '',
    difficulty: '',
    exercises: [{ name: '', sets: '', reps: '', weight: '', restTime: '' }],
    targetMuscles: '',
    equipment: '',
    notes: ''
  });

  const [mealTemplateForm, setMealTemplateForm] = useState({
    name: '',
    category: '',
    totalCalories: '',
    protein: '',
    carbs: '',
    fat: '',
    meals: [{ name: '', time: '', foods: '', calories: '', protein: '', carbs: '', fat: '' }],
    notes: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddExercise = () => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: '', reps: '', weight: '', restTime: '' }]
    }));
  };

  const handleRemoveExercise = (index: number) => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleAddMeal = () => {
    setMealTemplateForm(prev => ({
      ...prev,
      meals: [...prev.meals, { name: '', time: '', foods: '', calories: '', protein: '', carbs: '', fat: '' }]
    }));
  };

  const handleRemoveMeal = (index: number) => {
    setMealTemplateForm(prev => ({
      ...prev,
      meals: prev.meals.filter((_, i) => i !== index)
    }));
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (scheduleType === 'workout') {
      const newTemplate = {
        id: workoutTemplates.length + 1,
        name: templateForm.name,
        category: templateForm.category,
        duration: templateForm.duration,
        difficulty: templateForm.difficulty,
        exercises: templateForm.exercises.map(ex => ({
          name: ex.name,
          sets: parseInt(ex.sets),
          reps: ex.reps,
          weight: ex.weight,
          restTime: ex.restTime
        })),
        targetMuscles: templateForm.targetMuscles.split(',').map(m => m.trim()),
        equipment: templateForm.equipment.split(',').map(e => e.trim()),
        notes: templateForm.notes
      };
      
      setWorkoutTemplates(prev => [...prev, newTemplate]);
    } else {
      const newMealTemplate = {
        id: mealTemplates.length + 1,
        name: mealTemplateForm.name,
        category: mealTemplateForm.category,
        totalCalories: parseInt(mealTemplateForm.totalCalories),
        macros: {
          protein: parseInt(mealTemplateForm.protein),
          carbs: parseInt(mealTemplateForm.carbs),
          fat: parseInt(mealTemplateForm.fat)
        },
        meals: mealTemplateForm.meals.map(meal => ({
          name: meal.name,
          time: meal.time,
          foods: meal.foods.split(',').map(f => f.trim()),
          calories: parseInt(meal.calories),
          protein: parseInt(meal.protein),
          carbs: parseInt(meal.carbs),
          fat: parseInt(meal.fat)
        })),
        notes: mealTemplateForm.notes
      };
      
      setMealTemplates(prev => [...prev, newMealTemplate]);
    }
    
    setShowTemplateModal(false);
    // Reset forms
    setTemplateForm({
      name: '',
      category: '',
      duration: '',
      difficulty: '',
      exercises: [{ name: '', sets: '', reps: '', weight: '', restTime: '' }],
      targetMuscles: '',
      equipment: '',
      notes: ''
    });
    setMealTemplateForm({
      name: '',
      category: '',
      totalCalories: '',
      protein: '',
      carbs: '',
      fat: '',
      meals: [{ name: '', time: '', foods: '', calories: '', protein: '', carbs: '', fat: '' }],
      notes: ''
    });
  };

  const renderWeeklySchedule = () => (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Weekly Schedule Template</h3>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Duplicate Week
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Template
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {daysOfWeek.map((day) => {
            const daySchedule = weeklySchedule[day as keyof typeof weeklySchedule];
            const workoutTemplate = daySchedule.workout ? workoutTemplates.find(t => t.id === daySchedule.workout?.templateId) : null;
            const mealTemplate = mealTemplates.find(t => t.id === daySchedule.meals.templateId);
            
            return (
              <div key={day} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-3 text-center">{day}</h4>
                
                {/* Workout Section */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-200 text-sm font-medium">Workout</span>
                  </div>
                  
                  {workoutTemplate ? (
                    <div className="bg-blue-500/20 rounded-lg p-3 mb-2">
                      <div className="text-white text-sm font-medium mb-1">{workoutTemplate.name}</div>
                      <div className="text-blue-200 text-xs mb-1">{workoutTemplate.duration} • {workoutTemplate.difficulty}</div>
                      <div className="text-blue-200 text-xs">{daySchedule.workout?.time}</div>
                      {daySchedule.workout?.customNotes && (
                        <div className="text-blue-300 text-xs mt-1 italic">{daySchedule.workout.customNotes}</div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-500/20 rounded-lg p-3 mb-2 text-center">
                      <div className="text-gray-400 text-sm">Rest Day</div>
                    </div>
                  )}
                  
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white py-1 px-2 rounded text-xs transition-colors">
                    {workoutTemplate ? 'Change' : 'Add'} Workout
                  </button>
                </div>

                {/* Meal Section */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsCrossed className="w-4 h-4 text-green-400" />
                    <span className="text-green-200 text-sm font-medium">Meals</span>
                  </div>
                  
                  {mealTemplate && (
                    <div className="bg-green-500/20 rounded-lg p-3 mb-2">
                      <div className="text-white text-sm font-medium mb-1">{mealTemplate.name}</div>
                      <div className="text-green-200 text-xs">{mealTemplate.totalCalories} cal</div>
                      <div className="text-green-200 text-xs">P: {mealTemplate.macros.protein}g C: {mealTemplate.macros.carbs}g F: {mealTemplate.macros.fat}g</div>
                    </div>
                  )}
                  
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white py-1 px-2 rounded text-xs transition-colors">
                    Change Meal Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMonthlySchedule = () => (
    <div className="space-y-6">
      {/* Monthly Overview */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Monthly Training Program</h3>
          <div className="flex gap-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset Month
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Program
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(monthlySchedule).map(([week, schedule]) => (
            <div key={week} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white">{week}</h4>
                <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                  {schedule.focus}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-blue-200 text-sm font-medium mb-2">Weekly Workouts:</div>
                  <div className="grid grid-cols-7 gap-1">
                    {schedule.workouts.map((workout, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-gray-400 mb-1">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </div>
                        <div className={`text-xs p-1 rounded ${
                          workout === 'Rest' 
                            ? 'bg-gray-500/20 text-gray-400' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {workout === 'Rest' ? 'Rest' : workout.split(' ')[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-green-200 text-sm font-medium mb-1">Nutrition Plan:</div>
                  <div className="bg-green-500/20 rounded p-2">
                    <div className="text-green-300 text-sm">{schedule.meals}</div>
                  </div>
                </div>
                
                {schedule.notes && (
                  <div>
                    <div className="text-yellow-200 text-sm font-medium mb-1">Notes:</div>
                    <div className="text-yellow-300 text-xs italic">{schedule.notes}</div>
                  </div>
                )}
              </div>
              
              <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded text-sm transition-colors">
                Customize Week
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Template Management Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Template Library</h3>
          <p className="text-blue-200 text-sm">Create and manage workout and meal templates</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setScheduleType('workout');
              setShowTemplateModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Workout Template
          </button>
          <button
            onClick={() => {
              setScheduleType('meal');
              setShowTemplateModal(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Meal Template
          </button>
        </div>
      </div>

      {/* Workout Templates */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-white">Workout Templates</h4>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {workoutTemplates.map((template) => (
            <div key={template.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-white">{template.name}</h5>
                  <div className="flex items-center gap-2 text-sm text-blue-200">
                    <span>{template.category}</span>
                    <span>•</span>
                    <span>{template.duration}</span>
                    <span>•</span>
                    <span>{template.difficulty}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Copy className="w-4 h-4 text-green-400" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="text-sm">
                  <span className="text-blue-200">Exercises: </span>
                  <span className="text-white">{template.exercises.length}</span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-200">Target: </span>
                  <span className="text-white">{template.targetMuscles.join(', ')}</span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-200">Equipment: </span>
                  <span className="text-white">{template.equipment.join(', ')}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                  Use Template
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded text-sm transition-colors">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Templates */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <UtensilsCrossed className="w-5 h-5 text-green-400" />
          <h4 className="text-lg font-semibold text-white">Meal Templates</h4>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mealTemplates.map((template) => (
            <div key={template.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-white">{template.name}</h5>
                  <div className="text-sm text-green-200">{template.category}</div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Copy className="w-4 h-4 text-green-400" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="text-sm">
                  <span className="text-green-200">Total Calories: </span>
                  <span className="text-white">{template.totalCalories}</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-200">Macros: </span>
                  <span className="text-white">P: {template.macros.protein}g C: {template.macros.carbs}g F: {template.macros.fat}g</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-200">Meals: </span>
                  <span className="text-white">{template.meals.length} per day</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                  Use Template
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded text-sm transition-colors">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Scheduling</h2>
          <p className="text-blue-200">Create weekly and monthly schedules with custom templates</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Schedule
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Template
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{workoutTemplates.length}</h3>
          <p className="text-blue-200 text-sm">Workout Templates</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{mealTemplates.length}</h3>
          <p className="text-blue-200 text-sm">Meal Templates</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">6</h3>
          <p className="text-blue-200 text-sm">Active Days/Week</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-500">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">247</h3>
          <p className="text-blue-200 text-sm">Members Using</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
        {[
          { id: 'weekly', label: 'Weekly Schedule', icon: Calendar },
          { id: 'monthly', label: 'Monthly Program', icon: Target },
          { id: 'templates', label: 'Template Library', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="min-h-[600px]">
        {activeTab === 'weekly' && renderWeeklySchedule()}
        {activeTab === 'monthly' && renderMonthlySchedule()}
        {activeTab === 'templates' && renderTemplates()}
      </div>

      {/* Template Creation Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              Create New {scheduleType === 'workout' ? 'Workout' : 'Meal'} Template
            </h3>
            
            <form onSubmit={handleSaveTemplate} className="space-y-6">
              {scheduleType === 'workout' ? (
                <>
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Template Name</label>
                      <input
                        type="text"
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Chest & Triceps Power"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Category</label>
                      <select
                        value={templateForm.category}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="HIIT">HIIT</option>
                        <option value="Flexibility">Flexibility</option>
                        <option value="Functional">Functional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Duration</label>
                      <input
                        type="text"
                        value={templateForm.duration}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 60 min"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Difficulty</label>
                      <select
                        value={templateForm.difficulty}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, difficulty: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* Exercises */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-blue-200">Exercises</label>
                      <button
                        type="button"
                        onClick={handleAddExercise}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Exercise
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {templateForm.exercises.map((exercise, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-3 bg-white/5 rounded-lg">
                          <input
                            type="text"
                            placeholder="Exercise name"
                            value={exercise.name}
                            onChange={(e) => {
                              const newExercises = [...templateForm.exercises];
                              newExercises[index].name = e.target.value;
                              setTemplateForm(prev => ({ ...prev, exercises: newExercises }));
                            }}
                            className="md:col-span-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => {
                              const newExercises = [...templateForm.exercises];
                              newExercises[index].sets = e.target.value;
                              setTemplateForm(prev => ({ ...prev, exercises: newExercises }));
                            }}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Reps"
                            value={exercise.reps}
                            onChange={(e) => {
                              const newExercises = [...templateForm.exercises];
                              newExercises[index].reps = e.target.value;
                              setTemplateForm(prev => ({ ...prev, exercises: newExercises }));
                            }}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Weight"
                            value={exercise.weight}
                            onChange={(e) => {
                              const newExercises = [...templateForm.exercises];
                              newExercises[index].weight = e.target.value;
                              setTemplateForm(prev => ({ ...prev, exercises: newExercises }));
                            }}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Rest"
                              value={exercise.restTime}
                              onChange={(e) => {
                                const newExercises = [...templateForm.exercises];
                                newExercises[index].restTime = e.target.value;
                                setTemplateForm(prev => ({ ...prev, exercises: newExercises }));
                              }}
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            {templateForm.exercises.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveExercise(index)}
                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Target Muscles</label>
                      <input
                        type="text"
                        value={templateForm.targetMuscles}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, targetMuscles: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Chest, Triceps, Shoulders (comma separated)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Equipment</label>
                      <input
                        type="text"
                        value={templateForm.equipment}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, equipment: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Barbell, Dumbbells, Bench (comma separated)"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1">Notes</label>
                    <textarea
                      value={templateForm.notes}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any additional notes or instructions..."
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Meal Template Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Template Name</label>
                      <input
                        type="text"
                        value={mealTemplateForm.name}
                        onChange={(e) => setMealTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., High Protein Muscle Building"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Category</label>
                      <select
                        value={mealTemplateForm.category}
                        onChange={(e) => setMealTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Performance">Performance</option>
                      </select>
                    </div>
                  </div>

                  {/* Macros */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Total Calories</label>
                      <input
                        type="number"
                        value={mealTemplateForm.totalCalories}
                        onChange={(e) => setMealTemplateForm(prev => ({ ...prev, totalCalories: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="2400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Protein (g)</label>
                      <input
                        type="number"
                        value={mealTemplateForm.protein}
                        onChange={(e) => setMealTemplateForm(prev => ({ ...prev, protein: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="180"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Carbs (g)</label>
                      <input
                        type="number"
                        value={mealTemplateForm.carbs}
                        onChange={(e) => setMealTemplateForm(prev => ({ ...prev, carbs: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="240"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Fat (g)</label>
                      <input
                        type="number"
                        value={mealTemplateForm.fat}
                        onChange={(e) => setMealTemplateForm(prev => ({ ...prev, fat: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="80"
                        required
                      />
                    </div>
                  </div>

                  {/* Meals */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-blue-200">Daily Meals</label>
                      <button
                        type="button"
                        onClick={handleAddMeal}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Meal
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {mealTemplateForm.meals.map((meal, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-3 p-3 bg-white/5 rounded-lg">
                          <input
                            type="text"
                            placeholder="Meal name"
                            value={meal.name}
                            onChange={(e) => {
                              const newMeals = [...mealTemplateForm.meals];
                              newMeals[index].name = e.target.value;
                              setMealTemplateForm(prev => ({ ...prev, meals: newMeals }));
                            }}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="time"
                            value={meal.time}
                            onChange={(e) => {
                              const newMeals = [...mealTemplateForm.meals];
                              newMeals[index].time = e.target.value;
                              setMealTemplateForm(prev => ({ ...prev, meals: newMeals }));
                            }}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Foods (comma separated)"
                            value={meal.foods}
                            onChange={(e) => {
                              const newMeals = [...mealTemplateForm.meals];
                              newMeals[index].foods = e.target.value;
                              setMealTemplateForm(prev => ({ ...prev, meals: newMeals }));
                            }}
                            className="md:col-span-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Cal"
                            value={meal.calories}
                            onChange={(e) => {
                              const newMeals = [...mealTemplateForm.meals];
                              newMeals[index].calories = e.target.value;
                              setMealTemplateForm(prev => ({ ...prev, meals: newMeals }));
                            }}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="number"
                            placeholder="P"
                            value={meal.protein}
                            onChange={(e) => {
                              const newMeals = [...mealTemplateForm.meals];
                              newMeals[index].protein = e.target.value;
                              setMealTemplateForm(prev => ({ ...prev, meals: newMeals }));
                            }}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder="C"
                              value={meal.carbs}
                              onChange={(e) => {
                                const newMeals = [...mealTemplateForm.meals];
                                newMeals[index].carbs = e.target.value;
                                setMealTemplateForm(prev => ({ ...prev, meals: newMeals }));
                              }}
                              className="w-16 px-2 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <input
                              type="number"
                              placeholder="F"
                              value={meal.fat}
                              onChange={(e) => {
                                const newMeals = [...mealTemplateForm.meals];
                                newMeals[index].fat = e.target.value;
                                setMealTemplateForm(prev => ({ ...prev, meals: newMeals }));
                              }}
                              className="w-16 px-2 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            {mealTemplateForm.meals.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMeal(index)}
                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1">Notes</label>
                    <textarea
                      value={mealTemplateForm.notes}
                      onChange={(e) => setMealTemplateForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any additional notes or instructions..."
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedScheduling;