function StepBar({step, state}){
  const color = state===step.num ? "blue-500" : (state>step.num ? "green-500" : "gray-300");

    return (
        <div className="flex flex-col items-center w-full">
            <p className="text-xs text-gray-600 text-center mb-1">Step {step.num}</p>
            <div className={`w-5/6 h-2 bg-${color} rounded-full mb-1`}></div>
            <p className="text-sm font-semibold text-gray-700">{step.name}</p>
        </div>
    )

}

export default StepBar;