import '../../src/index.css';

const RainbowText = ({ text }: { text: string }) => {
  const characters = text.split('');

  return (
    <span className="rainbow-text">
      {characters.map((char, index) => (
        <span key={index}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default RainbowText;
