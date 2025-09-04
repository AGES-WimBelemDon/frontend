export const toastTemplates: Record<string, (msg: string) => string> = {
  success: (msg) => `<${msg}> realizada com sucesso!`,
  error:   (msg) => `Erro ao <${msg}>, tente novamente`,
  warning: (msg) => `Atenção: <${msg}>`,
  info:    (msg) => `<${msg}>`,
};