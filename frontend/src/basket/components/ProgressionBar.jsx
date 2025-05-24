import { useState } from "react";
import StepBar from "./StepBar";

function ProgressionBar({current}){
    const steps = [{num:1, name:"Cart"}, {num:2, name:"Order review"}, {num:3, name:"Payment"}, {num:4, name:"Order complete"}];

    return (
        <div className="flex w-full">
            {steps.map(step => 
                <StepBar key={step.num} step={step} state={current}/>
            )}
        </div>
    )
}

export default ProgressionBar;