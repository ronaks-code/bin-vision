const LinearGradientWrapper = (props) => {
  const { colors } = props;
  const backgroundValue = `linear-gradient(${colors[0]}, ${colors[1]})`;

  return <div style={{ ...props.style, background: backgroundValue }}>{props.children}</div>;
};

export default LinearGradientWrapper;
