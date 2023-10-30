import React, { useState } from 'react'
import { StepType } from '../../types'
import Image from 'next/image'
import { STATUS } from '../../constant'
import { CapitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import { SecondsTohms } from 'utils/secondsTohms'
import { CopyText } from '../../utils/copyText'
import copy from '../../public/img/copy.svg'

interface PropsType {
  step: StepType
  index: number
}

interface DetailPropType {
  title: string
  value: string
  className?: string
  chain?: string
  image?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  hasCopyButton?: boolean
}
const Detail = ({
  title,
  value,
  chain,
  className,
  onClick,
  hasCopyButton
}: DetailPropType): JSX.Element => (
  <li className="lg:mb-2 mb-[18px]">
    <div className="flex items-center">
      <span className="whitespace-nowrap lg:text-neutral-600 font-normal md:flex-none flex-1">
        {title}:
      </span>
      <button className={`ml-2 ${className || ''}`} onClick={onClick}>
        {value}{' '}
        {chain && <span className="hidden text-neutral-600 lg:inline-block">({chain})</span>}
      </button>
      {hasCopyButton && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            CopyText(value)
          }}
          className="group relative cursor-pointer"
        >
          <Image src={copy} alt="copy_to_clipboard" />
        </button>
      )}
    </div>
  </li>
)

const Step: React.FC<PropsType> = ({ step, index }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      key={step.generatedTxId[0]}
      className='lg:before:content-["|"] lg:before:text-4xl lg:before:ml-10 relative'
    >
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden mt-3 ${
          isOpen ? `border rounded-md mt-0 px-2.5 py-1.5 bg-neutral-100 absolute z-10 -top-4 left-5 right-5 border-${step.status}` : ''
        } cursor-pointer`}
      >
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold">Step {index + 1}:</p>

          <p className="text-sm font-semibold">
            Status:{' '}
            <span className={`font-bold text-${step.status}`}>
              {CapitalizeFirstLetter(STATUS[step.status])}
            </span>
          </p>
        </div>
      </div>

      <div
        onClick={() => !isOpen && setIsOpen(true)}
        className={`relative border border-neutral-600 rounded-md p-5 lg:p-6 mt-1 ${
          isOpen ? 'mt-7' : 'cursor-pointer'
        }`}
      >
        <div
          onClick={() => isOpen && setIsOpen(false)}
          className={`flex items-center justify-between ${
            isOpen ? 'cursor-pointer lg:bg-neutral-100 lg:absolute lg:-top-6 lg:left-2 mt-3 lg:mt-0' : ''
          }`}
        >
          {!isOpen && <div className={`w-6 h-6 rounded-full absolute -left-3 bg-${step.status}`} />}
          {isOpen && (
            <div
              className={`w-14 ml-2 h-14 hidden border rounded-full mr-4 justify-center items-center text-sm font-semibold lg:flex border-${step.status} bg-${step.status} !bg-opacity-25`}
            >
              Step {index + 1}
            </div>
          )}
          <p className="text-sm font-normal lg:text-base lg:font-bold">
            <span className={`hidden ${isOpen ? 'lg:hidden' : 'lg:inline-block'}`}>
              Step {index + 1}:
            </span>{' '}
            From <span className="font-bold">{step.fromAsset.symbol}</span> (On{' '}
            {step.fromAsset.blockchain}) To <span className="font-bold">{step.toAsset.symbol}</span>{' '}
            (On {step.toAsset.blockchain}) Via {step.swapperId}
          </p>

          <p className={`text-base font-medium hidden lg:block ${isOpen ? 'mr-16 ml-32' : ''}`}>
            Status:{' '}
            <span className={`font-bold text-${step.status}`}>
              {CapitalizeFirstLetter(STATUS[step.status])}
            </span>
          </p>
        </div>

        {isOpen && (
          <div className="mt-3 lg:mt-14">
            <p className="font-normal text-xs lg:font-bold lg:text-base">
              {step.fromAmount} <span className="font-bold">{step.fromAsset.symbol}</span>{' '}
              <span className="lg:text-neutral-600">(On {step.fromAsset.blockchain})</span> To{' '}
              {step.toAmount} <span className="font-bold">{step.toAsset.symbol}</span>{' '}
              <span className="lg:text-neutral-600">({step.toAsset.blockchain})</span>
            </p>
            <ul className="font-bold list-disc ml-4 md:ml-10 text-xs lg:text-base lg:font-semibold mt-3">
              <Detail
                title="Estimated Output"
                className="truncate"
                value={`${step.expectedToAmount} ${step.toAsset.symbol}`}
              />
              <Detail
                title="Estimated Duration"
                value={SecondsTohms(step.estimatedTimeInSeconds)}
              />
              <Detail
                title="Step Source Wallet"
                value={step.sourceWallet}
                chain={step.fromAsset.blockchain}
                hasCopyButton
                className="text-primary truncate cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(step.sourceWalletAddress, '_blank')
                }}
              />
              <Detail
                title="Step Destination Wallet"
                value={step.destinationWallet}
                chain={step.toAsset.blockchain}
                hasCopyButton
                className="text-primary truncate cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(step.destinationWalletAddress, '_blank')
                }}
              />
            </ul>
            <div className="mt-5 lg:mt-10">
              {/* <p className="text-base font-bold">Chain Switch: successfully</p> */}
              <ul className="font-medium list-disc ml-4 md:ml-10 text-xs lg:text-base lg:font-bold mt-2 lg:mt-5 lg:w-2/4">
                {step.explorerUrls.map((explorerUrl, key) => (
                  <li className="mb-2 lg:mb-3" key={key}>
                    <p className="flex">
                      <span className="text-success flex-1">
                        {explorerUrl.description}{' '}
                        <a
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          href={explorerUrl.url}
                          className="text-primary"
                        >
                          TX-Link
                        </a>
                      </span>
                      {/* <span className="flex-1">00:01:00</span> */}
                    </p>
                  </li>
                ))}
                <div className="mt-5 lg:mt-10">
                  {step.approveUrls.map((approveUrl, key) => (
                    <li className="mb-2 lg:mb-3" key={key}>
                      <p className="flex">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          href={approveUrl.url}
                          className="text-primary truncate"
                        >
                          {approveUrl.txId}
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            CopyText(approveUrl.txId)
                          }}
                          className="group relative cursor-pointer"
                        >
                          <Image src={copy} alt="copy_to_clipboard" />
                        </button>
                      </p>
                    </li>
                  ))}
                </div>
                {/* {step.status === STATUS.success && (
                  <li>
                    Received {step.toAmount} {step.toAsset.symbol} On{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      href={step.destinationWalletAddress}
                      className="text-primary"
                    >
                      Your Wallet
                    </a>{' '}
                    Successfully
                  </li>
                )} */}
              </ul>
            </div>
            <div>
              {/* <div className="flex items-center lg:mt-7 mt-4">
                  <Image src={info} alt="info" className="hidden lg:block mr-1.5" />
                  <p className="text-xs lg:text-base lg:font-bold">
                    <span className="text-error font-bold lg:text-neutral-900">Do Not Worry:</span>{' '}
                    Your Funds Are Safe. Your Funds Are Still In Your wallet
                  </p>
                </div> */}
              {step.generatedTxId.length ? (
                <div className="mt-5 pt-5 border-t border-t-neutral-600">
                  {/* <p className="text-xs font-medium lg:font-bold lg:text-base">
                    Details: Your Swap Failed Because The Anysawp Needs At Least
                    1000 USD Coin To Perform The Bridging
                  </p> */}
                  <p className="font-bold text-xs lg:text-base">
                    {/* {step.explorerUrls.length ? (
                      <>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-primary"
                          href={step.explorerUrls[step.explorerUrls.length - 1].url}
                        >
                          View {CapitalizeFirstLetter(STATUS[step.status])} Swap
                        </a>{' '}
                        -{' '}
                      </>
                    ) : (
                      ''
                    )} */}

                    <span
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log(step)

                        CopyText(step.generatedTxId[0])
                      }}
                      className="text-primary cursor-pointer"
                    >
                      Copy Swap Hash
                    </span>
                  </p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step
