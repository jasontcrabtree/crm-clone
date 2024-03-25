/**
 * @description Wraps component with a lime outline for a server component, and a red outline otherwise */
export const styleComponentType = () => {
  return `${
    typeof window === 'undefined'
      ? 'outline outline-width-2px outline-offset-[-1px] outline-lime-500'
      : 'outline outline-width-2px outline-offset-[-1px] outline-red-500'
  }`;
};
