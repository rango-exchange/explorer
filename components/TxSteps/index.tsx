import group from '../../public/img/group.svg'
import { StepType } from '../../types'
import Image from 'next/image'
import React from 'react'
import Step from './Step'

interface PropsType {
  steps: StepType[]
}

const TxSteps: React.FC<PropsType> = ({ steps }) =>
  steps.length > 0 ? (
    <div className="w-full bg-neutral-100 p-3 rounded-lg lg:p-10">
      <div className="flex items-center lg:mb-0 mb-3">
        <Image className="w-11 h-11 hidden lg:block mr-3 ml-6" src={group} alt="steps" />
        <h3 className="text-16 font-bold lg:text-28">Swap Steps</h3>
      </div>
      {steps.map((step: StepType, key: number) => (
        <div key={`step-${key}`}>
          <Step step={step} index={key} />
        </div>
      ))}
    </div>
  ) : (
    <div />
  )

export default TxSteps
