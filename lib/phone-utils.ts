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
      if (number.length === 9 && number.startsWith('9')) {
        isMobile = true;
        formattedDisplay = `(${ddd}) ${number.substring(0, 5)}-${number.substring(5)}`;
      } else if (number.length === 8) {
        // Fixo ou celular antigo sem o 9
        const firstDigit = number.charAt(0);
        if (['6', '7', '8', '9'].includes(firstDigit)) {
          // Provável celular que precisa de 9
          isMobile = true;
          number = '9' + number;
          formattedDisplay = `(${ddd}) ${number.substring(0, 5)}-${number.substring(5)}`;
        } else {
          // Telefone fixo (iniciados com 2, 3, 4, 5)
          isMobile = false;
          formattedDisplay = `(${ddd}) ${number.substring(0, 4)}-${number.substring(4)}`;
        }
      }
    }
  }

  const internationalWhatsApp = isValidBR ? `55${ddd}${number}` : digits;

  return {
    raw: rawPhone,
    clean: digits,
    formattedDisplay: isValidBR ? formattedDisplay : rawPhone,
    isMobile,
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
