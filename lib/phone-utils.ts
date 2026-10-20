/**
 * Utilitários para tratamento seguro de números de telefone e links do WhatsApp no Brasil.
 */

export interface PhoneValidationResult {
  raw: string;
  clean: string;
  formattedDisplay: string;
  isMobile: boolean;
  isValidBR: boolean;
  internationalWhatsApp: string; // Ex: 5511987654321
}

export function parseBrazilianPhone(rawPhone: string | null | undefined): PhoneValidationResult {
  if (!rawPhone) {
    return {
      raw: '',
      clean: '',
      formattedDisplay: 'Não informado',
      isMobile: false,
      isValidBR: false,
      internationalWhatsApp: '',
    };
  }

  // Remove tudo que não for dígito
  let digits = rawPhone.replace(/\D/g, '');

  // Remove zero à esquerda (ex: 011 -> 11)
  if (digits.startsWith('0')) {
    digits = digits.substring(1);
  }

  // Se já começar com DDI 55 e tiver mais de 10 dígitos, removemos o 55 temporariamente para validar o DDD
  if (digits.startsWith('55') && digits.length >= 12) {
    digits = digits.substring(2);
  }

  let isValidBR = false;
  let isMobile = false;
  let formattedDisplay = rawPhone;
  let ddd = '';
  let number = '';

  // Número brasileiro padrão: DDD (2) + Número (8 ou 9 dígitos)
  if (digits.length === 10 || digits.length === 11) {
    ddd = digits.substring(0, 2);
    number = digits.substring(2);

    const dddNum = parseInt(ddd, 10);
    // DDDs válidos no Brasil vão de 11 a 99
    if (dddNum >= 11 && dddNum <= 99) {
      isValidBR = true;
      // No WhatsApp e telefonia móvel brasileira, o número OBRIGATORIAMENTE deve ter 9 dígitos
      if (number.length === 8) {
        // Se o número veio sem o 9º dígito (ex: 8 dígitos antigos ou cadastro incompleto), insere o '9'
        number = '9' + number;
      }

      if (number.length === 9) {
        isMobile = true;
        formattedDisplay = `(${ddd}) ${number.substring(0, 5)}-${number.substring(5)}`;
      }
    }
  }

  // O WhatsApp para o Brasil (DDI 55) sempre exige: 55 + DDD (2 dígitos) + 9 + 8 dígitos = 13 dígitos
  let internationalWhatsApp = '';
  if (isValidBR && ddd && number) {
    const finalWaNumber = number.length === 8 ? '9' + number : number;
    internationalWhatsApp = `55${ddd}${finalWaNumber}`;
  } else {
    // Fallback: se tiver 10 ou 11 dígitos, garante DDI 55 e 9º dígito
    if (digits.length === 10) {
      internationalWhatsApp = `55${digits.substring(0, 2)}9${digits.substring(2)}`;
    } else if (digits.length === 11) {
      internationalWhatsApp = `55${digits}`;
    } else if (digits.length === 12 && digits.startsWith('55')) {
      // 55 + DDD (2) + 8 dígitos -> insere o 9 entre o DDD e o número
      internationalWhatsApp = `55${digits.substring(2, 4)}9${digits.substring(4)}`;
    } else {
      internationalWhatsApp = digits;
    }
  }

  return {
    raw: rawPhone,
    clean: digits,
    formattedDisplay: isValidBR ? formattedDisplay : rawPhone,
    isMobile: true, // No contexto do WhatsApp todos devem ser acionáveis
    isValidBR,
    internationalWhatsApp,
  };
}

/**
 * Cria o link com codificação segura para envio em 1 clique pelo WhatsApp
 */
export function buildWhatsAppLink(phone: string, text: string): string {
  const parsed = parseBrazilianPhone(phone);
  const targetNumber = parsed.internationalWhatsApp || phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text.trim());
  return `https://wa.me/${targetNumber}?text=${encodedText}`;
}
