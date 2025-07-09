import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, User, Dumbbell, Target, Timer, Copy, Save, Download, Upload, ChevronLeft, ChevronRight, RotateCcw, Settings, Zap, Star, CheckCircle, AlertCircle } from 'lucide-react';

const WorkoutScheduling = () => {
  const [activeView, setActiveView] = useState('weekly'); // 'weekly', 'monthly', 'templates'
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = current month
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [templateType, setTemplateType] = useState('workout'); // 'workout' or 'meal'

  // Sample workout templates
  const [workoutTemplates, setWorkoutTemplates] = useState([
    {
      id: 1,
      name: 'Chest & Triceps Power',
      category: 'Strength',
      difficulty: 'Intermediate',
      duration: '60 min',
      equipment: ['Barbell', 'Dumbbells', 'Bench'],
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '6-8', weight: '75kg', rest: '2-3 min' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', weight: '30kg', rest: '90 sec' },
        { name: 'Dips', sets: 3, reps: '10-12', weight: 'Bodyweight', rest: '90 sec' },
        { name: 'Close-Grip Bench Press', sets: 3, reps: '8-10', weight: '60kg', rest: '90 sec' },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', weight: '40kg', rest: '60 sec' }
      ],
      notes: 'Focus on controlled movements and full range of motion'
    },
    {
      id: 2,
      name: 'Back & Biceps Blast',
      category: 'Strength',
      difficulty: 'Intermediate',
      duration: '55 min',
      equipment: ['Pull-up Bar', 'Barbell', 'Dumbbells'],
      targetMuscles: ['Lats', 'Rhomboids', 'Biceps'],
      exercises: [
        { name: 'Pull-ups', sets: 4, reps: '6-10', weight: 'Bodyweight', rest: '2 min' },
        { name: 'Barbell Rows', sets: 4, reps: '8-10', weight: '70kg', rest: '90 sec' },
        { name: 'Lat Pulldowns', sets: 3, reps: '10-12', weight: '60kg', rest: '90 sec' },
        { name: 'Barbell Curls', sets: 3, reps: '10-12', weight: '30kg', rest: '60 sec' },
        { name: 'Hammer Curls', sets: 3, reps: '12-15', weight: '15kg', rest: '60 sec' }
      ],
      notes: 'Squeeze shoulder blades together on all pulling movements'
    },
    {
      id: 3,
      name: 'Leg Day Destroyer',
      category: 'Strength',
      difficulty: 'Advanced',
      duration: '70 min',
      equipment: ['Barbell', 'Leg Press', 'Dumbbells'],
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
      exercises: [
        { name: 'Squats', sets: 4, reps: '6-8', weight: '100kg', rest: '3 min' },
        { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', weight: '80kg', rest: '2 min' },
        { name: 'Leg Press', sets: 3, reps: '12-15', weight: '200kg', rest: '90 sec' },
        { name: 'Walking Lunges', sets: 3, reps: '12 each leg', weight: '20kg', rest: '90 sec' },
        { name: 'Calf Raises', sets: 4, reps: '15-20', weight: '60kg', rest: '60 sec' }
      ],
      notes: 'Ensure proper depth on squats and control the eccentric phase'
    },
    {
      id: 4,
      name: 'HIIT Cardio Burn',
      category: 'Cardio',
      difficulty: 'Beginner',
      duration: '25 min',
      equipment: ['None'],
      targetMuscles: ['Full Body'],
      exercises: [
        { name: 'Jumping Jacks', sets: 4, reps: '30 sec', weight: 'Bodyweight', rest: '30 sec' },
        { name: 'Burpees', sets: 4, reps: '30 sec', weight: 'Bodyweight', rest: '30 sec' },
        { name: 'Mountain Climbers', sets: 4, reps: '30 sec', weight: 'Bodyweight', rest: '30 sec' },
        { name: 'High Knees', sets: 4, reps: '30 sec', weight: 'Bodyweight', rest: '30 sec' },
        { name: 'Plank Hold', sets: 4, reps: '30 sec', weight: 'Bodyweight', rest: '30 sec' }
      ],
      notes: 'Maintain high intensity throughout work periods'
    }
  ]);

  // Sample meal templates
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
          foods: ['3 whole eggs + 2 egg whites', 'Oatmeal (80g)', 'Banana', 'Almonds (20g)'],
          calories: 520,
          macros: { protein: 28, carbs: 45, fat: 18 }
        },
        {
          name: 'Pre-Workout',
          time: '9:30 AM',
          foods: ['Banana', 'Black coffee', 'Honey (1 tbsp)'],
          calories: 150,
          macros: { protein: 2, carbs: 38, fat: 0 }
        },
        {
          name: 'Post-Workout',
          time: '11:00 AM',
          foods: ['Whey protein (30g)', 'Apple', 'Rice cakes (2)'],
          calories: 280,
          macros: { protein: 25, carbs: 35, fat: 2 }
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Chicken breast (150g)', 'Brown rice (100g)', 'Broccoli', 'Olive oil (1 tbsp)'],
          calories: 650,
          macros: { protein: 45, carbs: 55, fat: 20 }
        },
        {
          name: 'Snack',
          time: '4:00 PM',
          foods: ['Greek yogurt (200g)', 'Mixed berries', 'Granola (30g)'],
          calories: 320,
          macros: { protein: 20, carbs: 35, fat: 12 }
        },
        {
          name: 'Dinner',
          time: '7:30 PM',
          foods: ['Salmon (150g)', 'Sweet potato (200g)', 'Asparagus', 'Avocado (1/2)'],
          calories: 580,
          macros: { protein: 35, carbs: 45, fat: 25 }
        }
      ]
    },
    {
      id: 2,
      name: 'Fat Loss Lean & Clean',
      category: 'Weight Loss',
      totalCalories: 1600,
      macros: { protein: 140, carbs: 120, fat: 60 },
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Egg white omelet (4 whites)', 'Spinach', 'Mushrooms', 'Berries (100g)'],
          calories: 180,
          macros: { protein: 18, carbs: 15, fat: 2 }
        },
        {
          name: 'Mid-Morning',
          time: '10:00 AM',
          foods: ['Green tea', 'Apple', 'Almonds (10g)'],
          calories: 140,
          macros: { protein: 3, carbs: 20, fat: 6 }
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Grilled chicken (120g)', 'Quinoa (60g)', 'Mixed vegetables', 'Lemon dressing'],
          calories: 420,
          macros: { protein: 35, carbs: 35, fat: 8 }
        },
        {
          name: 'Pre-Workout',
          time: '4:00 PM',
          foods: ['Banana (small)', 'Black coffee'],
          calories: 90,
          macros: { protein: 1, carbs: 23, fat: 0 }
        },
        {
          name: 'Post-Workout',
          time: '6:00 PM',
          foods: ['Protein shake (25g)', 'Berries (80g)'],
          calories: 150,
          macros: { protein: 25, carbs: 15, fat: 1 }
        },
        {
          name: 'Dinner',
          time: '8:00 PM',
          foods: ['White fish (150g)', 'Steamed vegetables', 'Cauliflower rice', 'Olive oil (1 tsp)'],
          calories: 320,
          macros: { protein: 30, carbs: 12, fat: 15 }
        }
      ]
    }
  ]);

  // Weekly schedule state
  const [weeklySchedule, setWeeklySchedule] = useState({
    week1: {
      monday: { workout: null, meal: null, time: '09:00', notes: '', restDay: false },
      tuesday: { workout: null, meal: null, time: '09:00', notes: '', restDay: false },
      wednesday: { workout: null, meal: null, time: '09:00', notes: '', restDay: false },
      thursday: { workout: null, meal: null, time: '09:00', notes: '', restDay: false },
      friday: { workout: null, meal: null, time: '09:00', notes: '', restDay: false },
      saturday: { workout: null, meal: null, time: '09:00', notes: '', restDay: false },
      sunday: { workout: null, meal: null, time: '09:00', notes: '', restDay: true }
    }
  });

  // Monthly program state
  const [monthlyProgram, setMonthlyProgram] = useState({
    name: 'Strength Building Program',
    weeks: [
      { name: 'Week 1: Foundation', focus: 'Base Building', intensity: '70%' },
      { name: 'Week 2: Progression', focus: 'Strength', intensity: '80%' },
      { name: 'Week 3: Peak', focus: 'Power', intensity: '90%' },
      { name: 'Week 4: Deload', focus: 'Recovery', intensity: '60%' }
    ]
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    category: '',
    difficulty: '',
    duration: '',
    equipment: '',
    targetMuscles: '',
    exercises: [{ name: '', sets: '', reps: '', weight: '', rest: '' }],
    notes: ''
  });

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleTemplateAssignment = (day: string, type: 'workout' | 'meal', templateId: number | null) => {
    setWeeklySchedule(prev => ({
      ...prev,
      week1: {
        ...prev.week1,
        [day]: {
          ...prev.week1[day as keyof typeof prev.week1],
          [type]: templateId
        }
      }
    }));
  };

  const handleTimeChange = (day: string, time: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      week1: {
        ...prev.week1,
        [day]: {
          ...prev.week1[day as keyof typeof prev.week1],
          time
        }
      }
    }));
  };

  const handleRestDayToggle = (day: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      week1: {
        ...prev.week1,
        [day]: {
          ...prev.week1[day as keyof typeof prev.week1],
          restDay: !prev.week1[day as keyof typeof prev.week1].restDay,
          workout: !prev.week1[day as keyof typeof prev.week1].restDay ? null : prev.week1[day as keyof typeof prev.week1].workout
        }
      }
    }));
  };

  const addExerciseToTemplate = () => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: '', reps: '', weight: '', rest: '' }]
    }));
  };

  const removeExerciseFromTemplate = (index: number) => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleExerciseChange = (index: number, field: string, value: string) => {
    setTemplateForm(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) => 
        i === index ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  const saveTemplate = () => {
    if (templateType === 'workout') {
      const newTemplate = {
        id: workoutTemplates.length + 1,
        name: templateForm.name,
        category: templateForm.category,
        difficulty: templateForm.difficulty,
        duration: templateForm.duration,
        equipment: templateForm.equipment.split(',').map(item => item.trim()),
        targetMuscles: templateForm.targetMuscles.split(',').map(item => item.trim()),
        exercises: templateForm.exercises.filter(ex => ex.name),
        notes: templateForm.notes
      };
      setWorkoutTemplates(prev => [...prev, newTemplate]);
    }
    
    setShowTemplateModal(false);
    setTemplateForm({
      name: '',
      category: '',
      difficulty: '',
      duration: '',
      equipment: '',
      targetMuscles: '',
      exercises: [{ name: '', sets: '', reps: '', weight: '', rest: '' }],
      notes: ''
    });
  };

  const duplicateWeek = () => {
    // Logic to duplicate current week schedule
    console.log('Duplicating week schedule');
  };

  const saveWeeklyTemplate = () => {
    // Logic to save weekly schedule as template
    console.log('Saving weekly template');
  };

  const deployToBot = () => {
    // Logic to deploy schedule to WhatsApp bot
    console.log('Deploying to WhatsApp bot');
  };

  const renderWeeklyView = () => (
    <div className="space-y-6">
      {/* Weekly Controls */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedWeek(prev => prev - 1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h3 className="text-xl font-semibold text-white">
              Week {selectedWeek + 1} - {selectedWeek === 0 ? 'Current Week' : `${selectedWeek} weeks ahead`}
            </h3>
            <button
              onClick={() => setSelectedWeek(prev => prev + 1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={duplicateWeek}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>
            <button
              onClick={saveWeeklyTemplate}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
            >
              <Save className="w-4 h-4" />
              Save Template
            </button>
            <button
              onClick={deployToBot}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
            >
              <Zap className="w-4 h-4" />
              Deploy to Bot
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => {
          const daySchedule = weeklySchedule.week1[day as keyof typeof weeklySchedule.week1];
          const workoutTemplate = workoutTemplates.find(t => t.id === daySchedule.workout);
          const mealTemplate = mealTemplates.find(t => t.id === daySchedule.meal);
          
          return (
            <div key={day} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{dayLabels[index]}</h4>
                <button
                  onClick={() => handleRestDayToggle(day)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    daySchedule.restDay 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {daySchedule.restDay ? 'Rest Day' : 'Active'}
                </button>
              </div>

              {!daySchedule.restDay ? (
                <div className="space-y-3">
                  {/* Workout Assignment */}
                  <div>
                    <label className="block text-xs font-medium text-blue-200 mb-1">Workout</label>
                    <select
                      value={daySchedule.workout || ''}
                      onChange={(e) => handleTemplateAssignment(day, 'workout', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Workout</option>
                      {workoutTemplates.map(template => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                    </select>
                    {workoutTemplate && (
                      <div className="mt-1 p-2 bg-white/5 rounded text-xs">
                        <div className="text-blue-300 font-medium">{workoutTemplate.name}</div>
                        <div className="text-gray-400">{workoutTemplate.duration} • {workoutTemplate.difficulty}</div>
                        <div className="text-gray-400">{workoutTemplate.exercises.length} exercises</div>
                      </div>
                    )}
                  </div>

                  {/* Meal Assignment */}
                  <div>
                    <label className="block text-xs font-medium text-blue-200 mb-1">Meal Plan</label>
                    <select
                      value={daySchedule.meal || ''}
                      onChange={(e) => handleTemplateAssignment(day, 'meal', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Meal Plan</option>
                      {mealTemplates.map(template => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                    </select>
                    {mealTemplate && (
                      <div className="mt-1 p-2 bg-white/5 rounded text-xs">
                        <div className="text-green-300 font-medium">{mealTemplate.name}</div>
                        <div className="text-gray-400">{mealTemplate.totalCalories} cal</div>
                        <div className="text-gray-400">{mealTemplate.meals.length} meals</div>
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-medium text-blue-200 mb-1">Workout Time</label>
                    <input
                      type="time"
                      value={daySchedule.time}
                      onChange={(e) => handleTimeChange(day, e.target.value)}
                      className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-medium text-blue-200 mb-1">Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Custom notes..."
                      className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <RotateCcw className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <p className="text-orange-300 text-sm">Rest & Recovery Day</p>
                  <p className="text-gray-400 text-xs">No workout scheduled</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMonthlyView = () => (
    <div className="space-y-6">
      {/* Monthly Controls */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedMonth(prev => prev - 1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h3 className="text-xl font-semibold text-white">
              {monthlyProgram.name} - Month {selectedMonth + 1}
            </h3>
            <button
              onClick={() => setSelectedMonth(prev => prev + 1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1">
              <Settings className="w-4 h-4" />
              Edit Program
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Deploy Month
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Program Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {monthlyProgram.weeks.map((week, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-white">{week.name}</h4>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                {week.intensity}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="text-blue-200">
                <span className="font-medium">Focus:</span> {week.focus}
              </div>
              <div className="text-blue-200">
                <span className="font-medium">Intensity:</span> {week.intensity}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                View Week Details
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                Assign Templates
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplatesView = () => (
    <div className="space-y-6">
      {/* Template Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setTemplateType('workout')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              templateType === 'workout' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-blue-200 hover:bg-white/20'
            }`}
          >
            Workout Templates ({workoutTemplates.length})
          </button>
          <button
            onClick={() => setTemplateType('meal')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              templateType === 'meal' 
                ? 'bg-green-600 text-white' 
                : 'bg-white/10 text-blue-200 hover:bg-white/20'
            }`}
          >
            Meal Templates ({mealTemplates.length})
          </button>
        </div>
        
        <button
          onClick={() => setShowTemplateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(templateType === 'workout' ? workoutTemplates : mealTemplates).map((template) => (
          <div key={template.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white">{template.name}</h4>
                <p className="text-blue-200 text-sm">{template.category}</p>
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

            {templateType === 'workout' ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-blue-200">
                  <span>Duration:</span>
                  <span>{template.duration}</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Difficulty:</span>
                  <span>{template.difficulty}</span>
                </div>
                <div className="text-blue-200">
                  <span className="font-medium">Exercises:</span> {template.exercises?.length || 0}
                </div>
                <div className="text-blue-200">
                  <span className="font-medium">Equipment:</span> {template.equipment?.join(', ') || 'None'}
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-blue-200">
                  <span>Calories:</span>
                  <span>{template.totalCalories}</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Protein:</span>
                  <span>{template.macros?.protein}g</span>
                </div>
                <div className="text-blue-200">
                  <span className="font-medium">Meals:</span> {template.meals?.length || 0}
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                Use Template
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                <Star className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Scheduling</h2>
          <p className="text-blue-200">Create weekly schedules, monthly programs, and manage templates</p>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Import
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{workoutTemplates.length}</div>
          <div className="text-blue-200 text-sm">Workout Templates</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{mealTemplates.length}</div>
          <div className="text-blue-200 text-sm">Meal Templates</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-blue-200 text-sm">Active Programs</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">156</div>
          <div className="text-blue-200 text-sm">Members Scheduled</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
        <button
          onClick={() => setActiveView('weekly')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeView === 'weekly'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-blue-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Weekly Schedule
        </button>
        <button
          onClick={() => setActiveView('monthly')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeView === 'monthly'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-blue-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <Target className="w-5 h-5" />
          Monthly Programs
        </button>
        <button
          onClick={() => setActiveView('templates')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeView === 'templates'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-blue-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          Template Library
        </button>
      </div>

      {/* Main Content */}
      <div className="min-h-[600px]">
        {activeView === 'weekly' && renderWeeklyView()}
        {activeView === 'monthly' && renderMonthlyView()}
        {activeView === 'templates' && renderTemplatesView()}
      </div>

      {/* Template Creation Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              Create {templateType === 'workout' ? 'Workout' : 'Meal'} Template
            </h3>
            
            <div className="space-y-4">
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Category</label>
                  <select
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {templateType === 'workout' ? (
                      <>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="HIIT">HIIT</option>
                        <option value="Functional">Functional</option>
                        <option value="Flexibility">Flexibility</option>
                      </>
                    ) : (
                      <>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Performance">Performance</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Difficulty</label>
                  <select
                    value={templateForm.difficulty}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
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
                  />
                </div>
              </div>

              {templateType === 'workout' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Equipment Required</label>
                      <input
                        type="text"
                        value={templateForm.equipment}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, equipment: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Barbell, Dumbbells, Bench"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Target Muscles</label>
                      <input
                        type="text"
                        value={templateForm.targetMuscles}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, targetMuscles: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Chest, Triceps, Shoulders"
                      />
                    </div>
                  </div>

                  {/* Exercises */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-blue-200">Exercises</label>
                      <button
                        type="button"
                        onClick={addExerciseToTemplate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Exercise
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {templateForm.exercises.map((exercise, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 p-3 bg-white/5 rounded-lg">
                          <input
                            type="text"
                            placeholder="Exercise name"
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                            className="md:col-span-2 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Reps"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Weight"
                            value={exercise.weight}
                            onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeExerciseFromTemplate(index)}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Notes</label>
                <textarea
                  value={templateForm.notes}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes or instructions..."
                />
              </div>

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
                  onClick={saveTemplate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutScheduling;