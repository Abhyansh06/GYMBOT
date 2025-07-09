import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, ArrowLeft, Calendar, Clock, Dumbbell, Target, CheckCircle, Play, Camera, Mic, Paperclip, Star, Trophy, Siren as Fire, Heart, Zap, Timer, Volume2, AlertTriangle, CreditCard, Lock, X } from 'lucide-react';

const WhatsAppBotDemo = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'received',
      content: 'Welcome back, Alex! 💪 Ready to crush today\'s workout? I\'ve got your personalized training plan ready. You\'re on a 12-day streak - let\'s keep it going! 🔥\n\nType "menu" to explore all features or "my workouts" to jump right in!',
      timestamp: '10:30 AM',
      isBot: true
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userStats, setUserStats] = useState({
    streak: 12,
    totalWorkouts: 78,
    caloriesBurned: 18750,
    currentWeight: 72.5,
    goalWeight: 70,
    memberName: 'Alex Rodriguez'
  });

  // Active membership status
  const [membershipStatus, setMembershipStatus] = useState({
    isActive: true,
    expiryDate: '2024-08-15',
    daysRemaining: 180,
    membershipType: 'Premium',
    autoRenewal: true,
    lastPayment: '2024-01-15',
    amount: '$49.99'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced exercise database with more details
  const exerciseDatabase = {
    'squats': {
      name: 'Squats',
      videoUrl: 'https://example.com/squat-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'Intermediate',
      muscleGroups: ['Quadriceps', 'Glutes', 'Core'],
      caloriesPerRep: 0.5,
      tips: [
        'Keep your back straight and chest up',
        'Lower until thighs are parallel to floor',
        'Drive through your heels to stand',
        'Keep knees aligned with toes'
      ]
    },
    'bench_press': {
      name: 'Bench Press',
      videoUrl: 'https://example.com/bench-press-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'Advanced',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      caloriesPerRep: 0.8,
      tips: [
        'Keep shoulder blades retracted',
        'Lower bar to chest with control',
        'Press up explosively',
        'Maintain tight core throughout'
      ]
    },
    'deadlifts': {
      name: 'Deadlifts',
      videoUrl: 'https://example.com/deadlift-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'Advanced',
      muscleGroups: ['Hamstrings', 'Glutes', 'Back', 'Core'],
      caloriesPerRep: 1.2,
      tips: [
        'Keep bar close to your body',
        'Hinge at hips first, then knees',
        'Maintain neutral spine',
        'Squeeze glutes at the top'
      ]
    },
    'push_ups': {
      name: 'Push-ups',
      videoUrl: 'https://example.com/pushup-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'Beginner',
      muscleGroups: ['Chest', 'Triceps', 'Core'],
      caloriesPerRep: 0.3,
      tips: [
        'Keep body in straight line',
        'Lower chest to floor',
        'Push up explosively',
        'Engage core throughout'
      ]
    },
    'plank': {
      name: 'Plank',
      videoUrl: 'https://example.com/plank-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'Beginner',
      muscleGroups: ['Core', 'Shoulders'],
      caloriesPerRep: 0.2,
      tips: [
        'Keep body straight from head to heels',
        'Engage core muscles',
        'Don\'t let hips sag',
        'Breathe steadily'
      ]
    },
    'pull_ups': {
      name: 'Pull-ups',
      videoUrl: 'https://example.com/pullup-demo.mp4',
      thumbnail: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'Advanced',
      muscleGroups: ['Lats', 'Biceps', 'Core'],
      caloriesPerRep: 0.7,
      tips: [
        'Start from dead hang position',
        'Pull chest to bar',
        'Control the descent',
        'Engage core throughout'
      ]
    }
  };

  const createExerciseMessage = (exerciseKey: string, sets: string, reps: string, weight: string) => {
    const exercise = exerciseDatabase[exerciseKey as keyof typeof exerciseDatabase];
    return {
      type: 'exercise',
      exercise: {
        ...exercise,
        sets,
        reps,
        weight,
        exerciseKey
      }
    };
  };

  const createProgressMessage = () => {
    return {
      type: 'progress',
      stats: userStats
    };
  };

  const createNutritionMessage = () => {
    return {
      type: 'nutrition',
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: ['Protein pancakes', 'Greek yogurt', 'Blueberries', 'Almonds'],
          calories: 420,
          protein: 28,
          carbs: 35,
          fat: 18,
          completed: true
        },
        {
          name: 'Pre-Workout',
          time: '9:30 AM',
          foods: ['Banana', 'Black coffee'],
          calories: 120,
          protein: 2,
          carbs: 28,
          fat: 0,
          completed: true
        },
        {
          name: 'Post-Workout',
          time: '11:00 AM',
          foods: ['Protein shake', 'Apple'],
          calories: 280,
          protein: 25,
          carbs: 30,
          fat: 5,
          completed: false
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          foods: ['Grilled chicken breast', 'Quinoa', 'Roasted vegetables'],
          calories: 580,
          protein: 45,
          carbs: 50,
          fat: 18,
          completed: false
        },
        {
          name: 'Snack',
          time: '4:00 PM',
          foods: ['Greek yogurt', 'Mixed nuts'],
          calories: 220,
          protein: 15,
          carbs: 12,
          fat: 14,
          completed: false
        },
        {
          name: 'Dinner',
          time: '7:30 PM',
          foods: ['Salmon fillet', 'Sweet potato', 'Asparagus'],
          calories: 520,
          protein: 35,
          carbs: 40,
          fat: 22,
          completed: false
        }
      ]
    };
  };

  const createMembershipMessage = () => {
    return {
      type: 'membership',
      membership: membershipStatus
    };
  };

  const createWorkoutPlanMessage = () => {
    return {
      type: 'workout_plan',
      plan: {
        name: 'Upper Body Power',
        duration: '55 minutes',
        difficulty: 'Intermediate',
        targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
        estimatedCalories: 420,
        exercises: [
          { name: 'Bench Press', sets: '4', reps: '6-8', weight: '75kg', restTime: '2-3 min' },
          { name: 'Pull-ups', sets: '4', reps: '8-10', weight: 'Bodyweight', restTime: '2 min' },
          { name: 'Overhead Press', sets: '3', reps: '8-10', weight: '45kg', restTime: '90 sec' },
          { name: 'Barbell Rows', sets: '3', reps: '10-12', weight: '60kg', restTime: '90 sec' },
          { name: 'Dips', sets: '3', reps: '12-15', weight: 'Bodyweight', restTime: '60 sec' },
          { name: 'Bicep Curls', sets: '3', reps: '12-15', weight: '15kg', restTime: '60 sec' }
        ]
      }
    };
  };

  const botResponses = {
    'menu': {
      content: `🏠 *GymPro Main Menu* - Welcome ${userStats.memberName}!

🏋️ *WORKOUTS*
• "my workouts" - Today's training plan
• "start workout" - Begin guided session
• "exercise library" - Browse 200+ exercises
• "workout history" - View past sessions

📊 *TRACKING & PROGRESS*
• "progress" - Your amazing journey stats
• "log workout" - Record completed session
• "body measurements" - Track physical changes
• "achievements" - View unlocked badges

🍽️ *NUTRITION & WELLNESS*
• "meals" - Today's personalized meal plan
• "calories" - Detailed calorie tracking
• "water" - Hydration monitoring
• "supplements" - Recommended stack

🎯 *GOALS & CHALLENGES*
• "goals" - Current fitness objectives
• "challenges" - Join community challenges
• "leaderboard" - See your ranking
• "motivation" - Daily inspiration

💳 *MEMBERSHIP & PROFILE*
• "membership" - Premium account status
• "profile" - Update personal info
• "preferences" - Customize experience

⚙️ *SUPPORT & SETTINGS*
• "help" - Get instant support
• "settings" - Adjust notifications
• "feedback" - Share your thoughts

You're crushing it with a ${userStats.streak}-day streak! 🔥 What would you like to do today?`,
      delay: 1500
    },

    'my workouts': {
      content: `🏋️ *Today's Workout - Upper Body Power*
⏱️ Duration: 55 minutes
🎯 Focus: Chest, Back, Shoulders, Arms
🔥 Estimated calories: 420
💪 Difficulty: Intermediate

*Perfect for your current fitness level!*

Your workout is optimized based on your recent progress and recovery data. Ready to build some serious strength? 💪`,
      delay: 2000,
      followUp: [createWorkoutPlanMessage()]
    },

    'start workout': {
      content: `🔥 *Workout Session Started!*

*Warm-up Phase (5 minutes)*
✅ Dynamic stretching complete
✅ Joint mobility done
✅ Heart rate elevated

*Ready for Exercise 1/6: Bench Press*
🎯 Target: 4 sets × 6-8 reps (75kg)
⏱️ Rest: 2-3 minutes between sets
📱 Timer and form tracking activated

Watch the HD demonstration and follow my real-time coaching cues! I'll track every rep and guide you through perfect form. 

Ready to lift? Hit "Start Set 1" when you're in position! 💪`,
      delay: 1500,
      followUp: [
        createExerciseMessage('bench_press', 'Set 1/4', '6-8 reps', '75kg')
      ]
    },

    'progress': {
      content: `📊 *Your Incredible Fitness Journey*

${userStats.memberName}, you're absolutely crushing your goals! Here's your amazing progress:`,
      delay: 1500,
      followUp: [createProgressMessage()]
    },

    'meals': {
      content: `🍽️ *Today's Personalized Nutrition Plan*

Your meal plan is perfectly calibrated for your training goals and metabolic needs. You're doing great with your nutrition consistency! 🌟`,
      delay: 1800,
      followUp: [createNutritionMessage()]
    },

    'goals': {
      content: `🎯 *Your Fitness Goals Dashboard*

*Primary Goals (2024):*
🏃 Reach 70kg body weight (2.5kg to go!) ✨
💪 Bench press 100kg (Current: 75kg - 75% complete!)
⏱️ Run 5K under 22 mins (Current: 24:30)
🔥 Maintain 6-day workout schedule (Currently: 5.8/week ✅)

*Monthly Challenge:*
🏆 Complete 25 workouts this month (18/25 done - 72%)

*Recent Achievements Unlocked:*
🥇 Consistency Master (12-day streak)
🥇 Strength Warrior (50+ workouts completed)
🥇 Nutrition Champion (90% meal plan adherence)
🥇 Early Bird (10 morning workouts)

*This Week's Mini Goals:*
• Complete 6 workouts ✅ (6/6 done!)
• Hit protein target daily ✅ (6/7 days)
• 8+ hours sleep ⚠️ (5/7 nights)
• 3L water daily ✅ (Perfect week!)

You're absolutely smashing it! Ready to set a new challenge? 🚀`,
      delay: 2200
    },

    'calories': {
      content: `🔥 *Calorie & Macro Dashboard*

*Today's Nutrition Balance:*
📊 Consumed: 1,420 / 2,200 cal (65%)
🔥 Burned: 420 cal (workout) + 1,800 (BMR)
📈 Net: 1,000 cal
🎯 Target Deficit: 500 cal ✅ Exceeded!

*Macronutrient Breakdown:*
🥩 Protein: 95g / 165g (58%) - Great start!
🍞 Carbs: 125g / 220g (57%) - On track
🥑 Fat: 43g / 75g (57%) - Perfect balance

*Meal Progress Today:*
✅ Breakfast: 420 cal (High protein ✨)
✅ Pre-workout: 120 cal (Perfect timing)
⏳ Post-workout: 280 cal (Due now!)
⏳ Lunch: 580 cal (1:00 PM planned)
⏳ Snack: 220 cal (4:00 PM planned)
⏳ Dinner: 520 cal (7:30 PM planned)

*Weekly Average:*
📊 Daily calories: 2,180 (Target: 2,200) ✅
🎯 Deficit achieved: 6/7 days ✅
📈 Weight trend: -0.3kg this week! 🎉

You're absolutely nailing your nutrition goals! Time for that post-workout meal? 💪`,
      delay: 2000
    },

    'exercise library': {
      content: `📚 *Exercise Library - 200+ HD Demonstrations*

*Popular Categories:*
💪 Chest (25 exercises)
🏋️ Back (30 exercises)
🦵 Legs (35 exercises)
💥 Shoulders (20 exercises)
💪 Arms (25 exercises)
🔥 Core (30 exercises)
🏃 Cardio (35 exercises)

*Featured This Week:*
⭐ Advanced Bench Press Variations
⭐ Pull-up Progressions
⭐ Core Stability Series

*Your Recent Favorites:*
• Incline Dumbbell Press
• Weighted Pull-ups
• Bulgarian Split Squats

Each exercise includes:
🎥 HD video demonstration
📋 Step-by-step instructions
💡 Pro tips & common mistakes
📊 Muscle activation guide
⚡ Calorie burn estimate

Search by muscle group, equipment, or difficulty level! What would you like to explore? 🔍`,
      delay: 2000
    },

    'achievements': {
      content: `🏆 *Achievement Gallery*

*Recently Unlocked:*
🥇 **Consistency Master** (12-day streak)
   _Completed workouts for 12 consecutive days_
   
🥇 **Strength Warrior** (50+ workouts)
   _Reached 78 total workout sessions_
   
🥇 **Nutrition Champion** (90% adherence)
   _Maintained excellent meal plan consistency_

*Progress Towards Next Achievements:*
🥈 **Iron Will** (20-day streak) - 8 days to go!
🥈 **Century Club** (100 workouts) - 22 workouts to go!
🥈 **Transformation** (5kg weight loss) - 2.5kg to go!

*Rare Achievements Available:*
💎 **Perfect Week** - 7 days of complete goals
💎 **Beast Mode** - 30-day workout streak
💎 **Nutrition Ninja** - 30 days perfect macros

*Your Achievement Stats:*
🏅 Total Achievements: 12
🎯 Completion Rate: 85%
🔥 Streak Record: 12 days (Current!)
⭐ Rare Achievements: 3

Keep pushing! You're so close to some amazing milestones! 🚀`,
      delay: 2200
    },

    'water': {
      content: `💧 *Hydration Tracker*

*Today's Water Intake:*
🥤 2.1L / 3.0L completed (70%)
💪 Pre-workout: ✅ 500ml
🏋️ During workout: ⏳ 300ml (recommended)
🍽️ With meals: ✅ 800ml
🌟 Throughout day: ✅ 500ml

*Hydration Schedule:*
⏰ 7:00 AM - Wake up (500ml) ✅
⏰ 9:30 AM - Pre-workout (500ml) ✅
⏰ 11:00 AM - During workout (300ml) ⏳
⏰ 1:00 PM - With lunch (300ml) ⏳
⏰ 4:00 PM - Afternoon (400ml) ⏳
⏰ 7:30 PM - With dinner (300ml) ⏳
⏰ 9:00 PM - Evening (200ml) ⏳

*Hydration Tips:*
💡 Add lemon for vitamin C boost
💡 Drink 500ml upon waking
💡 Monitor urine color (pale yellow = good!)
💡 Increase intake on workout days

*Weekly Progress:*
📊 Daily average: 2.8L ✅
🎯 Target achieved: 6/7 days
🏆 Best day: 3.4L (Tuesday)

Stay hydrated, stay strong! 💪💧`,
      delay: 1200
    },

    'membership': {
      content: `💳 *Premium Membership Status*

Here's your membership overview:`,
      delay: 1000,
      followUp: [createMembershipMessage()]
    },

    'motivation': {
      content: `🔥 *Daily Motivation Boost*

"${userStats.memberName}, you're not just working out - you're building the strongest version of yourself!"

🌟 *Today's Wins:*
• 12-day workout streak! 🔥
• Completed morning workout ✅
• Hit protein target for breakfast 💪
• Stayed hydrated all morning 💧

*Your Progress This Month:*
📈 Weight: -1.2kg (Amazing!)
💪 Strength: +15% on major lifts
🏃 Cardio: 2 minutes faster 5K time
🎯 Consistency: 96% workout adherence

*Remember:*
• Every rep builds character 💪
• Every healthy choice compounds 🌱
• Every day you're getting stronger 🚀
• Your future self will thank you 🙏

*Quote of the Day:*
"The only bad workout is the one that didn't happen. You showed up today - that's what champions do!"

What's your next move, champion? Ready to conquer the day? 🏆`,
      delay: 2000
    },

    'challenges': {
      content: `🏆 *Community Challenges*

*Active Challenges:*

🔥 **February Fitness Frenzy**
   Complete 25 workouts this month
   Progress: 18/25 (72%) - You're in 3rd place! 🥉
   Reward: Premium supplement package
   
💪 **Strength Stack Challenge**
   Increase your bench press by 10kg
   Progress: 7.5kg / 10kg (75%)
   Reward: Custom workout plan
   
🏃 **Cardio Crusher**
   Run 50km total this month
   Progress: 32km / 50km (64%)
   Reward: Premium running gear

*Weekly Mini-Challenges:*
⚡ Perfect Week (Complete all planned workouts) - 6/6 ✅
🥗 Nutrition Ninja (Hit all macro targets) - 5/7 days
💧 Hydration Hero (3L water daily) - 6/7 days ✅

*Leaderboard Position:*
🥇 Overall Ranking: #8 out of 247 members
🔥 Streak Ranking: #3 (12 days)
💪 Strength Ranking: #12
🏃 Cardio Ranking: #15

*Upcoming Challenges:*
🌟 March Madness (Starting March 1st)
🏋️ Spring Strength Series (Starting March 15th)

You're absolutely dominating! Keep pushing! 🚀`,
      delay: 2500
    },

    'help': {
      content: `🆘 *GymPro Premium Support*

Hi ${userStats.memberName}! How can I help you today?

📞 *Instant Support Options:*
• Live chat with trainers (Available now!)
• Video call consultation (Book 15-min slot)
• Phone support: (555) 123-4567

⏰ *Support Hours:*
• Monday-Friday: 5 AM - 11 PM
• Saturday-Sunday: 6 AM - 10 PM
• Emergency support: 24/7

🔧 *Quick Help Topics:*
• "form check" - Exercise technique help
• "nutrition help" - Meal planning assistance
• "equipment help" - Home gym setup
• "injury prevention" - Safety guidance
• "plateau help" - Break through barriers

💬 *Popular Questions:*
• How to modify workouts for home?
• Best post-workout nutrition timing?
• How to track progress effectively?
• Equipment recommendations?

🎯 *Personal Trainer Access:*
Your assigned trainer: Coach Sarah
Next check-in: Tomorrow 2:00 PM
Quick message: Type "coach sarah"

*Premium Perks:*
✅ Priority support response
✅ Personal trainer access
✅ Custom workout modifications
✅ Nutrition consultation included

How can I assist you today? 🤝`,
      delay: 1500
    },

    'workout history': {
      content: `📈 *Workout History & Analytics*

*This Week's Sessions:*
✅ Mon: Upper Body Power (55 min) - Excellent!
✅ Tue: HIIT Cardio (30 min) - Beast mode! 🔥
✅ Wed: Lower Body Strength (60 min) - PR day!
✅ Thu: Active Recovery Yoga (25 min) - Perfect
✅ Fri: Push/Pull Split (50 min) - Strong finish
✅ Sat: Full Body HIIT (40 min) - Amazing energy
⏳ Sun: Rest Day (Planned)

*Recent Personal Records:*
🏆 Bench Press: 75kg (+2.5kg from last month)
🏆 Deadlift: 95kg (+5kg from last month)
🏆 5K Run: 24:30 (-45 seconds improvement)
🏆 Plank Hold: 3:15 (+30 seconds)

*Weekly Stats:*
📊 Total workout time: 4h 20min
🔥 Calories burned: 2,450
💪 Strength sessions: 4
🏃 Cardio sessions: 2
🧘 Recovery sessions: 1

*Monthly Trends:*
📈 Workout frequency: +15%
💪 Average intensity: +12%
⏱️ Session duration: Consistent 45-55min
🎯 Goal completion: 94%

*Favorite Workouts:*
1. Upper Body Power (8 times)
2. HIIT Cardio (6 times)
3. Full Body Strength (5 times)

Your consistency is incredible! 🌟`,
      delay: 2000
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'sent' as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Bot response
    const response = botResponses[inputMessage.toLowerCase() as keyof typeof botResponses];
    if (response) {
      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: messages.length + 2,
          type: 'received' as const,
          content: response.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);

        // Add follow-up messages
        if (response.followUp) {
          response.followUp.forEach((followUp, index) => {
            setTimeout(() => {
              const followUpMessage = {
                id: messages.length + 3 + index,
                type: followUp.type as const,
                content: '',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isBot: true,
                ...followUp
              };
              setMessages(prev => [...prev, followUpMessage]);
            }, (index + 1) * 800);
          });
        }
      }, response.delay);
    } else {
      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: messages.length + 2,
          type: 'received' as const,
          content: `I didn't quite catch that! 🤔 Try typing "menu" to see all available options, or ask me about workouts, nutrition, progress, or any fitness-related questions! I'm here to help you crush your goals! 💪`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const ExerciseCard = ({ exercise }: { exercise: any }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <img 
          src={exercise.thumbnail} 
          alt={`${exercise.name} demonstration`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg cursor-pointer hover:bg-opacity-100 transition-all">
            <Play className="w-6 h-6 text-gray-800" />
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          HD VIDEO
        </div>
        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
          {exercise.difficulty}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-gray-800">{exercise.name}</h4>
          <div className="flex items-center gap-1">
            <Fire className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-gray-600">{exercise.caloriesPerRep}/rep</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-600 mb-3">
          🎯 {exercise.muscleGroups?.join(', ')}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
          <div className="text-center bg-blue-50 rounded p-2">
            <div className="font-semibold text-blue-600">{exercise.sets}</div>
            <div className="text-gray-600 text-xs">Sets</div>
          </div>
          <div className="text-center bg-green-50 rounded p-2">
            <div className="font-semibold text-green-600">{exercise.reps}</div>
            <div className="text-gray-600 text-xs">Reps</div>
          </div>
          <div className="text-center bg-purple-50 rounded p-2">
            <div className="font-semibold text-purple-600">{exercise.weight}</div>
            <div className="text-gray-600 text-xs">Weight</div>
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">💡 Form Tips:</div>
          {exercise.tips?.map((tip: string, index: number) => (
            <div key={index} className="text-xs text-gray-600 flex items-start gap-1">
              <span className="text-green-500 mt-0.5">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-green-500 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1">
            <Play className="w-3 h-3" />
            Watch Demo
          </button>
          <button className="bg-blue-100 text-blue-600 py-2 px-3 rounded text-sm hover:bg-blue-200 transition-colors flex items-center gap-1">
            <Timer className="w-3 h-3" />
            Start Set
          </button>
          <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded text-sm hover:bg-gray-200 transition-colors">
            <Volume2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  const WorkoutPlanCard = ({ plan }: { plan: any }) => (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-xl">{plan.name}</h4>
          <p className="text-blue-100 text-sm">{plan.duration} • {plan.difficulty}</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-full p-2">
          <Dumbbell className="w-6 h-6" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{plan.exercises.length}</div>
          <div className="text-xs opacity-90">Exercises</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{plan.estimatedCalories}</div>
          <div className="text-xs opacity-90">Calories</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">🎯 Target Muscles:</div>
        <div className="flex flex-wrap gap-1">
          {plan.targetMuscles.map((muscle: string, index: number) => (
            <span key={index} className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
              {muscle}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-sm font-medium">📋 Exercise Preview:</div>
        {plan.exercises.slice(0, 3).map((exercise: any, index: number) => (
          <div key={index} className="bg-white bg-opacity-10 rounded p-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-medium">{exercise.name}</span>
              <span className="text-xs opacity-75">{exercise.sets} × {exercise.reps}</span>
            </div>
          </div>
        ))}
        {plan.exercises.length > 3 && (
          <div className="text-center text-sm opacity-75">
            +{plan.exercises.length - 3} more exercises
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-white bg-opacity-20 py-2 rounded text-sm font-medium hover:bg-opacity-30 transition-colors flex items-center justify-center gap-1">
          <Play className="w-3 h-3" />
          Start Workout
        </button>
        <button className="bg-white bg-opacity-20 py-2 px-3 rounded text-sm hover:bg-opacity-30 transition-colors">
          <Calendar className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  const ProgressCard = ({ stats }: { stats: any }) => (
    <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-lg">Amazing Progress!</h4>
          <p className="text-green-100 text-sm">{stats.memberName}</p>
        </div>
        <Trophy className="w-6 h-6 text-yellow-300" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Fire className="w-4 h-4 text-orange-300" />
            <span className="text-2xl font-bold">{stats.streak}</span>
          </div>
          <div className="text-xs opacity-90">Day Streak</div>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Dumbbell className="w-4 h-4 text-blue-300" />
            <span className="text-2xl font-bold">{stats.totalWorkouts}</span>
          </div>
          <div className="text-xs opacity-90">Total Workouts</div>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-lg font-bold">{stats.caloriesBurned.toLocaleString()}</span>
          </div>
          <div className="text-xs opacity-90">Calories Burned</div>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-4 h-4 text-green-300" />
            <span className="text-lg font-bold">{stats.currentWeight}kg</span>
          </div>
          <div className="text-xs opacity-90">Current Weight</div>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Weight Goal Progress</span>
          <span className="text-sm font-semibold">50%</span>
        </div>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-500"
            style={{ width: '50%' }}
          ></div>
        </div>
        <div className="text-xs mt-1 opacity-90">
          {(stats.currentWeight - stats.goalWeight).toFixed(1)}kg to go! You're halfway there! 🎉
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-white bg-opacity-20 py-2 rounded text-sm font-medium hover:bg-opacity-30 transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-white bg-opacity-20 py-2 rounded text-sm font-medium hover:bg-opacity-30 transition-colors">
          Share Progress
        </button>
      </div>
    </div>
  );

  const NutritionCard = ({ meals }: { meals: any[] }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-green-50 p-4 border-b">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-800">Today's Nutrition Plan</h4>
          <div className="text-sm text-green-600 font-medium">
            {meals.filter(m => m.completed).length}/{meals.length} completed
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Total: {meals.reduce((sum, meal) => sum + meal.calories, 0)} calories planned
        </div>
      </div>
      
      <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
        {meals.map((meal, index) => (
          <div key={index} className={`border rounded-lg p-3 ${meal.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${meal.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="font-medium text-gray-800">{meal.name}</span>
                <span className="text-xs text-gray-500">{meal.time}</span>
              </div>
              {meal.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              {meal.foods.join(', ')}
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold text-orange-600">{meal.calories}</div>
                <div className="text-gray-500">cal</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-600">{meal.protein}g</div>
                <div className="text-gray-500">protein</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">{meal.carbs}g</div>
                <div className="text-gray-500">carbs</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-600">{meal.fat}g</div>
                <div className="text-gray-500">fat</div>
              </div>
            </div>
            
            {!meal.completed && (
              <button className="w-full mt-2 bg-green-500 text-white py-1 rounded text-sm hover:bg-green-600 transition-colors">
                Mark as Eaten
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const MembershipCard = ({ membership }: { membership: any }) => (
    <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-300" />
          <div>
            <h4 className="font-bold text-lg">{membership.membershipType} Member</h4>
            <p className="text-green-100 text-sm">Active & Thriving</p>
          </div>
        </div>
        <div className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
          ACTIVE
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-sm text-green-100">Expires</div>
          <div className="font-bold">{membership.expiryDate}</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-sm text-green-100">Days Left</div>
          <div className="font-bold text-green-300">{membership.daysRemaining} days</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-sm text-green-100">Last Payment</div>
          <div className="font-bold">{membership.lastPayment}</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-sm text-green-100">Amount</div>
          <div className="font-bold">{membership.amount}</div>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto-renewal</span>
          <span className="text-green-300 font-medium">
            {membership.autoRenewal ? '✅ Enabled' : '❌ Disabled'}
          </span>
        </div>
      </div>

      <div className="bg-green-400 bg-opacity-20 rounded-lg p-3">
        <div className="flex items-center gap-2 text-green-100">
          <CheckCircle className="w-4 h-4" />
          <span className="font-medium">All Premium Features Active</span>
        </div>
        <div className="text-sm text-green-200 mt-1">
          Unlimited workouts, nutrition plans, progress tracking & more!
        </div>
      </div>
    </div>
  );

  const quickReplies = ['My Workouts', 'Progress', 'Meals', 'Start Workout', 'Goals', 'Achievements'];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      {/* WhatsApp Header */}
      <div className="bg-green-600 text-white p-4 flex items-center gap-3">
        <ArrowLeft className="w-5 h-5" />
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Dumbbell className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">GymPro AI Coach</h3>
          <p className="text-green-100 text-sm flex items-center gap-1">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            Online • Premium AI Coaching Active
          </p>
        </div>
        <div className="flex gap-4">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Premium Status Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 text-center text-white text-sm">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-4 h-4 text-yellow-300" />
          <span className="font-medium">Premium Member • {userStats.streak}-day streak! 🔥</span>
          <Star className="w-4 h-4 text-yellow-300" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto bg-gray-50 p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'exercise' ? (
              <div className="flex justify-start">
                <div className="max-w-xs">
                  <ExerciseCard exercise={message.exercise} />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ) : message.type === 'workout_plan' ? (
              <div className="flex justify-start">
                <div className="max-w-xs">
                  <WorkoutPlanCard plan={message.plan} />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ) : message.type === 'progress' ? (
              <div className="flex justify-start">
                <div className="max-w-xs">
                  <ProgressCard stats={message.stats} />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ) : message.type === 'nutrition' ? (
              <div className="flex justify-start">
                <div className="max-w-xs">
                  <NutritionCard meals={message.meals} />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ) : message.type === 'membership' ? (
              <div className="flex justify-start">
                <div className="max-w-xs">
                  <MembershipCard membership={message.membership} />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === 'sent'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.type === 'sent' ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="p-3 bg-white border-t">
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => setInputMessage(reply)}
              className="px-3 py-1 rounded-full text-sm whitespace-nowrap bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center gap-1"
            >
              {reply === 'Progress' && <Trophy className="w-3 h-3" />}
              {reply === 'My Workouts' && <Dumbbell className="w-3 h-3" />}
              {reply === 'Meals' && <Heart className="w-3 h-3" />}
              {reply === 'Goals' && <Target className="w-3 h-3" />}
              {reply === 'Achievements' && <Star className="w-3 h-3" />}
              {reply === 'Start Workout' && <Fire className="w-3 h-3" />}
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t flex items-center gap-3">
        <button className="text-gray-400 hover:text-gray-600">
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <Camera className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about workouts, nutrition, progress..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="text-gray-400 hover:text-gray-600">
          <Mic className="w-5 h-5" />
        </button>
        <button
          onClick={handleSendMessage}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppBotDemo;