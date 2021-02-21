import styled from "styled-components";

type Props = {
  primary?: boolean;
};

const Button = styled.button`
  padding: 1.2rem 2rem;
  border: var(--primary);
  border: 1px solid var(--primary);
  background-color: ${(props: Props) =>
    props.primary ? "var(--primary)" : "transparent"};
  color: ${(props: Props) =>
    props.primary ? "var(--light)" : "var(--primary)"};
  border-radius: 0.5rem;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export default Button;