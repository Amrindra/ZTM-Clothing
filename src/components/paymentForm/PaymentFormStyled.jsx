import styled from "styled-components";
import Button from "../button/Button";

export const PaymentFormContainer = styled.div`
  height: 300px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  /* width: 100%; */
  min-width: 500px;

  @media (max-width: 668px) {
    min-width: 300px;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
