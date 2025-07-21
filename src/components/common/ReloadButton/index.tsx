'use client';

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="text-baseForeground bg-primary-600 py-8 md:py-10 px-20 mt-20 md:mt-50 text-center rounded-full w-[280px] md:w-[228px] text-16 md:text-18 font-medium">
      Reload
    </button>
  );
}
