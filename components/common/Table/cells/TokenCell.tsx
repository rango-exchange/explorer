/* eslint-disable @next/next/no-img-element */
import { CellProps } from '../Table.type';

function TokenCell(props: CellProps) {
  const { swapItem, column } = props;
  const { destinationAmount, destinationToken, sourceToken, sourceAmount } =
    swapItem;
  const token =
    column.tokenType === 'destination' ? destinationToken : sourceToken;
  const amount =
    column.tokenType === 'destination' ? destinationAmount : sourceAmount;

  const { blockchain, blockchainLogo, image, name, symbol } = token;

  return (
    <div className="flex col-span-2 items-center p-20">
      <div className="relative mr-10">
        <img src={image} alt={name || symbol} width={30} height={30} />
        <img
          src={blockchainLogo}
          width={15}
          height={15}
          alt={blockchain}
          className="absolute right-[-3px] bottom-[-3px]"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center">
          <span
            className={`text-16 ${
              column.tokenType === 'source'
                ? 'text-primary-500'
                : 'text-neutral-400'
            }`}>
            ~{parseFloat(Number(amount).toFixed(3))}
          </span>
          <span
            className={`text-16 ${
              column.tokenType === 'source'
                ? 'text-primary-500'
                : 'text-neutral-400'
            }`}>
            {symbol || name}
          </span>
        </div>
        <div className="text-14 text-neutral-400">{blockchain}</div>
      </div>
    </div>
  );
}

export default TokenCell;
