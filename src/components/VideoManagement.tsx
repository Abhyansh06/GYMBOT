import React, { useState } from 'react';
import { Video, Upload, Play, Edit, Trash2, Search, Filter, Plus, Eye, Download, Share2, Clock, Users, BarChart3, CheckCircle, AlertTriangle, Camera, FileVideo, Link, Settings } from 'lucide-react';

const VideoManagement = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Perfect Squat Form',
      exercise: 'Squats',
      category: 'Legs',
      duration: '2:45',
      uploadDate: '2024-01-15',
      status: 'Active',
      views: 1247,
      thumbnail: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://example.com/squat-demo.mp4',
      description: 'Learn proper squat technique with step-by-step guidance',
      difficulty: 'Beginner',
      equipment: ['None'],
      muscleGroups: ['Quadriceps', 'Glutes', 'Core'],
      tips: [
        'Keep your back straight and chest up',
        'Lower until thighs are parallel to floor',
        'Drive through your heels to stand'
      ]
    },
    {
      id: 2,
      title: 'Bench Press Technique',
      exercise: 'Bench Press',
      category: 'Chest',
      duration: '3:20',
      uploadDate: '2024-01-12',
      status: 'Active',
      views: 892,
      thumbnail: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://example.com/bench-press-demo.mp4',
      description: 'Master the bench press with proper form and safety tips',
      difficulty: 'Intermediate',
      equipment: ['Barbell', 'Bench'],
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      tips: [
        'Keep shoulder blades retracted',
        'Lower bar to chest with control',
        'Press up explosively'
      ]
    },
    {
      id: 3,
      title: 'Deadlift Fundamentals',
      exercise: 'Deadlifts',
      category: 'Back',
      duration: '4:15',
      uploadDate: '2024-01-10',
      status: 'Active',
      views: 1456,
      thumbnail: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://example.com/deadlift-demo.mp4',
      description: 'Complete deadlift guide from setup to execution',
      difficulty: 'Advanced',
      equipment: ['Barbell', 'Plates'],
      muscleGroups: ['Hamstrings', 'Glutes', 'Back', 'Core'],
      tips: [
        'Keep bar close to your body',
        'Hinge at hips first, then knees',
        'Maintain neutral spine'
      ]
    },
    {
      id: 4,
      title: 'Push-up Variations',
      exercise: 'Push-ups',
      category: 'Chest',
      duration: '5:30',
      uploadDate: '2024-01-08',
      status: 'Draft',
      views: 0,
      thumbnail: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://example.com/pushup-demo.mp4',
      description: 'Multiple push-up variations for all fitness levels',
      difficulty: 'Beginner',
      equipment: ['None'],
      muscleGroups: ['Chest', 'Triceps', 'Core'],
      tips: [
        'Keep body in straight line',
        'Lower chest to floor',
        'Push up explosively'
      ]
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    exercise: '',
    category: '',
    description: '',
    difficulty: '',
    equipment: '',
    muscleGroups: '',
    tips: '',
    videoFile: null as File | null,
    thumbnailFile: null as File | null
  });

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Functional'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({
        ...prev,
        [type === 'video' ? 'videoFile' : 'thumbnailFile']: file
      }));
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newVideo = {
      id: videos.length + 1,
      title: uploadForm.title,
      exercise: uploadForm.exercise,
      category: uploadForm.category,
      duration: '0:00', // Would be calculated from actual video
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Processing' as const,
      views: 0,
      thumbnail: uploadForm.thumbnailFile ? URL.createObjectURL(uploadForm.thumbnailFile) : 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: uploadForm.videoFile ? URL.createObjectURL(uploadForm.videoFile) : '',
      description: uploadForm.description,
      difficulty: uploadForm.difficulty,
      equipment: uploadForm.equipment.split(',').map(item => item.trim()),
      muscleGroups: uploadForm.muscleGroups.split(',').map(item => item.trim()),
      tips: uploadForm.tips.split('\n').filter(tip => tip.trim())
    };

    setVideos(prev => [newVideo, ...prev]);
    setShowUploadModal(false);
    setUploadForm({
      title: '',
      exercise: '',
      category: '',
      description: '',
      difficulty: '',
      equipment: '',
      muscleGroups: '',
      tips: '',
      videoFile: null,
      thumbnailFile: null
    });
  };

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.exercise.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'Draft': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Draft': return <Edit className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Video Management</h2>
          <p className="text-blue-200">Manage workout demonstration videos for WhatsApp bot</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Video
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500">
              <Video className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{videos.length}</h3>
          <p className="text-blue-200 text-sm">Total Videos</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{videos.filter(v => v.status === 'Active').length}</h3>
          <p className="text-blue-200 text-sm">Active Videos</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{videos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}</h3>
          <p className="text-blue-200 text-sm">Total Views</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-500">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{Math.round(videos.reduce((sum, v) => sum + v.views, 0) / videos.length)}</h3>
          <p className="text-blue-200 text-sm">Avg Views</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>

          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all">
            {/* Video Thumbnail */}
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg cursor-pointer">
                  <Play className="w-6 h-6 text-gray-800" />
                </div>
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </div>
              
              {/* Status Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(video.status)}`}>
                {getStatusIcon(video.status)}
                {video.status}
              </div>

              {/* Difficulty Badge */}
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                {video.difficulty}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white text-lg">{video.title}</h3>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mb-3">{video.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <span className="font-medium">Exercise:</span>
                  <span>{video.exercise}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <span className="font-medium">Category:</span>
                  <span>{video.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <span className="font-medium">Equipment:</span>
                  <span>{video.equipment.join(', ')}</span>
                </div>
              </div>

              {/* Muscle Groups */}
              <div className="mb-4">
                <div className="text-sm font-medium text-blue-200 mb-2">Target Muscles:</div>
                <div className="flex flex-wrap gap-1">
                  {video.muscleGroups.map((muscle, index) => (
                    <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-blue-200 mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.uploadDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                  <Play className="w-3 h-3" />
                  Preview
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-1">
                  <Share2 className="w-3 h-3" />
                  Share
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  <Download className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">Upload Workout Video</h3>
            
            <form onSubmit={handleUpload} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Video Title</label>
                  <input
                    type="text"
                    name="title"
                    value={uploadForm.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Perfect Squat Form"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Exercise Name</label>
                  <input
                    type="text"
                    name="exercise"
                    value={uploadForm.exercise}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Squats"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Category</label>
                  <select
                    name="category"
                    value={uploadForm.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Difficulty</label>
                  <select
                    name="difficulty"
                    value={uploadForm.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Difficulty</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Description</label>
                <textarea
                  name="description"
                  value={uploadForm.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the exercise and what viewers will learn..."
                  required
                />
              </div>

              {/* Equipment and Muscle Groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Equipment Required</label>
                  <input
                    type="text"
                    name="equipment"
                    value={uploadForm.equipment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Barbell, Bench (comma separated)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Target Muscle Groups</label>
                  <input
                    type="text"
                    name="muscleGroups"
                    value={uploadForm.muscleGroups}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Quadriceps, Glutes, Core (comma separated)"
                    required
                  />
                </div>
              </div>

              {/* Tips */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Form Tips</label>
                <textarea
                  name="tips"
                  value={uploadForm.tips}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter each tip on a new line..."
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Video File</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'video')}
                      className="hidden"
                      id="video-upload"
                      required
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <FileVideo className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-200 text-sm">
                        {uploadForm.videoFile ? uploadForm.videoFile.name : 'Click to upload video'}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">MP4, MOV, AVI (Max 100MB)</p>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Thumbnail Image</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'thumbnail')}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label htmlFor="thumbnail-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-200 text-sm">
                        {uploadForm.thumbnailFile ? uploadForm.thumbnailFile.name : 'Click to upload thumbnail'}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">JPG, PNG (Optional)</p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoManagement;