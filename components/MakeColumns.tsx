/* eslint-disable @next/next/no-img-element */
import { columns, makeColumnsTypes } from './Table'
import Tooltip from './Tooltip'
import Image from 'next/image'
import doubleArrow from '../public/img/doubleArrow.svg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CapitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { StepSummary } from '../types'
import copy from '../public/img/copy.svg'
import React from 'react'
import { CopyText } from 'utils/copyText'

dayjs.extend(relativeTime)
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

interface StepProps {
  image: string
  symbol: string
  name: string
  blockchainLogo: string
  blockchain: string
  amount: number
}
const StepComponent = ({
  image,
  name,
  blockchainLogo,
  blockchain,
  symbol,
  amount
}: StepProps): JSX.Element => (
  <div className='flex justify-center items-center flex-col'>
    <div className="relative w-6 h-6">
      <img
        src={image}
        className="rounded-full m-auto"
        alt={name ?? symbol}
        width={24}
        height={24}
      />
      <img
        className="absolute -right-1 rounded-full -bottom-1"
        src={blockchainLogo}
        alt={blockchain}
        width={15}
        height={15}
      />
    </div>

    <p className="mt-3 text-xs whitespace-nowrap">
      {parseFloat(Number(amount).toFixed(2))} {symbol}
    </p>
  </div>
)
const renderRoute = ({
  steps,
  sourceAmount
}: {
  steps: StepSummary[]
  sourceAmount: number
}): JSX.Element => (
  <div className="flex items-center lg:justify-center w-full overflow-x-auto">
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        {index === 0 && (
          <>
            <StepComponent
              image={step.fromToken.image}
              name={step.fromToken.name}
              blockchainLogo={step.fromToken.blockchainLogo}
              blockchain={step.fromToken.blockchain}
              symbol={step.fromToken.symbol}
              amount={sourceAmount}
            />
            <Image src={doubleArrow} alt="route" className='mx-2' />
          </>
        )}
        <StepComponent
          image={step.toToken.image}
          name={step.toToken.name}
          blockchainLogo={step.toToken.blockchainLogo}
          blockchain={step.toToken.blockchain}
          symbol={step.toToken.symbol}
          amount={step.dstAmount as number}
        />
        {steps.length - 1 !== index && <Image src={doubleArrow} alt="route" className='mx-2' />}
      </React.Fragment>
    ))}
  </div>
)

export const makeColumns: ({ onClick }: makeColumnsTypes) => columns[] = ({ onClick }) => [
  {
    title: 'Request ID',
    key: 'requestId',
    classNameColBody: 'lg:!font-bold text-primary',
    render: (text) => (
      <div className="flex justify-center">
        <button onClick={() => onClick(text)} className="group relative cursor-pointer">
          {text.slice(0, 25) + '...'}
          <Tooltip label={text} />
        </button>
        <button onClick={() => CopyText(text)} className="group relative cursor-pointer">
          <Image src={copy} alt="copy_to_clipboard" />
        </button>
      </div>
    )
  },
  {
    title: 'Route',
    key: 'stepsSummary',
    render: (_, item: any) =>
      renderRoute({ steps: item.stepsSummary, sourceAmount: item.sourceAmount }),
    hiddenTitle: true,
    classNameColBody: 'lg:!flex-auto lg:w-60',
    classNameColHead: 'lg:!flex-auto lg:w-60'
  },

  {
    title: 'Time',
    key: 'transactionTime',
    render: (text) => dayjs(text).fromNow()
  },
  {
    title: 'Status',
    key: 'status',
    render: (text) => <p className={`text-${text}`}>{CapitalizeFirstLetter(text)}</p>
  },
  {
    title: '',
    key: 'destination',
    hiddenTitle: true,

    render: (_, item: any) => (
      <button
        id={item.requestId}
        aria-label={`detail${item.requestId as string}`}
        onClick={() => onClick(item.requestId)}
        className="w-full border !border-primary rounded-md font-bold text-xl text-primary px-14 py-2.5 lg:w-fit"
      >
        Detail
      </button>
    )
  }
]
