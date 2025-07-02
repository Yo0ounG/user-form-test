export const sendUserData = (data: Record<string, any>): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', data);
      resolve({ success: true });
    }, 2500);
  });
};
