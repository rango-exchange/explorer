import { documentation, products, socialMedia } from './Footer.helper';
import ListItem from './ListItem';

function Footer() {
  return (
    <footer className="relative flex w-full flex-col bg-baseBackground pt-10 lg:pt-24">
      <div className="relative w-full bg-footer-mask bg-contain bg-right-bottom bg-no-repeat pb-16 md:bg-[right_1.5rem]">
        <div className="mx-auto flex container  flex-col justify-between px-[1.875rem] lg:flex-row lg:px-0">
          <div className="mb-10 text-left lg:mb-0 lg:max-w-[19.4375rem]">
            <h3 className="mb-3.5 text-left text-lg	font-medium text-baseForeground lg:text-[1.1rem] lg:leading-[1.4rem]">
              About Rango
            </h3>
            <p className="w-full text-sm leading-[1.5rem] text-neutral-200	">
              Rango is a cutting-edge routing and aggregation protocol for all
              cross-chain and on-chain swaps, aggregating bridges and DEXs in
              crypto world. You can swap native assets like Bitcoin, Ethereum,
              Matic, ... to each other in a decentralized manner.
            </p>
          </div>
          <div className="mb-10">
            <h3 className="mb-3 text-left text-lg font-medium	text-baseForeground	lg:mb-3.5 lg:text-[1.1rem] lg:leading-[1.4rem]">
              Products
            </h3>
            <ul className="w-full">
              {products.map((link, index) => (
                <ListItem key={index} {...link} />
              ))}
            </ul>
          </div>
          <div className="mb-10">
            <h3 className="mb-3 text-left text-lg font-medium	text-baseForeground	lg:mb-3.5 lg:text-[1.1rem] lg:leading-[1.4rem]">
              Documentation
            </h3>
            <ul className="w-full">
              {documentation.map((link, index) => (
                <ListItem key={index} {...link} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-left text-lg font-medium	text-baseForeground	lg:mb-3.5 lg:text-[1.1rem] lg:leading-[1.4rem]">
              Social Media
            </h3>
            <ul className="w-full">
              {socialMedia.map((link, index) => (
                <ListItem key={index} {...link} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <span className="w-full bg-neutral-500 p-2.5 text-center text-sm text-baseForeground md:text-base md:leading-6">
        Copyright © 2023 Rango Exchange. All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;
