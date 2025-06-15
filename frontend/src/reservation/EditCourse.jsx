import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../utils/APIService";
import SessionService from "../utils/SessionService";

const courseTypes = [
  "CARDIO_YOGA", "STRENGTH_RENFORCEMENT", "YOGA_MORNING", "AQUA_FIT",
  "MACHINE_TRAINING", "YOGA_SUNSET", "PILATES_POWER", "YOGA_DEEP",
  "MACHINE_TONE", "BOXING_KICK", "CORE_BURN", "YOGA_SUN", "DIVING_INTRO",
  "MACHINE_STRENGTH", "CARDIO_CYCLE", "CARDIO_BURN", "PILATES_MILAN",
  "DANCE_ITALIAN_FIT", "MACHINE_SCULPT", "CROSSFIT_BERLIN", "MACHINE_CORE",
  "PICKLEBALL_SPORT", "CARDIO_ROYAL", "MACHINE_FOCUS", "CARDIO_SUNRISE",
  "YOGA_WAVE", "MACHINE_WEIGHT", "TENNIS_PRO", "GOLF_ELITE",
  "PILATES_PRIVATE", "YOGA_BEACH", "AQUA_TRAINING", "CORE_PADDLE",
  "PICKLEBALL_ELITE", "RELAX_SPA", "CYCLING_ADVANCED", "CROSSFIT_PRO",
];

function EditCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const currentUser = SessionService.getUsername();
  const isCoach = SessionService.getRole() === 'coach';
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // 严格权限验证
    useEffect(() => {
    if (!isCoach) {
      navigate('/unauthorized');
      return;
    }
    
    if (course && course.coachUsername !== currentUser) {
      navigate('/unauthorized');
      return;
    }
  }, [course, currentUser, isCoach, navigate]);



   const [courseForm, setCourseForm] = useState({
    category: course?.category || '',
    startTime: course?.startTime?.slice(0, 16) || '',
    endTime: course?.endTime?.slice(0, 16) || '',
    capacity: course?.capacity?.toString() || '',
    price: course?.price?.toString() || '',
    place: course?.place || { id: null }
  });

     const handleChanges = (e) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const now = new Date();
    const start = new Date(courseForm.startTime);
    const end = new Date(courseForm.endTime);

    if (!courseForm.category) newErrors.category = 'Category is required';
    if (!courseForm.startTime) newErrors.startTime = 'Start time is required';
    if (!courseForm.endTime) newErrors.endTime = 'End time is required';
    if (!courseForm.capacity) newErrors.capacity = 'Capacity is required';
    if (!courseForm.price) newErrors.price = 'Price is required';

    if (courseForm.price && isNaN(parseFloat(courseForm.price))) {
      newErrors.price = 'Price must be a number';
    }
    if (courseForm.capacity && !Number.isInteger(Number(courseForm.capacity))) {
      newErrors.capacity = 'Capacity must be an integer';
    }
    if (courseForm.startTime && start <= now) {
      newErrors.startTime = 'Course must begin in the future';
    }
    if (courseForm.endTime && end <= start) {
      newErrors.endTime = 'Course must end after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setApiError(null);

    const submitData = {
      ...courseForm,
      capacity: parseInt(courseForm.capacity),
      price: parseFloat(courseForm.price),
      coachUsername: currentUser
    };

    try {
      let response;
      if (course) {
        // 更新现有课程
        response = await apiService.patchRequest(`/courses/${course.id}`, submitData);
      } else {
        // 创建新课程
        response = await apiService.postRequest("/courses", submitData);
      }
      
      navigate(`/reservation/${response.data.id}`);
    } catch (error) {
      console.error("API Error:", error);
      setApiError(error.response?.data?.message || "Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  if (!isCoach) return null;

  return (
    <div className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {course ? "Update Course" : "Create New Course"}
      </h2>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
          <select
            name="category"
            value={courseForm.category}
            onChange={handleChanges}
            className={`w-full p-2 border rounded-lg ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">-- Select --</option>
            {courseTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)*</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={courseForm.price}
            onChange={handleChanges}
            className={`w-full p-2 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time*</label>
          <input
            name="startTime"
            type="datetime-local"
            value={courseForm.startTime}
            onChange={handleChanges}
            className={`w-full p-2 border rounded-lg ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time*</label>
          <input
            name="endTime"
            type="datetime-local"
            value={courseForm.endTime}
            onChange={handleChanges}
            className={`w-full p-2 border rounded-lg ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity*</label>
          <input
            name="capacity"
            type="number"
            min="1"
            value={courseForm.capacity}
            onChange={handleChanges}
            className={`w-full p-2 border rounded-lg ${errors.capacity ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-2">* Required fields</div>

      <div className="pt-6 text-right">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`inline-flex items-center px-6 py-3 text-white text-sm font-semibold rounded-xl shadow-md transition ${
            loading ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            course ? "Update Course" : "Create Course"
          )}
        </button>
      </div>
    </div>
  );
}

export default EditCourse;