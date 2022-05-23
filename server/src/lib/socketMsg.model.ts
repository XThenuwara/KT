export function socketMsgModel(
  message: string,
  variant: 'success' | 'error' | 'warning' | 'info' | 'default' | undefined,
) {
  return {
    message,
    variant,
  };
}

export function socketMsgModelWithData(
  message: string,
  variant: 'success' | 'error' | 'warning' | 'info' | 'default' | undefined,
  data: any,
) {
  return {
    message,
    variant,
    data,
  };
}
