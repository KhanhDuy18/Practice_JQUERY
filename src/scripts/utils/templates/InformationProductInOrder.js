/* eslint-disable */ 
export const InformationProductInOrder = (product) => `
  <li>
    <span>${product.productName} </span>
    <span data-format-price>$ ${product.productPrice}</span>
  </li>
`;