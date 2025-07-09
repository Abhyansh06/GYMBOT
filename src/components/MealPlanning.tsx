import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Edit, Trash2, Apple, Beef, Wheat, Droplets } from 'lucide-react';

const MealPlanning = () => {
  const [showAddMeal, setShowAddMeal] = useState(false);
  
  const mealPlans = [
    {
      id: 1,
      member: 'John Doe',
      day: 'Monday',
      meals: [
        {
          type: 'Breakfast',
          foods: ['Oatmeal', 'Banana', 'Almonds'],
          calories: 350,
          protein: 12,
          carbs: 45,
          fat: 15
        },
        {
          type: 'Lunch',
          foods: ['Grilled Chicken', 'Brown Rice', 'Broccoli'],
          calories: 520,
          protein: 35,
          carbs: 40,
          fat: 18
        },
        {
          type: 'Dinner',
          foods: ['Salmon', 'Sweet Potato', 'Asparagus'],
          calories: 450,
          protein: 30,
          carbs: 35,
          fat: 20
        }
      ]
    },
    {
      id: 2,
      member: 'Sarah Johnson',
      day: 'Monday',
      meals: [
        {
          type: 'Breakfast',
          foods: ['Greek Yogurt', 'Berries', 'Granola'],
          calories: 280,
          protein: 20,
          carbs: 30,
          fat: 8
        },
        {
          type: 'Lunch',
          foods: ['Quinoa Salad', 'Chickpeas', 'Vegetables'],
          calories: 380,
          protein: 15,
          carbs: 50,
          fat: 12
        },
        {
          type: 'Dinner',
          foods: ['Tofu Stir-fry', 'Brown Rice', 'Mixed Vegetables'],
          calories: 400,
          protein: 18,
          carbs: 45,
          fat: 16
        }
      ]
    }
  ];

  const nutritionGoals = [
    { member: 'John Doe', calories: 2400, protein: 180, carbs: 300, fat: 80 },
    { member: 'Sarah Johnson', calories: 1800, protein: 120, carbs: 200, fat: 60 }
  ];

  const [mealForm, setMealForm] = useState({
    member: '',
    day: '',
    mealType: '',
    foods: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setMealForm({
      ...mealForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle meal planning logic here
    console.log('Adding meal:', mealForm);
    setShowAddMeal(false);
    setMealForm({
      member: '',
      day: '',
      mealType: '',
      foods: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
  };

  const getMacroColor = (type: string) => {
    switch (type) {
      case 'protein': return 'bg-red-500';
      case 'carbs': return 'bg-blue-500';
      case 'fat': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Meal Planning</h2>
        <button
          onClick={() => setShowAddMeal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Meal
        </button>
      </div>

      {/* Nutrition Overview */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Apple className="w-5 h-5 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Nutrition Goals</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nutritionGoals.map((goal, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">{goal.member}</h4>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{goal.calories}</div>
                  <div className="text-blue-200 text-sm">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{goal.protein}g</div>
                  <div className="text-blue-200 text-sm">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{goal.carbs}g</div>
                  <div className="text-blue-200 text-sm">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{goal.fat}g</div>
                  <div className="text-blue-200 text-sm">Fat</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mealPlans.map((plan) => (
          <div key={plan.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{plan.member}</h3>
                <p className="text-blue-200">{plan.day}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {plan.meals.map((meal, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-medium">{meal.type}</h4>
                      <p className="text-blue-200 text-sm">
                        {meal.foods.join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{meal.calories} cal</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="text-center">
                      <div className="text-red-400 font-semibold">{meal.protein}g</div>
                      <div className="text-blue-200 text-xs">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">{meal.carbs}g</div>
                      <div className="text-blue-200 text-xs">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-400 font-semibold">{meal.fat}g</div>
                      <div className="text-blue-200 text-xs">Fat</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Daily Total</span>
                <span className="text-white font-semibold">
                  {plan.meals.reduce((total, meal) => total + meal.calories, 0)} calories
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-xl font-bold text-white mb-6">Add New Meal</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Member</label>
                <select
                  name="member"
                  value={mealForm.member}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Member</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Mike Wilson">Mike Wilson</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Day</label>
                  <select
                    name="day"
                    value={mealForm.day}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Meal Type</label>
                  <select
                    name="mealType"
                    value={mealForm.mealType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Foods</label>
                <input
                  type="text"
                  name="foods"
                  value={mealForm.foods}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Chicken breast, Rice, Broccoli"
                  required
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Calories</label>
                  <input
                    type="number"
                    name="calories"
                    value={mealForm.calories}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    name="protein"
                    value={mealForm.protein}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    name="carbs"
                    value={mealForm.carbs}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Fat (g)</label>
                  <input
                    type="number"
                    name="fat"
                    value={mealForm.fat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMeal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanning;