import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";

interface Props {
  handleUndo: () => void;
  cancelShowUndo: () => void;
  message: string;
}

const UndoSection = ({ message, handleUndo, cancelShowUndo }: Props) => {
  return (
    <motion.div
      className="position-fixed bg-danger p-3 rounded-3 text-white fw-bold d-flex gap-3"
      style={{ right: "20px" }}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <p className="d-inline p-0 m-0" style={{ whiteSpace: "pre-line" }}>
        {message}
        <button
          style={{
            background: "none",
            border: "none",
            textDecoration: "underline",
          }}
          className="fs-5 text-white px-3 fw-bold"
          onClick={handleUndo}
        >
          Undo
        </button>
      </p>
      <button
        className="m-2"
        style={{ background: "none", border: "none" }}
        onClick={cancelShowUndo}
      >
        <ImCross color="white" size={23} />
      </button>
    </motion.div>
  );
};

export default UndoSection;
