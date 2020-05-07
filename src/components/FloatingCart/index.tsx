import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

interface Total {
  quantity: number;
}

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    if (products && products.length > 0) {
      const { total } = products.reduce(
        (accumulator, product) => {
          accumulator.total += product.quantity * product.price;
          return accumulator;
        },
        {
          total: 0,
        },
      );

      return formatValue(total);
    }

    return formatValue(0);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    if (products && products.length > 0) {
      const { total } = products.reduce(
        (accumulator, product) => {
          accumulator.total += product.quantity;
          return accumulator;
        },
        {
          total: 0,
        },
      );
      return total;
    }
    return 0;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
