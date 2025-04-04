import { useState, useEffect } from 'react'
import { FiPlus, FiCheck, FiX } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import PaymentGateway from './PaymentGateway'

const CreateCourse = () => {
    // State for form
    const [courseTitle, setCourseTitle] = useState('')
    const [selectedLevel, setSelectedLevel] = useState('beginner')
    const [customCourse, setCustomCourse] = useState(false)
    const [aiGenerating, setAiGenerating] = useState(false)
    const [showPayment, setShowPayment] = useState(false)
    const [coursePrice, setCoursePrice] = useState(0)

    // Sample predefined courses
    const predefinedCourses = [
        {
            id: 1,
            title: 'Blockchain Fundamentals',
            levels: {
                beginner: [
                    { id: 1, name: 'Introduction to Blockchain', resources: ['Resource 1', 'Resource 2'] },
                    { id: 2, name: 'Cryptography Basics', resources: ['Resource 1'] }
                ],
                intermediate: [
                    { id: 3, name: 'Smart Contracts', resources: ['Resource 1', 'Resource 2', 'Resource 3'] }
                ],
                advanced: [
                    { id: 4, name: 'Consensus Algorithms', resources: ['Resource 1', 'Resource 2'] }
                ]
            }
        },
        {
            id: 2,
            title: 'Web Development',
            levels: {
                beginner: [
                    { id: 1, name: 'HTML & CSS', resources: ['Resource 1'] },
                    { id: 2, name: 'JavaScript Basics', resources: ['Resource 1', 'Resource 2'] }
                ],
                intermediate: [
                    { id: 3, name: 'React Fundamentals', resources: ['Resource 1'] }
                ],
                advanced: [
                    { id: 4, name: 'Advanced React Patterns', resources: ['Resource 1', 'Resource 2'] },
                    { id: 5, name: 'State Management', resources: ['Resource 1'] }
                ]
            }
        }
    ]

    // State for selected course and modules
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedModules, setSelectedModules] = useState([])
    const [aiGeneratedContent, setAiGeneratedContent] = useState(null)

    // Handle course selection
    const handleCourseSelect = (course) => {
        setSelectedCourse(course)
        setCustomCourse(false)
        setAiGeneratedContent(null)
        setSelectedModules([])
    }

    // Handle module selection
    const toggleModuleSelection = (module) => {
        setSelectedModules(prev => {
            const isSelected = prev.some(m => m.id === module.id)
            if (isSelected) {
                return prev.filter(m => m.id !== module.id)
            } else {
                return [...prev, module]
            }
        })
    }

    // Generate AI content
    const generateAIContent = async () => {
        if (!courseTitle.trim()) {
            toast.error('Please enter a course title')
            return
        }

        setAiGenerating(true)
        try {
            // Simulate API call to AI service
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Mock AI response - in real app, this would come from your backend
            const mockAIResponse = {
                beginner: [
                    { id: 1, name: `Introduction to ${courseTitle}`, resources: ['Resource 1', 'Resource 2'] },
                    { id: 2, name: `${courseTitle} Basics`, resources: ['Resource 1'] }
                ],
                intermediate: [
                    { id: 3, name: `Intermediate ${courseTitle} Concepts`, resources: ['Resource 1', 'Resource 2'] }
                ],
                advanced: [
                    { id: 4, name: `Advanced ${courseTitle} Techniques`, resources: ['Resource 1', 'Resource 2', 'Resource 3'] }
                ]
            }

            setAiGeneratedContent(mockAIResponse)
            setSelectedCourse({
                title: courseTitle,
                levels: mockAIResponse
            })
            toast.success('AI generated course content successfully!')
        } catch (error) {
            toast.error('Failed to generate AI content')
            console.error(error)
        } finally {
            setAiGenerating(false)
        }
    }

    // Calculate price based on selected modules
    useEffect(() => {
        const price = selectedModules.length * 500 // ₹500 per module
        setCoursePrice(price)
    }, [selectedModules])

    // Handle payment success
    const handlePaymentSuccess = (response) => {
        toast.success('Payment successful! Course enrolled.')
        // Here you would typically redirect to the course dashboard
        console.log('Payment response:', response)
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h1>

            {!showPayment ? (
                <div className="bg-white shadow rounded-lg p-6">
                    {/* Step 1: Course Selection */}
                    <div className="mb-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">1. Choose a Course</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {predefinedCourses.map(course => (
                                <div
                                    key={course.id}
                                    onClick={() => handleCourseSelect(course)}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedCourse?.id === course.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                                </div>
                            ))}

                            <div
                                onClick={() => {
                                    setSelectedCourse(null)
                                    setCustomCourse(true)
                                    setAiGeneratedContent(null)
                                }}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${customCourse ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <FiPlus className="mr-2 text-indigo-600" />
                                    <span>Custom Course</span>
                                </div>
                            </div>
                        </div>

                        {customCourse && (
                            <div className="mt-4">
                                <label htmlFor="course-title" className="block text-sm font-medium text-gray-700 mb-1">
                                    What would you like to learn?
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        id="course-title"
                                        value={courseTitle}
                                        onChange={(e) => setCourseTitle(e.target.value)}
                                        placeholder="e.g. Quantum Computing, Advanced Python"
                                        className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <button
                                        onClick={generateAIContent}
                                        disabled={aiGenerating}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {aiGenerating ? 'Generating...' : 'Generate with AI'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Level Selection */}
                    {selectedCourse && (
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">2. Select Difficulty Level</h2>
                            <div className="flex gap-4">
                                {['beginner', 'intermediate', 'advanced'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level)}
                                        className={`px-4 py-2 rounded-md capitalize ${selectedLevel === level
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Module Selection */}
                    {selectedCourse && (
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">3. Select Modules</h2>

                            <div className="space-y-4">
                                {(aiGeneratedContent?.[selectedLevel] || selectedCourse.levels[selectedLevel] || []).map(module => {
                                    const isSelected = selectedModules.some(m => m.id === module.id)
                                    return (
                                        <div
                                            key={module.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                            onClick={() => toggleModuleSelection(module)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{module.name}</h3>
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        Resources: {module.resources.join(', ')}
                                                    </div>
                                                </div>
                                                {isSelected ? (
                                                    <FiCheck className="text-indigo-600" />
                                                ) : (
                                                    <div className="w-5 h-5 border border-gray-300 rounded" />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Proceed to Payment */}
                    {selectedModules.length > 0 && (
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setShowPayment(true)}
                                className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Proceed to Payment (₹{coursePrice})
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">Complete Your Enrollment</h2>
                        <button
                            onClick={() => setShowPayment(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-medium text-gray-900">{selectedCourse.title}</h3>
                        <p className="text-sm text-gray-500 capitalize">{selectedLevel} Level</p>

                        <div className="mt-4 space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Selected Modules:</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {selectedModules.map(module => (
                                    <li key={module.id}>{module.name}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-lg font-medium text-gray-900">
                                Total: ₹{coursePrice}
                            </p>
                        </div>
                    </div>

                    <PaymentGateway
                        amount={coursePrice}
                        onSuccess={handlePaymentSuccess}
                    />

                </div>
            )}
        </div>
    )
}

export default CreateCourse