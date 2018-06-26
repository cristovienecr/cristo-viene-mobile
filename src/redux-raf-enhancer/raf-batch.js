const batch = () => {
  const context = { queued: false };
  return (notify) => {
    if (context.queued) return;
    context.queued = true;
    // eslint-disable-next-line no-undef
    requestAnimationFrame(() => {
      context.queued = false;
      notify();
    });
  };
};

export default batch;
