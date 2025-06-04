import apiService from "../utils/APIService";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SessionService from "../utils/SessionService";

function EditCourse() {
    const location = useLocation();
    const course = location.state?.course;
    const navigate = useNavigate();
    const [courseForm, setCourseForm] = useState({
        category: course?.category || '',
        startTime: course?.startTime || '',
        endTime: course?.endTime || '',
        capacity: course?.capacity || '',
        price: course?.price || '',
        coach:SessionService.getUsername(),
        place: { id: course?.place?.id || null },

    });
    const [errors, setErrors] = useState({});

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

    const handleValidate = () => {
        if (!validateForm()) return;
        courseForm.capacity=parseInt(courseForm.capacity)
        courseForm.price=parseFloat(courseForm.price)

        if (!course) {
            // Create course
            apiService.postRequest("/courses", courseForm)
                .then(response => {
                    setCourseForm(response.data);
                    navigate(`/reservation/${response.data.id}`);
                })
                .catch(error => {
                    console.error('Erreur détectée :', error);
                    navigate('/error', { state: error.status });
                });
        } else {
            // Update course
            apiService.patchMultipartRequest(`/courses/${course.id}`, courseForm)
                .then(response => {
                    setCourseForm(response.data);
                    navigate(`/reservation/${response.data.id}`);
                })
                .catch(error => {
                    console.error('Erreur détectée :', error);
                    navigate('/error', { state: error.status });
                });
        }
    };

    const handleChanges = (e) => {
        const value = e.target.value === '' ? null : e.target.value;
        setCourseForm(prev => ({ ...prev, [e.target.name]: value }));

        if (errors[e.target.name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [e.target.name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!courseForm.price) newErrors.price = 'Price is required';
        if (!courseForm.startTime) newErrors.startTime = 'Start time is required';
        if (!courseForm.endTime) newErrors.endTime = 'End time is required';
        if (!courseForm.capacity) newErrors.capacity = 'Capacity is required';
        if (!courseForm.category) newErrors.category = 'Category is required';

        if (courseForm.price && !parseFloat(courseForm.price))
            newErrors.price = 'Price must be an number';
        if (courseForm.capacity && !parseInt(courseForm.capacity))
            newErrors.capacity = 'Capacity must be an integer';
        if (courseForm.startTime && new Date(courseForm.startTime)<=Date.now())
            newErrors.startTime = 'Course must begin later';
        if (courseForm.endTime && new Date(courseForm.endTime)<=courseForm.startTime)
            newErrors.endTime = 'Course must begin before ending';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{course ? "Update" : "Create"} Course</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category (combobox) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select
                        name="category"
                        value={courseForm.category}
                        onChange={handleChanges}
                        className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                    >
                        <option value="">-- Select --</option>
                        {courseTypes.map((type, index) => (
                            <option key={index} value={type}>{type.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                    <input
                        name="price"
                        type="text"
                        value={courseForm.price}
                        onChange={handleChanges}
                        required
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>


                {/* Start Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time*</label>
                    <input
                        name="startTime"
                        type="datetime-local"
                        value={courseForm.startTime}
                        onChange={handleChanges}
                        required
                        className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                    />
                    {errors.startTime && <div className="invalid-feedback">{errors.startTime}</div>}
                </div>

                {/* End Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time*</label>
                    <input
                        name="endTime"
                        type="datetime-local"
                        value={courseForm.endTime}
                        onChange={handleChanges}
                        required
                        className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                    />
                    {errors.endTime && <div className="invalid-feedback">{errors.endTime}</div>}
                </div>

                {/* Capacity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity*</label>
                    <input
                        name="capacity"
                        type="text"
                        value={courseForm.capacity}
                        onChange={handleChanges}
                        required
                        className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                    />
                    {errors.capacity && <div className="invalid-feedback">{errors.capacity}</div>}
                </div>

            </div>

            <div>*required</div>

            <div className="pt-6 text-right">
                <button
                    onClick={handleValidate}
                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg transition"
                >
                    {course ? "Update" : "Create"}
                </button>
            </div>
        </div>
    );
}

export default EditCourse;
