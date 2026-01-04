'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface CardData {
  cardNumber: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
  identificationType: string;
  identificationNumber: string;
}

interface TokenResult {
  token: string;
  paymentMethodId: string;
  lastFourDigits: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  payment_type_id: string;
  thumbnail: string;
  secure_thumbnail: string;
}

export function useMercadoPago() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mpRef = useRef<any>(null);

  // Load MercadoPago SDK script
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
    
    if (!publicKey) {
      setError('NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY não configurada');
      setIsLoading(false);
      return;
    }

    // Check if script is already loaded
    if (window.MercadoPago) {
      mpRef.current = new window.MercadoPago(publicKey, { locale: 'pt-BR' });
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    // Load script dynamically
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    
    script.onload = () => {
      try {
        mpRef.current = new window.MercadoPago(publicKey, { locale: 'pt-BR' });
        setIsLoaded(true);
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao inicializar Mercado Pago SDK');
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setError('Erro ao carregar Mercado Pago SDK');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup not needed as script should persist
    };
  }, []);

  // Detect card payment method (brand) from card number
  const getPaymentMethod = useCallback(async (cardNumber: string): Promise<PaymentMethod | null> => {
    if (!mpRef.current || cardNumber.length < 6) return null;

    try {
      const bin = cardNumber.replace(/\s/g, '').slice(0, 6);
      const result = await mpRef.current.getPaymentMethods({ bin });
      
      if (result.results && result.results.length > 0) {
        return result.results[0];
      }
      return null;
    } catch (err) {
      console.error('Erro ao detectar bandeira:', err);
      return null;
    }
  }, []);

  // Create card token for secure payment
  const createCardToken = useCallback(async (cardData: CardData): Promise<TokenResult> => {
    if (!mpRef.current) {
      throw new Error('Mercado Pago SDK não está carregado');
    }

    try {
      // Get payment method first
      const paymentMethod = await getPaymentMethod(cardData.cardNumber);
      
      if (!paymentMethod) {
        throw new Error('Não foi possível identificar a bandeira do cartão');
      }

      // Create the token
      const tokenResult = await mpRef.current.createCardToken({
        cardNumber: cardData.cardNumber.replace(/\s/g, ''),
        cardholderName: cardData.cardholderName.toUpperCase(),
        cardExpirationMonth: cardData.expirationMonth,
        cardExpirationYear: `20${cardData.expirationYear}`,
        securityCode: cardData.securityCode,
        identificationType: cardData.identificationType,
        identificationNumber: cardData.identificationNumber.replace(/\D/g, ''),
      });

      if (tokenResult.error) {
        throw new Error(tokenResult.error);
      }

      return {
        token: tokenResult.id,
        paymentMethodId: paymentMethod.id,
        lastFourDigits: cardData.cardNumber.replace(/\s/g, '').slice(-4),
      };
    } catch (err: any) {
      console.error('Erro ao criar token:', err);
      
      // Map common errors to friendly messages
      const errorMessages: Record<string, string> = {
        'cardNumber': 'Número do cartão inválido',
        'securityCode': 'Código de segurança inválido',
        'cardExpirationMonth': 'Mês de validade inválido',
        'cardExpirationYear': 'Ano de validade inválido',
        'cardholderName': 'Nome do titular inválido',
      };

      const friendlyMessage = Object.entries(errorMessages).find(
        ([key]) => err.message?.toLowerCase().includes(key.toLowerCase())
      )?.[1];

      throw new Error(friendlyMessage || err.message || 'Erro ao processar cartão');
    }
  }, [getPaymentMethod]);

  // Get installments for a given amount
  const getInstallments = useCallback(async (
    amount: number,
    paymentMethodId: string
  ): Promise<Array<{ installments: number; recommended_message: string }>> => {
    if (!mpRef.current) return [];

    try {
      const result = await mpRef.current.getInstallments({
        amount: String(amount),
        payment_method_id: paymentMethodId,
      });

      if (result && result.length > 0) {
        return result[0].payer_costs || [];
      }
      return [];
    } catch (err) {
      console.error('Erro ao buscar parcelas:', err);
      return [];
    }
  }, []);

  return {
    isLoaded,
    isLoading,
    error,
    createCardToken,
    getPaymentMethod,
    getInstallments,
  };
}

export default useMercadoPago;
